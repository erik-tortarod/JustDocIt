package com.api.api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

/**
 * Represents a GitHub repository in the system. This class stores information about
 * repositories that users have added to track. Repositories are stored in MongoDB in the
 * 'repositories' collection.
 */
@Data
@Document(collection = "repositories")
public class Repository {

	/**
	 * Unique identifier for the repository in our system.
	 */
	@Id
	private String id;

	/**
	 * GitHub's unique identifier for the repository.
	 */
	private String githubId;

	/**
	 * Name of the repository.
	 */
	private String name;

	/**
	 * Description of the repository.
	 */
	private String description;

	/**
	 * Whether the repository is private or public.
	 */
	private boolean isPrivate;

	/**
	 * GitHub username of the repository owner.
	 */
	private String owner;

	/**
	 * URL to the repository's GitHub page.
	 */
	private String htmlUrl;

	/**
	 * ID of the user who added this repository.
	 */
	private String userId;

	/**
	 * List of programming languages that have been documented in this repository.
	 */
	private List<String> documentedLanguages;

	/**
	 * Size of the repository in kilobytes.
	 */
	private int size;

	/**
	 * Name of the branch being tracked.
	 */
	private String branch;

	/**
	 * Number of stars the repository has on GitHub.
	 */
	private int stargazersCount;

	/**
	 * Number of forks the repository has on GitHub.
	 */
	private int forksCount;

	// Getters and setters
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

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public int getStargazersCount() {
		return stargazersCount;
	}

	public void setStargazersCount(int stargazersCount) {
		this.stargazersCount = stargazersCount;
	}

	public int getForksCount() {
		return forksCount;
	}

	public void setForksCount(int forksCount) {
		this.forksCount = forksCount;
	}

	public String getId() {
		return id;
	}

}
