package com.api.api.service;

import com.api.api.model.Repository;
import com.api.api.repository.RepositoryRepository;
import com.api.api.repository.CodeDocumentationRepository; // Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepositoryService {

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Autowired
    private CodeDocumentationRepository codeDocumentationRepository;

    public Repository saveRepository(Repository repository) {
        Repository existingRepository = repositoryRepository.findByGithubId(repository.getGithubId());
        if (existingRepository != null) {
            existingRepository.setSize(repository.getSize()); // Ensure size is updated
            return existingRepository; // Return the existing repository if already added
        }
        return repositoryRepository.save(repository);
    }

    public Repository findByGithubId(String githubId) {
        return repositoryRepository.findByGithubId(githubId);
    }

    public List<Repository> getAllRepositories() {
        return repositoryRepository.findAll();
    }

    public void deleteRepositoryWithDocumentation(String repositoryId) {
        // Delete associated documentation
        codeDocumentationRepository.deleteByRepositoryId(repositoryId);

        // Delete the repository
        repositoryRepository.deleteById(repositoryId);
    }

}
