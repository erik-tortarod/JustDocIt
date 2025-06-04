package api.auth.util;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

	private final SecretKey secretKey1;

	private final SecretKey secretKey2;

	public JwtUtil(@Value("${jwt.secret.key1}") String key1, @Value("${jwt.secret.key2}") String key2) {
		if (key1.length() < 32 || key2.length() < 32) {
			throw new IllegalArgumentException("JWT secret keys must be at least 32 characters long.");
		}
		this.secretKey1 = Keys.hmacShaKeyFor(key1.getBytes());
		this.secretKey2 = Keys.hmacShaKeyFor(key2.getBytes());
	}

	public String generateToken(String id, String accessToken) {
		final int expirationTime = 1000 * 60 * 60; // 1 hour

		return Jwts.builder()
			.setClaims(Map.of("id", id, "accessToken", accessToken, "role", "USER")) // Default
																						// role
																						// is
																						// USER
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + expirationTime))
			.signWith(secretKey1, SignatureAlgorithm.HS256)
			.compact();
	}

	public static Map<String, Object> validateToken(String token, SecretKey secretKey) {
		return Jwts.parserBuilder()
			.setSigningKey(secretKey) // Use the provided key for validation
			.build()
			.parseClaimsJws(token)
			.getBody();
	}

	public SecretKey getSecretKey1() {
		return secretKey1;
	}

	public SecretKey getSecretKey2() {
		return secretKey2;
	}

}
