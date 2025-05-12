package com.api.api.service;

import com.api.api.model.Activity;
import com.api.api.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

	@Autowired
	private ActivityRepository activityRepository;

	public Activity addActivity(String userId, String description, String category) {
		Activity activity = new Activity(userId, description, category);
		return activityRepository.save(activity);
	}

	public List<Activity> getActivitiesByUserId(String userId) {
		return activityRepository.findByUserId(userId);
	}

}
