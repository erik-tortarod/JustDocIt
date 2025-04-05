package api.auth.repository;

import api.auth.models.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	User findByGithubId(String githubId);

	User findByUsername(String username);

	User findByEmail(String email);

}
