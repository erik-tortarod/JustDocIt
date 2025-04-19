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

	private final RestTemplate restTemplate = new RestTemplate();

	/**
	 * Escanea un repositorio en busca de archivos del lenguaje especificado y extrae su
	 * documentación
	 * @param githubRepoId ID del repositorio en GitHub
	 * @param language Lenguaje de programación a analizar
	 * @param accessToken Token de acceso a GitHub
	 * @return Lista de documentación extraída y guardada
	 */
	public List<CodeDocumentation> scanRepositoryForDocumentation(String githubRepoId, Language language,
			String accessToken) {
		logger.info("Escaneando repositorio {} en busca de archivos {}", githubRepoId, language);

		// Obtener el repositorio de la base de datos
		Repository repository = repositoryRepository.findByGithubId(githubRepoId);
		if (repository == null) {
			throw new RuntimeException("Repositorio no encontrado: " + githubRepoId);
		}

		// Verificar soporte para el lenguaje
		if (language != Language.TYPESCRIPT) {
			throw new RuntimeException("Actualmente solo se soporta análisis de documentación para TypeScript");
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

			ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
					List.class);

			List<Map<String, Object>> contents = response.getBody();
			if (contents == null)
				return;

			for (Map<String, Object> item : contents) {
				String type = (String) item.get("type");
				String path = (String) item.get("path");
				String itemName = (String) item.get("name");

				logger.debug("Analizando item: {}, tipo: {}", path, type);

				if ("dir".equals(type)) {
					// Escanear directorio recursivamente
					scanDirectory((String) item.get("url"), repoId, language, token, docs);
				}
				else if ("file".equals(type) && hasLanguageExtension(path, language)) {
					logger.info("Encontrado archivo compatible: {}", path);
					// Procesar archivo del lenguaje especificado
					String fileContent = getFileContent((String) item.get("url"), token);
					if (fileContent != null) {
						// Log de los primeros caracteres para depuración
						logger.debug("Contenido del archivo (primeros 100 caracteres): {}",
								fileContent.substring(0, Math.min(fileContent.length(), 100)));

						// Parsear el contenido y extraer documentación
						CodeDocumentation doc = null;

						switch (language) {
							case TYPESCRIPT:
								doc = typeScriptParser.parseFile(repoId, path, fileContent, language);
								break;
							// Futuros parsers para otros lenguajes se añadirían aquí
							default:
								logger.warn("No hay parser para el lenguaje: {}", language);
								continue;
						}

						// Guardar todos los archivos para propósitos de prueba
						docs.add(documentationRepository.save(doc));
						logger.info("Archivo procesado y guardado: {}", path);
					}
					else {
						logger.warn("No se pudo obtener el contenido del archivo: {}", path);
					}
				}
				else if ("file".equals(type)) {
					logger.debug("Archivo ignorado (extensión no compatible): {}", path);
				}
			}
		}
		catch (Exception e) {
			logger.error("Error escaneando directorio {}: {}", url, e.getMessage(), e);
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
		if (filePath == null)
			return false;

		// Soporte especial para TypeScript (.ts y .tsx)
		if (language == Language.TYPESCRIPT) {
			return filePath.endsWith(".ts") || filePath.endsWith(".tsx");
		}

		return filePath.endsWith(language.getExtension());
	}

	/**
	 * Obtiene el contenido de un archivo desde GitHub
	 */
	private String getFileContent(String url, String token) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + token);

			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers),
					Map.class);

			Map<String, Object> data = response.getBody();
			if (data == null || !data.containsKey("content")) {
				logger.warn("Archivo sin contenido o formato no esperado: {}", url);
				return null;
			}

			String encodedContent = (String) data.get("content");
			return new String(Base64.getDecoder().decode(encodedContent.replaceAll("\\n", "")));
		}
		catch (Exception e) {
			logger.error("Error obteniendo contenido del archivo {}: {}", url, e.getMessage(), e);
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
		return documentationRepository.findByRepositoryIdAndLanguage(repositoryId, language);
	}

	/**
	 * Obtiene la documentación de un archivo específico
	 */
	public CodeDocumentation getFileDocumentation(String repositoryId, String filePath) {
		return documentationRepository.findByRepositoryIdAndFilePath(repositoryId, filePath);
	}

	public List<CodeDocumentation> getRepositoryDocumentationByUser(String repositoryId, String userId,
			Language language) {
		if (language != null) {
			logger.info("Buscando documentación para repositoryId: {}, userId: {}, language: {}", repositoryId, userId,
					language);
			List<CodeDocumentation> docs = documentationRepository.findByRepositoryIdAndUserIdAndLanguage(repositoryId,
					userId, language);
			logger.info("Documentos encontrados: {}", docs.size());
			return docs;
		}
		else {
			logger.info("Buscando documentación para repositoryId: {}, userId: {}", repositoryId, userId);
			List<CodeDocumentation> docs = documentationRepository.findByRepositoryIdAndUserId(repositoryId, userId);
			logger.info("Documentos encontrados: {}", docs.size());
			return docs;
		}
	}

}