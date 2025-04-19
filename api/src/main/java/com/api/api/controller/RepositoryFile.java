package com.api.api.controller;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "repository_files")
public class RepositoryFile {

	@Id
	private String id;

	private String repositoryId;

	private Language language;

	private String content;

	public void setRepositoryId(String repositoryId) {
		this.repositoryId = repositoryId;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
