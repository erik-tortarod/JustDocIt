package com.api.api.service;

import com.api.api.model.User;
import com.api.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing users in the system. This service handles operations related
 * to user management.
 */
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	/**
	 * Saves a user to the database.
	 * @param user The user to save
	 * @return The saved user
	 */
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	/**
	 * Retrieves all users in the system.
	 * @return A list of all users
	 */
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	/**
	 * Finds a user by their GitHub username.
	 * @param githubUsername The GitHub username to search for
	 * @return The user if found, null otherwise
	 */
	public User findByGithubUsername(String githubUsername) {
		return userRepository.findByGithubUsername(githubUsername);
	}

	/**
	 * Finds a user by their email address.
	 * @param email The email address to search for
	 * @return The user if found, null otherwise
	 */
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	/**
	 * Gets the total number of users in the system.
	 * @return The total number of users
	 */
	public long getTotalUsers() {
		return userRepository.count();
	}

}