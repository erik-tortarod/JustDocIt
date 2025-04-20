package com.api.api.controller;

import com.api.api.service.RepositoryFileService;
import com.api.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RepositoryFileController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RepositoryFileService repositoryFileService;

    @PostMapping("/scan-repo")
    public ResponseEntity<?> scanRepository(@RequestHeader("Authorization") String authHeader,
            @RequestParam String repositoryId, @RequestParam Language language) {

        if (!authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header");
        }

        try {
            // Extract and validate token
            String token = authHeader.substring(7);
            Map<String, Object> claims = JwtUtil.validateToken(token, jwtUtil.getSecretKey1());

            // Get GitHub access token directly from claims
            String accessToken = (String) claims.get("accessToken");

            if (accessToken == null) {
                return ResponseEntity.badRequest().body("No accessToken found in the token claims");
            }

            // Scan repository
            List<RepositoryFile> files = repositoryFileService.scanRepository(repositoryId, language, accessToken);

            return ResponseEntity.ok(Map.of("message", "Repository scanned successfully", "filesFound", files.size()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while processing your request.");
        }
    }

    @GetMapping("/repo-files")
    public ResponseEntity<?> getRepositoryFiles(@RequestHeader("Authorization") String authHeader,
            @RequestParam String repositoryId, @RequestParam(required = false) Language language) {

        if (!authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header");
        }

        try {
            // Just validate token, we don't need GitHub access for this
            String token = authHeader.substring(7);
            JwtUtil.validateToken(token, jwtUtil.getSecretKey1());

            // Get files
            List<RepositoryFile> files = repositoryFileService.getFiles(repositoryId, language);
            return ResponseEntity.ok(files);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }

}
