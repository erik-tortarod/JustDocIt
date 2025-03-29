package api.auth.controller;

import api.auth.models.user.User;
import api.auth.repository.UserRepository;
import api.auth.service.UserService;
import api.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserApiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/user")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid token format");
                errorResponse.put("message", "Authorization header must start with 'Bearer '");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }

            String token = authHeader.substring(7);

            Map<String, Object> claims = JwtUtil.validateToken(token, jwtUtil.getSecretKey1());

            String userId = (String) claims.get("id");

            User user = userService.getUserWithDecryptedToken(userId);

            if (user == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "User not found");
                errorResponse.put("message", "No user exists with the provided token");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            Map<String, Object> userDetails = new HashMap<>();
            userDetails.put("id", user.getId());
            userDetails.put("username", user.getUsername());
            userDetails.put("email", user.getEmail());
            userDetails.put("avatarUrl", user.getAvatarUrl());
            userDetails.put("preferences", user.getPreferences());
            userDetails.put("lastLoginAt", user.getLastLoginAt());
            userDetails.put("createdAt", user.getCreatedAt());


            return ResponseEntity.ok().header("Cache-Control", "max-age=60").body(userDetails);
        } catch (Exception e) {

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid token");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}