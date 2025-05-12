package api.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.filter.EqualsFilter;
import org.springframework.ldap.filter.Filter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class LdapAuthController {

	@Autowired
	private LdapTemplate ldapTemplate;

	@PostMapping("/verify")
	public ResponseEntity<?> verifyLdapCredentials(@RequestBody Map<String, String> credentials) {
		String username = credentials.get("username");
		String password = credentials.get("password");

		// Crear respuesta
		Map<String, Object> response = new HashMap<>();

		try {
			// Usar LdapTemplate para verificar credenciales
			Filter filter = new EqualsFilter("uid", username);
			boolean authenticated = ldapTemplate.authenticate("", filter.encode(), password);

			response.put("authenticated", authenticated);

			if (authenticated) {
				response.put("message", "Usuario autenticado correctamente");
			}
			else {
				response.put("message", "Credenciales inválidas");
			}

			return ResponseEntity.ok(response);
		}
		catch (Exception e) {
			response.put("authenticated", false);
			response.put("message", "Error al verificar credenciales");
			response.put("error", e.getMessage());

			return ResponseEntity.status(401).body(response);
		}
	}

}