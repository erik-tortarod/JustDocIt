package api.auth.controller;

import api.auth.models.user.User;
import api.auth.repository.UserRepository;
import api.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

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

    @PostMapping("/auth/token")
    public String generateToken(@RequestParam String id, @RequestParam String accessToken){
        return jwtUtil.generateToken(id, accessToken);
    }

}
