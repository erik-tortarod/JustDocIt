package com.api.api.controller;

import com.api.api.model.CodeDocumentation;
import com.api.api.service.CodeDocumentationService;
import com.api.api.util.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documentation")
public class CodeDocumentationController {

	private static final Logger logger = LoggerFactory.getLogger(CodeDocumentationController.class);

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CodeDocumentationService documentationService;

	/**
	 * Escanea un repositorio en busca de archivos del lenguaje especificado y extrae su
	 * documentación
	 */
	@PostMapping("/scan")
	public ResponseEntity<?> scanRepositoryForDocumentation(@RequestHeader("Authorization") String authHeader,
			@RequestParam String repositoryId, @RequestParam Language language,
			@RequestParam(required = false) String branch) {

		logger.info("Solicitud recibida para escanear repositorio {} rama {} buscando documentación de {}",
				repositoryId, branch, language);

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return ResponseEntity.badRequest()
				.body("Formato de encabezado de Autorización inválido. Se esperaba 'Bearer <token>'");
		}

		String token = authHeader.substring(7);
		SecretKey secretKey = jwtUtil.getSecretKey1();

		try {
			// Validar token y extraer claims
			Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
			String userId = (String) claims.get("id"); // Extract userId from token
			String accessToken = (String) claims.get("accessToken"); // Use accessToken
																		// directly

			if (accessToken == null) {
				return ResponseEntity.badRequest().body("No se encontró accessToken en el token");
			}

			// Escanear repositorio
			List<CodeDocumentation> docs = documentationService.scanRepositoryForDocumentation(repositoryId, language,
					accessToken, branch);

			// Associate userId with each documentation entry
			docs.forEach(doc -> doc.setUserId(userId));

			return ResponseEntity.ok(Map.of("mensaje", "Escaneo de documentación completado exitosamente",
					"documentosEncontrados", docs.size()));
		}
		catch (Exception e) {
			logger.error("Error al escanear documentación del repositorio: {}", e.getMessage());
			return ResponseEntity.status(500).body("Error: " + e.getMessage());
		}
	}

	/**
	 * Obtiene la documentación extraída de un repositorio
	 */
	@GetMapping("/repository")
	public ResponseEntity<?> getRepositoryDocumentation(@RequestParam String repositoryId,
			@RequestParam Language language) { // Make language required

		try {
			logger.info("Obteniendo documentación para repositoryId: {} y lenguaje: {}", repositoryId, language);

			// Obtener la documentación asociada al repositoryId y lenguaje
			List<CodeDocumentation> docs = documentationService.getRepositoryDocumentation(repositoryId, language);

			if (docs.isEmpty()) {
				logger.warn("No se encontró documentación para repositoryId: {} y lenguaje: {}", repositoryId,
						language);
				return ResponseEntity.status(404).body("No se encontró documentación para el repositorio solicitado.");
			}

			logger.info("Documentación encontrada: {} documentos", docs.size());
			return ResponseEntity.ok(docs);
		}
		catch (Exception e) {
			logger.error("Error al obtener documentación: {}", e.getMessage(), e);
			return ResponseEntity.status(500).body("Error interno del servidor: " + e.getMessage());
		}
	}

	/**
	 * Obtiene la documentación de un archivo específico
	 */
	@GetMapping("/file")
	public ResponseEntity<?> getFileDocumentation(@RequestHeader("Authorization") String authHeader,
			@RequestParam String repositoryId, @RequestParam String filePath) {

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return ResponseEntity.badRequest()
				.body("Formato de encabezado de Autorización inválido. Se esperaba 'Bearer <token>'");
		}

		try {
			// Solo validar token
			String token = authHeader.substring(7);
			JwtUtil.validateToken(token, jwtUtil.getSecretKey1());

			// Obtener documentación del archivo
			CodeDocumentation doc = documentationService.getFileDocumentation(repositoryId, filePath);

			if (doc == null) {
				return ResponseEntity.notFound().build();
			}

			return ResponseEntity.ok(doc);
		}
		catch (Exception e) {
			logger.error("Error al obtener documentación del archivo: {}", e.getMessage());
			return ResponseEntity.status(401).body("Token inválido o expirado");
		}
	}

}
