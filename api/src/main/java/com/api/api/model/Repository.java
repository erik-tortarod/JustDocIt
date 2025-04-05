package com.api.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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

}
