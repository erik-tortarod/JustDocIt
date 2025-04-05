package com.api.api.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.SecretKey;
import java.util.Map;

@Component
public class JwtUtil {

	private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

	private final SecretKey secretKey1;

	private final SecretKey secretKey2;

	public JwtUtil(@Value("${jwt.secret.key1}") String key1, // Fixed placeholder syntax
			@Value("${jwt.secret.key2}") String key2 // Fixed placeholder syntax
	) {
		if (key1.length() < 32 || key2.length() < 32) {
			throw new IllegalArgumentException("Jwt secret must be at least 32 characters long");
		}

		this.secretKey1 = Keys.hmacShaKeyFor(key1.getBytes());
		this.secretKey2 = Keys.hmacShaKeyFor(key2.getBytes());
	}

	public static Map<String, Object> validateToken(String token, SecretKey secretKey) {
		try {
			Map<String, Object> claims = Jwts.parserBuilder()
				.setSigningKey(secretKey)
				.build()
				.parseClaimsJws(token)
				.getBody();

			logger.info("Token successfully validated. Claims: {}", claims);
			return claims;
		}
		catch (Exception e) {
			logger.error("Error validating token: {}", e.getMessage());
			throw e;
		}
	}

	public SecretKey getSecretKey1() {
		return secretKey1;
	}

	public SecretKey getSecretKey2() {
		return secretKey2;
	}

}
