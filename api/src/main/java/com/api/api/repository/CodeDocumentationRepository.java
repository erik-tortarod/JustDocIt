package com.api.api.repository;

import com.api.api.controller.Language;
import com.api.api.model.CodeDocumentation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Repository interface for managing code documentation in MongoDB. Provides methods to
 * find and delete documentation based on various criteria such as repository ID,
 * language, branch, and user ID.
 */
public interface CodeDocumentationRepository extends MongoRepository<CodeDocumentation, String> {

	/**
	 * Finds all documentation for a specific repository.
	 * @param repositoryId The ID of the repository
	 * @return List of documentation entries for the repository
	 */
	List<CodeDocumentation> findByRepositoryId(String repositoryId);

	/**
	 * Finds documentation for a specific repository and language.
	 * @param repositoryId The ID of the repository
	 * @param language The programming language
	 * @return List of documentation entries matching the criteria
	 */
	List<CodeDocumentation> findByRepositoryIdAndLanguage(String repositoryId, Language language);

	/**
	 * Finds documentation for a specific repository and branch.
	 * @param repositoryId The ID of the repository
	 * @param branch The branch name
	 * @return List of documentation entries matching the criteria
	 */
	List<CodeDocumentation> findByRepositoryIdAndBranch(String repositoryId, String branch);

	/**
	 * Finds documentation for a specific repository, language, and branch.
	 * @param repositoryId The ID of the repository
	 * @param language The programming language
	 * @param branch The branch name
	 * @return List of documentation entries matching the criteria
	 */
	List<CodeDocumentation> findByRepositoryIdAndLanguageAndBranch(String repositoryId, Language language,
			String branch);

	/**
	 * Finds documentation for a specific file in a repository.
	 * @param repositoryId The ID of the repository
	 * @param filePath The path to the file
	 * @return List of documentation entries for the file
	 */
	List<CodeDocumentation> findByRepositoryIdAndFilePath(String repositoryId, String filePath);

	/**
	 * Finds documentation for a specific repository and user.
	 * @param repositoryId The ID of the repository
	 * @param userId The ID of the user
	 * @return List of documentation entries matching the criteria
	 */
	List<CodeDocumentation> findByRepositoryIdAndUserId(String repositoryId, String userId);

	/**
	 * Finds documentation for a specific repository, user, and language.
	 * @param repositoryId The ID of the repository
	 * @param userId The ID of the user
	 * @param language The programming language
	 * @return List of documentation entries matching the criteria
	 */
	List<CodeDocumentation> findByRepositoryIdAndUserIdAndLanguage(String repositoryId, String userId,
			Language language);

	/**
	 * Deletes all documentation for a specific repository.
	 * @param repositoryId The ID of the repository
	 */
	void deleteByRepositoryId(String repositoryId);

}
