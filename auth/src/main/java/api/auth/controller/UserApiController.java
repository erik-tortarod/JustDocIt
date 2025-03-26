package api.auth.controller;

import api.auth.models.user.User;
import api.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserApiController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        Optional<User> userOptional = userRepository.findById(id);

        if(userOptional.isEmpty()){
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error","User not found");
            errorResponse.put("message","No user exists with the provided ID");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        User user = userOptional.get();

        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("id",user.getId());
        userDetails.put("username",user.getUsername());
        userDetails.put("email",user.getEmail());
        userDetails.put("avatarUrl",user.getAvatarUrl());
        userDetails.put("preferences",user.getPreferences());
        userDetails.put("lastLoginAt",user.getLastLoginAt());
        userDetails.put("createdAt",user.getCreatedAt());

        return ResponseEntity.ok().header("Cache-Control","max-age=60").body(userDetails);
    }
}
