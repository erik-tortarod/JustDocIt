package com.api.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "repositories")
public class Repository {

    @Id
    private String id;

    private String githubId;

    private String name;

    private String description;

    private boolean isPrivate;

    private String owner;

    private String htmlUrl;

    private String userId; // Add this field to associate the repository with a user

    private List<String> documentedLanguages; // New attribute

    private int size; // New property to store repository size

    // Add missing setter methods
    public void setGithubId(String githubId) {
        this.githubId = githubId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrivate(boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setHtmlUrl(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getDocumentedLanguages() {
        return documentedLanguages;
    }

    public void setDocumentedLanguages(List<String> documentedLanguages) {
        this.documentedLanguages = documentedLanguages;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getId() {
        return id;
    }

}
