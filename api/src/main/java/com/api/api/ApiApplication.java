package com.api.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the JustDocIt API. This class serves as the entry
 * point for the Spring Boot application.
 *
 * @SpringBootApplication annotation enables: - Auto-configuration - Component
 * scanning - Additional configuration on the application class
 */
@SpringBootApplication
public class ApiApplication {

    /**
     * Main method that bootstraps the Spring Boot application.
     *
     * @param args Command line arguments passed to the application
     */
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

}
