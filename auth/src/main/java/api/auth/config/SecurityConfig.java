package api.auth.config;

import api.auth.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.LdapShaPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import java.util.Arrays;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

	@Value("${frontend.url}")
	private String frontendUrl;

	@Bean
	public JwtFilter jwtFilter() {
		return new JwtFilter();
	}

	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.ldapAuthentication()
			.userDnPatterns("uid={0},ou=people")
			.groupSearchBase("ou=groups")
			.contextSource()
			.url("ldap://localhost:8389/dc=springframework,dc=org")
			.and()
			.passwordCompare()
			.passwordEncoder(new LdapShaPasswordEncoder())
			.passwordAttribute("userPassword");
	}

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
			.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**")
				.permitAll()
				.requestMatchers("/", "/error", "/css/**", "/js/**", "/auth/token", "/token/**")
				.permitAll()
				.requestMatchers("/api/oauth2/authorization/**")
				.permitAll()
				.requestMatchers("/api/auth/ldap-login")
				.permitAll()
				.requestMatchers("/api/auth/validate-token")
				.permitAll()
				.requestMatchers("/api/admin/**")
				.authenticated() // Proteger rutas admin solo con autenticación
				.requestMatchers("/api/**")
				.permitAll()
				.anyRequest()
				.authenticated())
			.addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)
			.oauth2Login(oauth2 -> oauth2.successHandler(oAuth2LoginSuccessHandler)
				.authorizationEndpoint(authorization -> authorization.baseUri("/api/oauth2/authorization")));

		return http.build();
	}

}