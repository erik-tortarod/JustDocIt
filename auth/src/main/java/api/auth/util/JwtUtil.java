package api.auth.util;

import javax.crypto.SecretKey;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;

import java.util.Date;
import java.util.Map;

public class JwtUtil {

    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String generateToken(String id, String accessToken){

        final int expirationTime = 1000 * 60 * 60; //1 hour

        return Jwts.builder()
                .setClaims(Map.of(
                        "id",id,
                        "accessToken",accessToken
                ))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SECRET_KEY)
                .compact()
                ;
    }

    public static Map<String, Object> validateToken (String token){
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                ;
    }

}
