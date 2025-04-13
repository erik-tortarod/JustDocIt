package com.api.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedOrigins("http://localhost:5173") // Ensure this matches the
																// frontend origin
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
					.allowedHeaders("*")
					.exposedHeaders("Authorization") // Ensure Authorization header is
														// exposed
					.allowCredentials(true)
					.maxAge(3600);
			}
		};
	}

}
