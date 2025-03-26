package api.auth.models.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    private String githubId;
    private String username;
    private String email;
    private String avatarUrl;
    private String accessToken;
    private Date createdAt;
    private Date lastLoginAt;
    private Preferences preferences;
    
}


