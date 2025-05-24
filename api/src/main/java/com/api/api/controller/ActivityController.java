package com.api.api.controller;

import com.api.api.model.Activity;
import com.api.api.service.ActivityService;
import com.api.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for managing user activities. This controller handles all
 * activity-related operations including creating and retrieving activities. All
 * endpoints require JWT authentication.
 */
@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ActivityService activityService;

    /**
     * Creates a new activity for the authenticated user.
     *
     * @param authHeader The Authorization header containing the JWT token
     * @param requestBody Map containing activity details: - description: The
     * activity description - category: The activity category
     * @return ResponseEntity containing the created activity or an error
     * message
     */
    @PostMapping
    public ResponseEntity<?> addActivity(@RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> requestBody) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7);
        SecretKey secretKey = jwtUtil.getSecretKey1();

        try {
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            String userId = (String) claims.get("id");

            String description = requestBody.get("description");
            String category = requestBody.get("category"); // New field for category

            if (description == null || description.isEmpty()) {
                return ResponseEntity.badRequest().body("Description is required");
            }

            if (category == null || category.isEmpty()) {
                return ResponseEntity.badRequest().body("Category is required");
            }

            Activity activity = activityService.addActivity(userId, description, category);
            return ResponseEntity.ok(activity);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    /**
     * Retrieves all activities for the authenticated user.
     *
     * @param authHeader The Authorization header containing the JWT token
     * @return ResponseEntity containing a list of activities or an error
     * message
     */
    @GetMapping
    public ResponseEntity<?> getActivities(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid Authorization header format. Expected 'Bearer <token>'");
        }

        String token = authHeader.substring(7);
        SecretKey secretKey = jwtUtil.getSecretKey1();

        try {
            Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
            String userId = (String) claims.get("id");

            List<Activity> activities = activityService.getActivitiesByUserId(userId);
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

}
