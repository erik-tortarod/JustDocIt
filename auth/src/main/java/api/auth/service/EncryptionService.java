package api.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;

@Service
public class EncryptionService {

	@Value("${encryption.secret:default_secret_key_change_in_production}")
	private String secretKey;

	private static final String ALGORITHM = "AES";

	/**
	 * Encrypts a string using AES encryption
	 * @param data the string to encrypt
	 * @return the encrypted string encoded in Base64
	 */
	public String encrypt(String data) {
		try {
			if (data == null) {
				return null;
			}

			Key key = generateKey();
			Cipher cipher = Cipher.getInstance(ALGORITHM);
			cipher.init(Cipher.ENCRYPT_MODE, key);
			byte[] encryptedBytes = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
			return Base64.getEncoder().encodeToString(encryptedBytes);
		}
		catch (Exception e) {
			throw new RuntimeException("Error encrypting data", e);
		}
	}

	/**
	 * Decrypts a Base64 encoded string using AES encryption
	 * @param encryptedData the Base64 encoded encrypted string
	 * @return the decrypted string
	 */
	public String decrypt(String encryptedData) {
		try {
			if (encryptedData == null) {
				return null;
			}

			Key key = generateKey();
			Cipher cipher = Cipher.getInstance(ALGORITHM);
			cipher.init(Cipher.DECRYPT_MODE, key);
			byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
			byte[] decryptedBytes = cipher.doFinal(decodedBytes);
			return new String(decryptedBytes, StandardCharsets.UTF_8);
		}
		catch (Exception e) {
			throw new RuntimeException("Error decrypting data", e);
		}
	}

	private Key generateKey() {
		// Ensure the key is exactly 16 bytes (128 bits) for AES
		byte[] keyBytes = new byte[16];
		byte[] secretKeyBytes = secretKey.getBytes(StandardCharsets.UTF_8);

		// Copy the secret key bytes, or pad with zeros if too short
		int length = Math.min(secretKeyBytes.length, keyBytes.length);
		System.arraycopy(secretKeyBytes, 0, keyBytes, 0, length);

		return new SecretKeySpec(keyBytes, ALGORITHM);
	}

}