package api.auth.config;

import api.auth.models.user.User;
import api.auth.service.EncryptionService;
import api.auth.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Autowired
    private OAuth2AuthorizedClientService clientService;

    @Autowired
    private EncryptionService encryptionService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oAuth2User = oauthToken.getPrincipal();

        // Get GitHub Access Token
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(),
                oauthToken.getName()
        );

        String accessToken = client.getAccessToken().getTokenValue();

        // Save user in MongoDB and get the saved user
        User user = userService.processOAuthUser(
                oauthToken.getAuthorizedClientRegistrationId(),
                oAuth2User.getAttributes(),
                accessToken
        );

        // Redirect to the frontend with user ID and access token as parameters
        getRedirectStrategy().sendRedirect(
                request,
                response,
                String.format("http://localhost:5173/dashboard?userId=%s&accessToken=%s",
                        user.getId(),
                        encryptionService.encrypt(accessToken))
        );
    }
}