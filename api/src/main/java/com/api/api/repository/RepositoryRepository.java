package com.api.api.repository;

import com.api.api.model.Repository; // Import the model class explicitly
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RepositoryRepository extends MongoRepository<Repository, String> {

	Repository findByGithubId(String githubId);

	List<Repository> findByUserId(String userId); // Fetch repositories by userId

	List<Repository> findByGithubIdAndUserId(String githubId, String userId);

	Repository findByGithubIdAndBranch(String githubId, String branch);

}
