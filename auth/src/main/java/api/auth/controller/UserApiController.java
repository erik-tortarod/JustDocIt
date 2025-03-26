package api.auth.controller;

import api.auth.models.user.User;
import api.auth.repository.UserRepository;
import api.auth.service.UserService;
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

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        User user = userService.getUserWithDecryptedToken(id);

        if (user == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            errorResponse.put("message", "No user exists with the provided ID");

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
        userDetails.put("accessToken", user.getAccessToken());

        return ResponseEntity.ok().header("Cache-Control", "max-age=60").body(userDetails);
    }
}