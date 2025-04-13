package api.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class WebConfig {

	@Value("${frontend.url}")
	private String frontendUrl;

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedOrigins(frontendUrl)
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
					.allowedHeaders("*")
					.exposedHeaders("Authorization")
					.allowCredentials(true)
					.maxAge(3600); // Cache preflight requests for 1 hour
			}
		};
	}

}
