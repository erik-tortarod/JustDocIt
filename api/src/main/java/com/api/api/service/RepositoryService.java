package com.api.api.service;

import com.api.api.model.Repository;
import com.api.api.repository.RepositoryRepository;
import com.api.api.repository.CodeDocumentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing GitHub repositories in the system. This service
 * handles operations related to saving, retrieving, and deleting repositories,
 * as well as managing their associated documentation.
 */
@Service
public class RepositoryService {

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Autowired
    private CodeDocumentationRepository codeDocumentationRepository;

    /**
     * Saves a repository to the database. If a repository with the same GitHub
     * ID and branch already exists for the user, it updates the existing
     * repository instead of creating a new one.
     *
     * @param repository The repository to save
     * @return The saved repository
     */
    public Repository saveRepository(Repository repository) {
        List<Repository> existingRepositories = repositoryRepository.findByGithubIdAndUserId(repository.getGithubId(),
                repository.getUserId());
        for (Repository existingRepo : existingRepositories) {
            if (existingRepo.getBranch() != null && existingRepo.getBranch().equals(repository.getBranch())) {
                existingRepo.setSize(repository.getSize()); // Update size
                return existingRepo; // Return the existing repository if already added with same branch
            }
        }
        return repositoryRepository.save(repository);
    }

    /**
     * Finds a repository by its GitHub ID.
     *
     * @param githubId The GitHub ID of the repository to find
     * @return The found repository, or null if not found
     */
    public Repository findByGithubId(String githubId) {
        return repositoryRepository.findByGithubId(githubId);
    }

    /**
     * Retrieves all repositories in the system.
     *
     * @return A list of all repositories
     */
    public List<Repository> getAllRepositories() {
        return repositoryRepository.findAll();
    }

    /**
     * Deletes a repository and all its associated documentation.
     *
     * @param repositoryId The ID of the repository to delete
     */
    public void deleteRepositoryWithDocumentation(String repositoryId) {
        // Delete associated documentation
        codeDocumentationRepository.deleteByRepositoryId(repositoryId);

        // Delete the repository
        repositoryRepository.deleteById(repositoryId);
    }

    /**
     * Finds repositories by GitHub ID and user ID.
     *
     * @param githubId The GitHub ID of the repository
     * @param userId The ID of the user who owns the repository
     * @return A list of matching repositories
     */
    public List<Repository> findByGithubIdAndUserId(String githubId, String userId) {
        return repositoryRepository.findByGithubIdAndUserId(githubId, userId);
    }

}
