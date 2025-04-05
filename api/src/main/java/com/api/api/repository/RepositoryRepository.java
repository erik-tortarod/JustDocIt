package com.api.api.repository;

import com.api.api.model.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@org.springframework.stereotype.Repository
public interface RepositoryRepository extends MongoRepository<Repository, String> {

	Repository findByGithubId(String githubId);

}
