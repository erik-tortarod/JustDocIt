package api.auth.controller;

import api.auth.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
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
			Claims jwtClaims = (Claims) claims;

			Date expirationDate = jwtClaims.getExpiration();
			Date now = new Date();
			long remainingTime = expirationDate.getTime() - now.getTime();

			Map<String, Object> response = new HashMap<>();
			response.put("isExpired", remainingTime <= 0);
			response.put("expirationDate", expirationDate);
			response.put("remainingTimeInSeconds", remainingTime / 1000);
			response.put("remainingTimeInMinutes", remainingTime / (1000 * 60));
			response.put("userId", claims.get("id"));

			return ResponseEntity.ok(response);
		}
		catch (ExpiredJwtException e) {
			Map<String, Object> response = new HashMap<>();
			response.put("isExpired", true);
			response.put("message", "Token has expired");
			response.put("expirationDate", e.getClaims().getExpiration());
			return ResponseEntity.ok(response);
		}
		catch (Exception e) {
			return ResponseEntity.status(401).body("Invalid token");
		}
	}

	@PostMapping("/validate")
	public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		try {
			Map<String, Object> claims = JwtUtil.validateToken(token, jwtUtil.getSecretKey1());
			Claims jwtClaims = (Claims) claims;

			Date expirationDate = jwtClaims.getExpiration();
			Date now = new Date();
			long remainingTime = expirationDate.getTime() - now.getTime();

			Map<String, Object> response = new HashMap<>();
			response.put("isValid", true);
			response.put("isExpired", remainingTime <= 0);
			response.put("expirationDate", expirationDate);
			response.put("remainingTimeInSeconds", remainingTime / 1000);
			response.put("remainingTimeInMinutes", remainingTime / (1000 * 60));

			return ResponseEntity.ok(response);
		}
		catch (ExpiredJwtException e) {
			Map<String, Object> response = new HashMap<>();
			response.put("isValid", false);
			response.put("isExpired", true);
			response.put("message", "Token has expired");
			response.put("expirationDate", e.getClaims().getExpiration());
			return ResponseEntity.ok(response);
		}
		catch (Exception e) {
			Map<String, Object> response = new HashMap<>();
			response.put("isValid", false);
			response.put("isExpired", false);
			response.put("message", "Invalid token");
			return ResponseEntity.ok(response);
		}
	}

}
