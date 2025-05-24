package com.api.api.controller;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Represents a file from a repository that has been scanned and stored in the
 * system. This class is used to store the content of files from repositories
 * for later analysis and documentation. Files are stored in MongoDB in the
 * 'repository_files' collection.
 */
@Data
@Document(collection = "repository_files")
public class RepositoryFile {

    /**
     * Unique identifier for the file in the system.
     */
    @Id
    private String id;

    /**
     * ID of the repository this file belongs to.
     */
    private String repositoryId;

    /**
     * Programming language of the file.
     */
    private Language language;

    /**
     * Content of the file as a string.
     */
    private String content;

    /**
     * Sets the repository ID for this file.
     *
     * @param repositoryId The ID of the repository this file belongs to
     */
    public void setRepositoryId(String repositoryId) {
        this.repositoryId = repositoryId;
    }

    /**
     * Sets the programming language of this file.
     *
     * @param language The programming language of the file
     */
    public void setLanguage(Language language) {
        this.language = language;
    }

    /**
     * Sets the content of this file.
     *
     * @param content The content of the file as a string
     */
    public void setContent(String content) {
        this.content = content;
    }

}
