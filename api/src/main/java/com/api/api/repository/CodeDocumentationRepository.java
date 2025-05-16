package com.api.api.repository;

import com.api.api.controller.Language;
import com.api.api.model.CodeDocumentation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CodeDocumentationRepository extends MongoRepository<CodeDocumentation, String> {

	List<CodeDocumentation> findByRepositoryId(String repositoryId);

	List<CodeDocumentation> findByRepositoryIdAndLanguage(String repositoryId, Language language);

	List<CodeDocumentation> findByRepositoryIdAndBranch(String repositoryId, String branch);

	List<CodeDocumentation> findByRepositoryIdAndLanguageAndBranch(String repositoryId, Language language,
			String branch);

	List<CodeDocumentation> findByRepositoryIdAndFilePath(String repositoryId, String filePath);

	List<CodeDocumentation> findByRepositoryIdAndUserId(String repositoryId, String userId);

	List<CodeDocumentation> findByRepositoryIdAndUserIdAndLanguage(String repositoryId, String userId,
			Language language);

	void deleteByRepositoryId(String repositoryId);

}
