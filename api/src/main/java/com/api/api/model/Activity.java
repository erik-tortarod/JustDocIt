package com.api.api.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Represents a user activity in the system. This class is used to track various user
 * actions and events. Activities are stored in MongoDB in the 'activities' collection.
 */
@Document(collection = "activities")
public class Activity {

	/**
	 * Unique identifier for the activity.
	 */
	@Id
	private String id;

	/**
	 * ID of the user who performed the activity.
	 */
	private String userId;

	/**
	 * Description of the activity performed.
	 */
	private String description;

	/**
	 * Category of the activity (e.g., "repository", "documentation", etc.).
	 */
	private String category;

	/**
	 * Timestamp when the activity was performed.
	 */
	private LocalDateTime timestamp;

	/**
	 * Creates a new activity with the specified details.
	 * @param userId ID of the user performing the activity
	 * @param description Description of the activity
	 * @param category Category of the activity
	 */
	public Activity(String userId, String description, String category) {
		this.userId = userId;
		this.description = description;
		this.category = category;
		this.timestamp = LocalDateTime.now();
	}

	// Getters and setters
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

}
