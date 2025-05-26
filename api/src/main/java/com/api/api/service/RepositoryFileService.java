package com.api.api.service;

import com.api.api.controller.Language;
import com.api.api.controller.RepositoryFile;
import com.api.api.model.Repository;
import com.api.api.repository.RepositoryFileRepository;
import com.api.api.repository.RepositoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

/**
 * Service class for managing repository files. This service handles operations related to
 * scanning repositories for files of specific programming languages, retrieving file
 * contents, and storing them in the database.
 */
@Service
public class RepositoryFileService {

	@Autowired
	private RepositoryFileRepository repositoryFileRepository;

	@Autowired
	private RepositoryRepository repositoryRepository;

	private final RestTemplate restTemplate = new RestTemplate();

	/**
	 * Scans a repository for files of a specific programming language and stores them.
	 * @param githubRepoId The GitHub ID of the repository to scan
	 * @param language The programming language to filter files by
	 * @param accessToken The GitHub access token for API authentication
	 * @return A list of saved repository files
	 * @throws RuntimeException if the repository is not found
	 */
	public List<RepositoryFile> scanRepository(String githubRepoId, Language language, String accessToken) {
		// Get repository from database
		Repository repository = repositoryRepository.findByGithubId(githubRepoId);
		if (repository == null) {
			throw new RuntimeException("Repository not found: " + githubRepoId);
		}

		// Scan repository contents
		List<RepositoryFile> savedFiles = new ArrayList<>();
		String contentsUrl = "https://api.github.com/repositories/" + githubRepoId + "/contents";
		scanContents(contentsUrl, repository.getId(), language, accessToken, savedFiles);

		return savedFiles;
	}

	/**
	 * Recursively scans a directory in the repository for files of the specified
	 * language.
	 * @param url The GitHub API URL for the directory contents
	 * @param repoId The ID of the repository
	 * @param language The programming language to filter files by
	 * @param token The GitHub access token
	 * @param savedFiles List to store the found files
	 */
	private void scanContents(String url, String repoId, Language language, String token,
			List<RepositoryFile> savedFiles) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);

		ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
				List.class);

		List<Map<String, Object>> contents = response.getBody();
		if (contents == null) {
			return;
		}

		for (Map<String, Object> item : contents) {
			String type = (String) item.get("type");
			String name = (String) item.get("name");

			if ("dir".equals(type)) {
				// Recursively scan directory
				scanContents((String) item.get("url"), repoId, language, token, savedFiles);
			}
			else if ("file".equals(type) && name.endsWith(language.getExtension())) {
				// Get file content and save
				String fileContent = getFileContent((String) item.get("url"), token);
				if (fileContent != null) {
					RepositoryFile file = new RepositoryFile();
					file.setRepositoryId(repoId);
					file.setLanguage(language);
					file.setContent(fileContent);
					savedFiles.add(repositoryFileRepository.save(file));
				}
			}
		}
	}

	/**
	 * Retrieves the content of a file from GitHub.
	 * @param url The GitHub API URL for the file
	 * @param token The GitHub access token
	 * @return The decoded content of the file, or null if an error occurs
	 */
	private String getFileContent(String url, String token) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);

			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
					Map.class);

			Map<String, Object> data = response.getBody();
			String content = (String) data.get("content");

			return new String(Base64.getDecoder().decode(content.replaceAll("\\n", "")));
		}
		catch (Exception e) {
			return null;
		}
	}

	/**
	 * Retrieves files from a repository, optionally filtered by language.
	 * @param repositoryId The ID of the repository
	 * @param language The programming language to filter by (optional)
	 * @return A list of repository files
	 */
	public List<RepositoryFile> getFiles(String repositoryId, Language language) {
		if (language != null) {
			return repositoryFileRepository.findByRepositoryIdAndLanguage(repositoryId, language);
		}
		return repositoryFileRepository.findByRepositoryId(repositoryId);
	}

}
