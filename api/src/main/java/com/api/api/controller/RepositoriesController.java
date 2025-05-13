package com.api.api.controller;

import com.api.api.util.JwtUtil;
import com.api.api.model.Repository;
import com.api.api.service.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.crypto.SecretKey;
import java.util.Map;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory; // Add this import

@RestController
@RequestMapping("/api")
public class RepositoriesController {

    private static final Logger logger = LoggerFactory.getLogger(RepositoriesController.class); // Add

    // this
    // line
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RepositoryService repositoryService;

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
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for
        // validation

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
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for
        // validation

        try {
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            String accessToken = (String) claims.get("accessToken");

            if (accessToken == null) {
                return ResponseEntity.badRequest().body("No accessToken found in the token claims");
            }

            return ResponseEntity.ok(Map.of("accessToken", accessToken));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @GetMapping("/github-repositories")
    public ResponseEntity<?> getGithubRepositories(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for
        // validation

        try {
            // Validate the token and extract claims
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            String accessToken = (String) claims.get("accessToken");

            if (accessToken == null) {
                return ResponseEntity.status(401).body("No accessToken found in the token claims");
            }

            // Call GitHub API to fetch repositories
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.github.com/user/repos?type=owner";
            var headers = new org.springframework.http.HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            var entity = new org.springframework.http.HttpEntity<>(headers);

            var response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, String.class);

            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            logger.error("Error validating token or fetching repositories: {}", e.getMessage());
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @PostMapping("/add-repository")
    public ResponseEntity<?> addRepository(@RequestHeader("Authorization") String authHeader,
            @RequestParam String githubRepoId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for
        // validation

        try {
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            String userId = (String) claims.get("id"); // Extract userId from token
            String accessToken = (String) claims.get("accessToken"); // Use accessToken
            // directly

            if (accessToken == null) {
                return ResponseEntity.badRequest().body("No accessToken found in the token claims");
            }

            // Call GitHub API to fetch repository details
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.github.com/repositories/" + githubRepoId;
            var headers = new org.springframework.http.HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            var entity = new org.springframework.http.HttpEntity<>(headers);

            var response = restTemplate.exchange(url, org.springframework.http.HttpMethod.GET, entity, Map.class);

            // Extract repository details
            Map<String, Object> repoData = response.getBody();
            if (repoData == null) {
                return ResponseEntity.badRequest().body("Failed to fetch repository details");
            }

            // Save repository to the database
            Repository repository = new Repository();
            repository.setGithubId(repoData.get("id").toString());
            repository.setName((String) repoData.get("name"));
            repository.setDescription((String) repoData.get("description"));
            repository.setPrivate((Boolean) repoData.get("private"));
            repository.setOwner(((Map<String, Object>) repoData.get("owner")).get("login").toString());
            repository.setHtmlUrl((String) repoData.get("html_url"));
            repository.setSize((Integer) repoData.get("size")); // Extract and set the
            // size property
            repository.setUserId(userId); // Associate the repository with the user

            Repository savedRepository = repositoryService.saveRepository(repository);

            if (savedRepository.getId().equals(repository.getId())) {
                return ResponseEntity.ok(savedRepository); // Repository was newly added
            } else {
                return ResponseEntity.ok(Map.of("message", "Repository already exists", "repository", savedRepository));
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @GetMapping("/user-repositories")
    public ResponseEntity<?> getUserRepositories(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for
        // validation

        try {
            // Validate token
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            logger.info("Token validated successfully. Claims: {}", claims); // Debug log

            // Fetch repositories from the database
            List<Repository> repositories = repositoryService.getAllRepositories();

            return ResponseEntity.ok(repositories);
        } catch (Exception e) {
            logger.error("Token validation failed: {}", e.getMessage()); // Debug log
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @DeleteMapping("/delete-repository")
    public ResponseEntity<?> deleteRepository(@RequestHeader("Authorization") String authHeader,
            @RequestParam String repositoryId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        SecretKey secretKey = jwtUtil.getSecretKey1(); // Use the first secret key for validation

        try {
            // Validate token
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            logger.info("Token validated successfully. Claims: {}", claims); // Debug log

            // Delete repository and its documentation
            repositoryService.deleteRepositoryWithDocumentation(repositoryId);

            return ResponseEntity.ok(Map.of("message", "Repository and its documentation deleted successfully"));
        } catch (Exception e) {
            logger.error("Error deleting repository: {}", e.getMessage()); // Debug log
            return ResponseEntity.status(500).body("Error deleting repository: " + e.getMessage());
        }
    }

}
