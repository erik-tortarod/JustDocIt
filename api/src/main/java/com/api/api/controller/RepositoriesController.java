package com.api.api.controller;

import com.api.api.util.JwtUtil;
import com.api.api.service.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.crypto.SecretKey;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RepositoriesController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EncryptionService encryptionService;

    @GetMapping("/test")
    public String test() {
        return "testing";
    }

    @GetMapping("/decode-jwt")
    public ResponseEntity<?> decodeJwt(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for validation

        try {
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @GetMapping("/decrypt-access-token")
    public ResponseEntity<?> decryptAccessToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for validation

        try {
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            String encryptedAccessToken = (String) claims.get("accessToken");

            if (encryptedAccessToken == null) {
                return ResponseEntity.badRequest().body("No accessToken found in the token claims");
            }

            String decryptedAccessToken = encryptionService.decrypt(encryptedAccessToken);
            return ResponseEntity.ok(Map.of("decryptedAccessToken", decryptedAccessToken));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @GetMapping("/github-repositories")
    public ResponseEntity<?> getGithubRepositories(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for validation

        try {
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            String encryptedAccessToken = (String) claims.get("accessToken");

            if (encryptedAccessToken == null) {
                return ResponseEntity.badRequest().body("No accessToken found in the token claims");
            }

            String decryptedAccessToken = encryptionService.decrypt(encryptedAccessToken);

            // Call GitHub API to fetch repositories
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.github.com/user/repos";
            var headers = new org.springframework.http.HttpHeaders();
            headers.set("Authorization", "Bearer " + decryptedAccessToken);
            var entity = new org.springframework.http.HttpEntity<>(headers);

            var response = restTemplate.exchange(
                    url,
                    org.springframework.http.HttpMethod.GET,
                    entity,
                    String.class
            );

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

}
