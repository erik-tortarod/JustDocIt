package com.api.api.service;

import com.api.api.controller.Language;
import com.api.api.model.CodeDocumentation;
import com.api.api.model.Repository;
import com.api.api.repository.CodeDocumentationRepository;
import com.api.api.repository.RepositoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.HashSet;

/**
 * Servicio para gestionar la documentación de código extraída de repositorios. Coordina
 * el escaneo de repositorios, extracción de documentación y almacenamiento.
 */
@Service
public class CodeDocumentationService {

	private static final Logger logger = LoggerFactory.getLogger(CodeDocumentationService.class);

	@Autowired
	private RepositoryRepository repositoryRepository;

	@Autowired
	private CodeDocumentationRepository documentationRepository;

	@Autowired
	private TypeScriptDocumentationParser typeScriptParser;

	@Autowired
	private PythonDocumentationParser pythonParser;

	private final RestTemplate restTemplate = new RestTemplate();

	/**
	 * Escanea un repositorio en busca de archivos del lenguaje especificado y extrae su
	 * documentación
	 * @param githubRepoId ID del repositorio en GitHub
	 * @param language Lenguaje de programación a analizar
	 * @param accessToken Token de acceso a GitHub
	 * @param branch Rama del repositorio a escanear (opcional)
	 * @return Lista de documentación extraída y guardada
	 */
	public List<CodeDocumentation> scanRepositoryForDocumentation(String githubRepoId, Language language,
			String accessToken, String requestedBranch) {
		logger.info("Escaneando repositorio {} en busca de archivos {}", githubRepoId, language);

		// Get the repository branch from the request or fetch default branch
		String branch = requestedBranch;
		if (branch == null) {
			try {
				// Get repository info from GitHub to determine the default branch
				HttpHeaders headers = new HttpHeaders();
				headers.set("Authorization", "Bearer " + accessToken);
				String repoUrl = "https://api.github.com/repositories/" + githubRepoId;
				ResponseEntity<Map> response = restTemplate.exchange(repoUrl, HttpMethod.GET, new HttpEntity<>(headers),
						Map.class);
				Map<String, Object> repoData = response.getBody();
				if (repoData != null && repoData.get("default_branch") != null) {
					branch = (String) repoData.get("default_branch");
				}
				else {
					branch = "main"; // Default to main branch if not found
				}
			}
			catch (Exception e) {
				logger.warn("Error getting default branch, using 'main': {}", e.getMessage());
				branch = "main";
			}
		}

		// Obtener el repositorio de la base de datos usando githubId y branch
		Repository repository = repositoryRepository.findByGithubIdAndBranch(githubRepoId, branch);
		if (repository == null) {
			throw new RuntimeException("Repositorio no encontrado con ID: " + githubRepoId + " y rama: " + branch);
		}

		// Verificar soporte para el lenguaje
		if (language != Language.TYPESCRIPT && language != Language.PYTHON) {
			throw new RuntimeException(
					"Actualmente solo se soporta análisis de documentación para TypeScript y Python");
		}

		// Add the language to the documentedLanguages list if not already present
		if (repository.getDocumentedLanguages() == null) {
			repository.setDocumentedLanguages(new ArrayList<>());
		}
		if (!repository.getDocumentedLanguages().contains(language.name())) {
			repository.getDocumentedLanguages().add(language.name());
			repositoryRepository.save(repository); // Save the updated repository
		}

		// Escanear contenido del repositorio
		List<CodeDocumentation> documentations = new ArrayList<>();
		String contentsUrl = "https://api.github.com/repositories/" + githubRepoId + "/contents";

		scanDirectory(contentsUrl, repository.getId(), language, accessToken, documentations);

		logger.info("Escaneado completo. Se encontraron {} archivos {} con documentación", documentations.size(),
				language);
		return documentations;
	}

