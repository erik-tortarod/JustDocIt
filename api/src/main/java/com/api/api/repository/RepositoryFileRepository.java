package com.api.api.repository;

import com.api.api.controller.Language;
import com.api.api.controller.RepositoryFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositoryFileRepository extends MongoRepository<RepositoryFile, String> {

	List<RepositoryFile> findByRepositoryId(String repositoryId);

	List<RepositoryFile> findByRepositoryIdAndLanguage(String repositoryId, Language language);

}
