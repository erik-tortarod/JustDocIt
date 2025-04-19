package com.api.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.beans.factory.annotation.Value;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Value("${frontend.url}")
	private String frontendUrl;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(request -> {
			CorsConfiguration configuration = new CorsConfiguration();
			configuration.setAllowedOrigins(Arrays.asList(frontendUrl));
			configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
			configuration.setAllowedHeaders(Arrays.asList("*"));
			configuration.setAllowCredentials(true);
			return configuration;
		}))
			.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.GET, "/api/documentation/repository")
				.permitAll() // Permitir acceso público
				.requestMatchers(HttpMethod.OPTIONS, "/**")
				.permitAll() // Explicitamente permitir OPTIONS
				.requestMatchers("/", "/error", "/css/**", "/js/**", "/api/**", "/auth/token", "/token/**")
				.permitAll()
				.anyRequest()
				.authenticated());
		return http.build();
	}

}