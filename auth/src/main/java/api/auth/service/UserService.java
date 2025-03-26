package api.auth.service;

import api.auth.models.user.Preferences;
import api.auth.models.user.User;
import api.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncryptionService encryptionService;

    public User processOAuthUser(String provider, Map<String, Object> attributes, String accessToken){
        if("github".equals(provider)){
            return processGithubUser(attributes, accessToken);
        }

        throw new UnsupportedOperationException("Provider not supported "+ provider);
    }

    private User processGithubUser(Map<String, Object> attributes, String accessToken){
        String githubId = attributes.get("id").toString();
        User user = userRepository.findByGithubId(githubId);

        if(user == null){
            user = new User();
            user.setGithubId(githubId);
            user.setCreatedAt(new Date());
            user.setPreferences(new Preferences());
        }

        //Update the user information
        user.setUsername((String) attributes.get("login"));
        user.setEmail((String) attributes.get("email"));
        user.setAvatarUrl((String) attributes.get("avatar_url"));

        // Encrypt the access token before storing
        user.setAccessToken(encryptionService.encrypt(accessToken));
        user.setLastLoginAt(new Date());

        return userRepository.save(user);
    }

    /**
     * Retrieves a user and decrypts their access token
     * @param id the user ID
     * @return the user with decrypted access token
     */
    public User getUserWithDecryptedToken(String id) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null && user.getAccessToken() != null) {

            // Create a copy to avoid modifying the cached entity
            User userWithDecryptedToken = new User();

            userWithDecryptedToken.setId(user.getId());
            userWithDecryptedToken.setGithubId(user.getGithubId());
            userWithDecryptedToken.setUsername(user.getUsername());
            userWithDecryptedToken.setEmail(user.getEmail());
            userWithDecryptedToken.setAvatarUrl(user.getAvatarUrl());
            userWithDecryptedToken.setCreatedAt(user.getCreatedAt());
            userWithDecryptedToken.setLastLoginAt(user.getLastLoginAt());
            userWithDecryptedToken.setPreferences(user.getPreferences());

            //Decrypt the attributes that got encrypted at the start
            userWithDecryptedToken.setAccessToken(encryptionService.decrypt(user.getAccessToken()));

            return userWithDecryptedToken;
        }
        return user;
    }
}