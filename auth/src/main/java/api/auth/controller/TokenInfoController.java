package api.auth.controller;

import api.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/token")
public class TokenInfoController {

	@Autowired
	private JwtUtil jwtUtil;

	@GetMapping("/info")
	public ResponseEntity<?> getTokenInfo(@RequestParam String token) {
		try {
			Map<String, Object> claims = JwtUtil.validateToken(token, jwtUtil.getSecretKey1());

			String id = (String) claims.get("id");
			String accessToken = (String) claims.get("accessToken");

			return ResponseEntity.ok().body("ID: " + id + ", Access Token: " + accessToken);

		}
		catch (Exception e) {
			return ResponseEntity.status(401).body("Invalid or expired token");
		}
	}

	@PostMapping("/validate")
	public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		try {
			JwtUtil.validateToken(token, jwtUtil.getSecretKey1());
			return ResponseEntity.ok().body("Token is valid");
		}
		catch (Exception e) {
			return ResponseEntity.status(401).body("Invalid or expired token");
		}
	}

}
