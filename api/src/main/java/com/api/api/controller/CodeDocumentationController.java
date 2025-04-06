package com.api.api.controller;

import com.api.api.model.CodeDocumentation;
import com.api.api.service.CodeDocumentationService;
import com.api.api.service.EncryptionService;
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
	private EncryptionService encryptionService;

	@Autowired
	private CodeDocumentationService documentationService;

	/**
	 * Escanea un repositorio en busca de archivos del lenguaje especificado y extrae su
	 * documentación
	 */
	@PostMapping("/scan")
	public ResponseEntity<?> scanRepositoryForDocumentation(@RequestHeader("Authorization") String authHeader,
			@RequestParam String repositoryId, @RequestParam Language language) {

		logger.info("Solicitud recibida para escanear repositorio {} buscando documentación de {}", repositoryId,
				language);

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return ResponseEntity.badRequest()
				.body("Formato de encabezado de Autorización inválido. Se esperaba 'Bearer <token>'");
		}

		String token = authHeader.substring(7);
		SecretKey secretKey = jwtUtil.getSecretKey1();

		try {
			// Validar token y extraer claims
			Map<String, Object> claims = JwtUtil.validateToken(token, secretKey);
			String encryptedAccessToken = (String) claims.get("accessToken");

			if (encryptedAccessToken == null) {
				return ResponseEntity.badRequest().body("No se encontró accessToken en el token");
			}

			// Descifrar el token de acceso de GitHub
			String accessToken = encryptionService.decrypt(encryptedAccessToken);

			// Escanear repositorio
			List<CodeDocumentation> docs = documentationService.scanRepositoryForDocumentation(repositoryId, language,
					accessToken);

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
	public ResponseEntity<?> getRepositoryDocumentation(@RequestHeader("Authorization") String authHeader,
			@RequestParam String repositoryId, @RequestParam(required = false) Language language) {

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			return ResponseEntity.badRequest()
				.body("Formato de encabezado de Autorización inválido. Se esperaba 'Bearer <token>'");
		}

		try {
			// Solo validar token
			String token = authHeader.substring(7);
			JwtUtil.validateToken(token, jwtUtil.getSecretKey1());

			// Obtener documentación
			List<CodeDocumentation> docs;
			if (language != null) {
				docs = documentationService.getRepositoryDocumentation(repositoryId, language);
			}
			else {
				docs = documentationService.getRepositoryDocumentation(repositoryId);
			}

			return ResponseEntity.ok(docs);
		}
		catch (Exception e) {
			logger.error("Error al obtener documentación: {}", e.getMessage());
			return ResponseEntity.status(401).body("Token inválido o expirado");
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