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

@Service
public class RepositoryFileService {

	@Autowired
	private RepositoryFileRepository repositoryFileRepository;

	@Autowired
	private RepositoryRepository repositoryRepository;

	private final RestTemplate restTemplate = new RestTemplate();

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

	private void scanContents(String url, String repoId, Language language, String token,
			List<RepositoryFile> savedFiles) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);

		ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
				List.class);

		List<Map<String, Object>> contents = response.getBody();
		if (contents == null)
			return;

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

	public List<RepositoryFile> getFiles(String repositoryId, Language language) {
		if (language != null) {
			return repositoryFileRepository.findByRepositoryIdAndLanguage(repositoryId, language);
		}
		return repositoryFileRepository.findByRepositoryId(repositoryId);
	}

}
