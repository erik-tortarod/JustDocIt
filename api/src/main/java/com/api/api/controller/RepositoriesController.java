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
import org.slf4j.LoggerFactory;

/**
 * REST Controller for managing GitHub repositories. This controller handles operations
 * related to GitHub repositories including: - Fetching user's GitHub repositories -
 * Adding new repositories - Managing repository documentation - Deleting repositories All
 * endpoints require JWT authentication.
 */
@RestController
@RequestMapping("/api")
public class RepositoriesController {

	private static final Logger logger = LoggerFactory.getLogger(RepositoriesController.class);

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private RepositoryService repositoryService;

	/**
	 * Test endpoint to verify the API is running.
	 * @return A simple test message
	 */
	@GetMapping("/test")
	public String test() {
		return "testing";
	}

	/**
	 * Decodes and validates a JWT token.
	 * @param authHeader The Authorization header containing the JWT token
	 * @return ResponseEntity containing the decoded token claims or error message
	 */
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
		}
		catch (Exception e) {
			return ResponseEntity.status(401).body("Invalid or expired token");
		}
	}

	/**
	 * Decrypts and retrieves the access token from a JWT token.
	 * @param authHeader The Authorization header containing the JWT token
	 * @return ResponseEntity containing the decrypted access token or error message
	 */
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
		}
		catch (Exception e) {
			return ResponseEntity.status(401).body("Invalid or expired token");
		}
	}

	/**
	 * Fetches all GitHub repositories for the authenticated user.
	 * @param authHeader The Authorization header containing the JWT token
	 * @return ResponseEntity containing the list of repositories or error message
	 */
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
		}
		catch (Exception e) {
			logger.error("Error validating token or fetching repositories: {}", e.getMessage());
			return ResponseEntity.status(401).body("Invalid or expired token");
		}
	}

	/**
	 * Adds a new repository to the user's tracked repositories.
	 * @param authHeader The Authorization header containing the JWT token
	 * @param githubRepoId The GitHub repository ID
	 * @param branch The branch to track
	 * @return ResponseEntity containing the saved repository or error message
	 */
	@PostMapping("/add-repository")
	public ResponseEntity<?> addRepository(@RequestHeader("Authorization") String authHeader,
			@RequestParam String githubRepoId, @RequestParam String branch) {
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

			// Check if repository with same githubId and branch already exists
			List<Repository> existingRepos = repositoryService.findByGithubIdAndUserId(githubRepoId, userId);
			for (Repository existingRepo : existingRepos) {
				if (existingRepo.getBranch() != null && existingRepo.getBranch().equals(branch)) {
					return ResponseEntity.ok(Map.of("message", "Repository with this branch already exists",
							"repository", existingRepo));
				}
			}

			// Save repository to the database
			Repository repository = new Repository();
			repository.setGithubId(repoData.get("id").toString());
			repository.setName((String) repoData.get("name"));
			repository.setDescription((String) repoData.get("description"));
			repository.setPrivate((Boolean) repoData.get("private"));
			repository.setOwner(((Map<String, Object>) repoData.get("owner")).get("login").toString());
			repository.setHtmlUrl((String) repoData.get("html_url"));
			repository.setSize((Integer) repoData.get("size"));
			repository.setUserId(userId);
			repository.setBranch(branch);
			repository.setStargazersCount((Integer) repoData.get("stargazers_count"));
			repository.setForksCount((Integer) repoData.get("forks_count"));

			Repository savedRepository = repositoryService.saveRepository(repository);
			return ResponseEntity.ok(savedRepository);
		}
		catch (Exception e) {
			return ResponseEntity.status(401).body("Invalid or expired token");
		}
	}

	/**
	 * Retrieves all repositories for the authenticated user.
	 * @param authHeader The Authorization header containing the JWT token
	 * @return ResponseEntity containing the list of repositories or error message
	 */
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

			// Extract userId from token
			String userId = (String) claims.get("id");
			if (userId == null) {
				return ResponseEntity.badRequest().body("No user ID found in token claims");
			}

			// Fetch repositories from the database filtered by userId
			List<Repository> repositories = repositoryService.findByUserId(userId);

			return ResponseEntity.ok(repositories);
		}
		catch (Exception e) {
			logger.error("Token validation failed: {}", e.getMessage()); // Debug log
			return ResponseEntity.status(401).body("Invalid or expired token");
		}
	}

	/**
	 * Deletes a repository and its associated documentation.
	 * @param authHeader The Authorization header containing the JWT token
	 * @param repositoryId The ID of the repository to delete
	 * @return ResponseEntity containing success message or error message
	 */
	@DeleteMapping("/delete-repository")
	public ResponseEntity<?> deleteRepository(@RequestHeader("Authorization") String authHeader,
			@RequestParam String repositoryId) {
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

			// Delete repository and its documentation
			repositoryService.deleteRepositoryWithDocumentation(repositoryId);

			return ResponseEntity.ok(Map.of("message", "Repository and its documentation deleted successfully"));
		}
		catch (Exception e) {
			logger.error("Error deleting repository: {}", e.getMessage()); // Debug log
			return ResponseEntity.status(500).body("Error deleting repository: " + e.getMessage());
		}
	}

	/**
	 * Deletes all documentation for a repository.
	 * @param authHeader The Authorization header containing the JWT token
	 * @param repositoryId The ID of the repository
	 * @return ResponseEntity containing success message or error message
	 */
	@DeleteMapping("/delete-repository-documentation")
	public ResponseEntity<?> deleteRepositoryDocumentation(@RequestHeader("Authorization") String authHeader,
			@RequestParam String repositoryId) {
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

			// Delete repository documentation
			repositoryService.deleteRepositoryDocumentation(repositoryId);

			return ResponseEntity.ok(Map.of("message", "Repository documentation deleted successfully"));
		}
		catch (Exception e) {
			logger.error("Error deleting repository documentation: {}", e.getMessage()); // Debug
			// log
			return ResponseEntity.status(500).body("Error deleting repository documentation: " + e.getMessage());
		}
	}

}
