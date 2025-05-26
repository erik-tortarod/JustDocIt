package com.api.api.service;

import com.api.api.model.Activity;
import com.api.api.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing user activities in the system. This service handles the
 * creation and retrieval of user activities, which track user actions and interactions
 * within the application.
 */
@Service
public class ActivityService {

	@Autowired
	private ActivityRepository activityRepository;

	/**
	 * Creates and saves a new activity for a user.
	 * @param userId The ID of the user performing the activity
	 * @param description A description of the activity performed
	 * @param category The category or type of activity
	 * @return The created and saved Activity object
	 */
	public Activity addActivity(String userId, String description, String category) {
		Activity activity = new Activity(userId, description, category);
		return activityRepository.save(activity);
	}

	/**
	 * Retrieves all activities associated with a specific user.
	 * @param userId The ID of the user whose activities to retrieve
	 * @return A list of Activity objects associated with the user
	 */
	public List<Activity> getActivitiesByUserId(String userId) {
		return activityRepository.findByUserId(userId);
	}

}