	/**
	 * Escanea un directorio recursivamente en busca de archivos del lenguaje especificado
	 */
	private void scanDirectory(String url, String repoId, Language language, String token,
			List<CodeDocumentation> docs) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);

			// Get the repository to get its branch
			Repository repository = repositoryRepository.findById(repoId)
				.orElseThrow(() -> new RuntimeException("Repository not found with ID: " + repoId));

			// Add branch to the URL for GitHub API
			String branchParam = "?ref=" + repository.getBranch();
			String urlWithBranch = url;
			if (!url.contains("?")) {
				urlWithBranch = url + branchParam;
			}
			else if (!url.contains("ref=")) {
				urlWithBranch = url + "&ref=" + repository.getBranch();
			}

			logger.debug("Requesting GitHub API URL: {}", urlWithBranch);
			ResponseEntity<List> response = restTemplate.exchange(urlWithBranch, HttpMethod.GET,
					new HttpEntity<>(headers), List.class);

			List<Map<String, Object>> contents = response.getBody();
			if (contents == null) {
				logger.warn("No contents found for URL: {}", urlWithBranch);
				return;
			}

			for (Map<String, Object> item : contents) {
				String type = (String) item.get("type");
				String path = (String) item.get("path");
				String itemName = (String) item.get("name");

				logger.debug("Analyzing item: {}, type: {}", path, type);

				if ("dir".equals(type)) {
					// Recursively scan directory
					String dirUrl = (String) item.get("url");
					scanDirectory(dirUrl, repoId, language, token, docs);
				}
				else if ("file".equals(type) && hasLanguageExtension(path, language)) {
					logger.info("Found compatible file: {}", path);
					// Process file
					String downloadUrl = (String) item.get("download_url");
					if (downloadUrl == null) {
						logger.warn("No download URL for file: {}", path);
						continue;
					}

					String fileContent = getFileContent(downloadUrl, token);
					if (fileContent != null) {
						logger.debug("File content length: {}", fileContent.length());
						logger.debug("First 100 chars: {}",
								fileContent.substring(0, Math.min(fileContent.length(), 100)));

						CodeDocumentation doc = null;
						switch (language) {
							case TYPESCRIPT:
								doc = typeScriptParser.parseFile(repoId, path, fileContent, language);
								doc.setBranch(repository.getBranch());
								break;
							case PYTHON:
								doc = pythonParser.parseFile(repoId, path, fileContent, language);
								doc.setBranch(repository.getBranch());
								break;
							default:
								logger.warn("No parser for language: {}", language);
								continue;
						}

						docs.add(documentationRepository.save(doc));
						logger.info("File processed and saved: {}", path);
					}
					else {
						logger.warn("Could not get content for file: {}", path);
					}
				}
				else if ("file".equals(type)) {
					logger.debug("File ignored (incompatible extension): {}", path);
				}
			}
		}
		catch (Exception e) {
			logger.error("Error scanning directory {}: {}", url, e.getMessage(), e);
		}
	}

	/**
	 * Verifica si la documentación tiene contenido
	 */
	private boolean hasContent(CodeDocumentation doc) {
		// Modificado para guardar todos los archivos durante pruebas
		return true;

		/*
		 * Versión original if (doc == null || doc.getContent() == null) return false;
		 *
		 * return (doc.getContent().getClasses() != null &&
		 * !doc.getContent().getClasses().isEmpty()) || (doc.getContent().getFunctions()
		 * != null && !doc.getContent().getFunctions().isEmpty()) ||
		 * (doc.getContent().getInterfaces() != null &&
		 * !doc.getContent().getInterfaces().isEmpty()) ||
		 * (doc.getContent().getVariables() != null &&
		 * !doc.getContent().getVariables().isEmpty());
		 */
	}

	/**
	 * Verifica si un archivo tiene la extensión correspondiente al lenguaje
	 */
	private boolean hasLanguageExtension(String filePath, Language language) {
		if (filePath == null) {
			logger.debug("File path is null");
			return false;
		}

		// Soporte especial para TypeScript (.ts y .tsx)
		if (language == Language.TYPESCRIPT) {
			boolean isTypeScript = filePath.endsWith(".ts") || filePath.endsWith(".tsx");
			logger.debug("Checking TypeScript file: {} - Is TypeScript: {}", filePath, isTypeScript);
			return isTypeScript;
		}

		boolean hasExtension = filePath.endsWith(language.getExtension());
		logger.debug("Checking file extension for {}: {} - Has extension: {}", language, filePath, hasExtension);
		return hasExtension;
	}

	/**
	 * Obtiene el contenido de un archivo desde GitHub
	 */
	private String getFileContent(String url, String token) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);
			headers.set("Accept", "application/vnd.github.v3.raw");

			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
					String.class);

			if (response.getBody() == null) {
				logger.warn("Empty response body from GitHub API for URL: {}", url);
				return null;
			}

			return response.getBody();
		}
		catch (Exception e) {
			logger.error("Error getting file content from {}: {}", url, e.getMessage(), e);
			return null;
		}
	}

	/**
	 * Obtiene la documentación de un repositorio
	 */
	public List<CodeDocumentation> getRepositoryDocumentation(String repositoryId) {
		logger.info("Buscando documentación para repositoryId: {}", repositoryId);
		List<CodeDocumentation> docs = documentationRepository.findByRepositoryId(repositoryId);
		logger.info("Documentos encontrados: {}", docs.size());
		return docs;
	}

	/**
	 * Obtiene la documentación de un repositorio filtrada por lenguaje
	 */
	public List<CodeDocumentation> getRepositoryDocumentation(String repositoryId, Language language) {
		// Get the repository to determine its branch
		Repository repository = repositoryRepository.findById(repositoryId)
			.orElseThrow(() -> new RuntimeException("Repository not found with ID: " + repositoryId));

		return documentationRepository.findByRepositoryIdAndLanguageAndBranch(repositoryId, language,
				repository.getBranch());
	}

	/**
	 * Obtiene la documentación de un archivo específico
	 */
	public CodeDocumentation getFileDocumentation(String repositoryId, String filePath) {
		// Get the repository to determine its branch
		Repository repository = repositoryRepository.findById(repositoryId)
			.orElseThrow(() -> new RuntimeException("Repository not found with ID: " + repositoryId));

		// Find documentation for this specific file in this branch
		List<CodeDocumentation> docs = documentationRepository.findByRepositoryIdAndFilePath(repositoryId, filePath);
		return docs.stream().filter(doc -> repository.getBranch().equals(doc.getBranch())).findFirst().orElse(null);
	}

	public List<CodeDocumentation> getRepositoryDocumentationByUser(String repositoryId, String userId,
			Language language) {
		// Get the repository to determine its branch
		Repository repository = repositoryRepository.findById(repositoryId)
			.orElseThrow(() -> new RuntimeException("Repository not found with ID: " + repositoryId));

		if (language != null) {
			logger.info("Buscando documentación para repositoryId: {}, userId: {}, language: {}, branch: {}",
					repositoryId, userId, language, repository.getBranch());
			List<CodeDocumentation> docs = documentationRepository.findByRepositoryIdAndUserIdAndLanguage(repositoryId,
					userId, language);
			// Filter by branch
			docs = docs.stream().filter(doc -> repository.getBranch().equals(doc.getBranch())).toList();
			logger.info("Documentos encontrados: {}", docs.size());
			return docs;
		}
		else {
			logger.info("Buscando documentación para repositoryId: {}, userId: {}, branch: {}", repositoryId, userId,
					repository.getBranch());
			List<CodeDocumentation> docs = documentationRepository.findByRepositoryIdAndUserId(repositoryId, userId);
			// Filter by branch
			docs = docs.stream().filter(doc -> repository.getBranch().equals(doc.getBranch())).toList();
			logger.info("Documentos encontrados: {}", docs.size());
			return docs;
		}
	}

}
