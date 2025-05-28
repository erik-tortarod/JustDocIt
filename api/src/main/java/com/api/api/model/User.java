package com.api.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a user in the system. This class stores information about users who can
 * access the system. Users are stored in MongoDB in the 'users' collection.
 */
@Data
@Document(collection = "users")
public class User {

	/**
	 * Unique identifier for the user.
	 */
	@Id
	private String id;

	/**
	 * GitHub username of the user.
	 */
	private String githubUsername;

	/**
	 * Email address of the user.
	 */
	private String email;

	/**
	 * GitHub access token for the user.
	 */
	private String accessToken;

	/**
	 * Timestamp when the user was created.
	 */
	private long createdAt;

	public User() {
		this.createdAt = System.currentTimeMillis();
	}

}