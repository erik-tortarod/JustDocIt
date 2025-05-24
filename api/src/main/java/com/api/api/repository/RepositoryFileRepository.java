package com.api.api.repository;

import com.api.api.controller.Language;
import com.api.api.controller.RepositoryFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing repository files in MongoDB. Provides
 * methods to find files based on repository ID and language.
 */
@Repository
public interface RepositoryFileRepository extends MongoRepository<RepositoryFile, String> {

    /**
     * Finds all files for a specific repository.
     *
     * @param repositoryId The ID of the repository
     * @return List of files in the repository
     */
    List<RepositoryFile> findByRepositoryId(String repositoryId);

    /**
     * Finds files for a specific repository and language.
     *
     * @param repositoryId The ID of the repository
     * @param language The programming language
     * @return List of files matching the criteria
     */
    List<RepositoryFile> findByRepositoryIdAndLanguage(String repositoryId, Language language);

}
