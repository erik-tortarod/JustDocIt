package com.api.api.repository;

import com.api.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing users in MongoDB. Provides methods to find users
 * based on various criteria.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

	/**
	 * Finds a user by their GitHub username.
	 * @param githubUsername The GitHub username to search for
	 * @return The user if found, null otherwise
	 */
	User findByGithubUsername(String githubUsername);

	/**
	 * Finds a user by their email address.
	 * @param email The email address to search for
	 * @return The user if found, null otherwise
	 */
	User findByEmail(String email);

}