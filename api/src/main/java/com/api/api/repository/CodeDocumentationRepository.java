package com.api.api.repository;

import com.api.api.controller.Language;
import com.api.api.model.CodeDocumentation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CodeDocumentationRepository extends MongoRepository<CodeDocumentation, String> {

	List<CodeDocumentation> findByRepositoryId(String repositoryId);

	List<CodeDocumentation> findByRepositoryIdAndLanguage(String repositoryId, Language language);

	CodeDocumentation findByRepositoryIdAndFilePath(String repositoryId, String filePath);

	List<CodeDocumentation> findByRepositoryIdAndUserIdAndLanguage(String repositoryId, String userId,
			Language language);

	List<CodeDocumentation> findByRepositoryIdAndUserId(String repositoryId, String userId);

	void deleteByRepositoryId(String repositoryId);

}
