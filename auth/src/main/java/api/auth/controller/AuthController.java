package api.auth.controller;

import api.auth.models.user.User;
import api.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String home(){
        return "index";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model, @AuthenticationPrincipal OAuth2User principal){
        String githubId = principal.getAttribute("id").toString();
        User user = userRepository.findByGithubId(githubId);
        model.addAttribute("user",user);

        return "dashboard";
    }

    @GetMapping("/api/user")
    public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User principal){
        String githubId = principal.getAttribute("id").toString();
        User user = userRepository.findByGithubId(githubId);

        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("id",user.getId());
        userDetails.put("username",user.getUsername());
        userDetails.put("email",user.getEmail());
        userDetails.put("avatarUrl",user.getAvatarUrl());
        userDetails.put("preferences",user.getPreferences());

        return  userDetails;
    }
}
