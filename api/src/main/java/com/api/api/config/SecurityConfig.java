package com.api.api.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(request -> {
			CorsConfiguration configuration = new CorsConfiguration();
			configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
			configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
			configuration.setAllowedHeaders(Arrays.asList("*"));
			configuration.setExposedHeaders(Arrays.asList("Authorization"));
			configuration.setAllowCredentials(true);
			return configuration;
		}))
			.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.GET, "/api/documentation/repository")
				.permitAll()
				.requestMatchers(HttpMethod.GET, "/api/documentation/language/**")
				.permitAll()
				.requestMatchers(HttpMethod.GET, "/api/public/repositories/**")
				.permitAll()
				.requestMatchers(HttpMethod.POST, "/api/public/repositories/**")
				.permitAll()
				.requestMatchers(HttpMethod.OPTIONS, "/**")
				.permitAll()
				.requestMatchers("/", "/error", "/css/**", "/js/**", "/api/**", "/auth/token", "/token/**")
				.permitAll()
				.anyRequest()
				.authenticated());
		return http.build();
	}

}
