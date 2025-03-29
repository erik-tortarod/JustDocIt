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
import java.util.logging.Logger;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger LOGGER = Logger.getLogger(OAuth2LoginSuccessHandler.class.getName());

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

        // Log user attributes for debugging
        LOGGER.info("OAuth2 User Attributes: " + oAuth2User.getAttributes());

        // Get GitHub Access Token
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(),
                oauthToken.getName()
        );

        if (client == null || client.getAccessToken() == null) {
            LOGGER.severe("Failed to retrieve access token from GitHub.");
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to retrieve access token.");
            return;
        }

        String accessToken = client.getAccessToken().getTokenValue();

        // Save user in MongoDB and get the saved user
        User user = userService.processOAuthUser(
                oauthToken.getAuthorizedClientRegistrationId(),
                oAuth2User.getAttributes(),
                accessToken
        );

        // Redirect to the frontend with user ID and access token as parameters
        String redirectUrl = String.format("http://localhost:5173/dashboard?userId=%s&accessToken=%s",
                user.getId(),
                encryptionService.encrypt(accessToken));

        LOGGER.info("Redirecting to: " + redirectUrl);

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}