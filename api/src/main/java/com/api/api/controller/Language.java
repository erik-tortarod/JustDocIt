package com.api.api.controller;

/**
 * Enum representing supported programming languages in the system. Each language has an
 * associated file extension used for file filtering and identification.
 */
public enum Language {

	/**
	 * Java programming language
	 */
	JAVA(".java"),
	/**
	 * Python programming language
	 */
	PYTHON(".py"),
	/**
	 * JavaScript programming language
	 */
	JAVASCRIPT(".js"),
	/**
	 * TypeScript programming language
	 */
	TYPESCRIPT(".ts"),
	/**
	 * HTML markup language
	 */
	HTML(".html"),
	/**
	 * CSS stylesheet language
	 */
	CSS(".css");

	private final String extension;

	/**
	 * Creates a new Language enum value with its associated file extension.
	 * @param extension The file extension associated with this language
	 */
	Language(String extension) {
		this.extension = extension;
	}

	/**
	 * Gets the file extension associated with this language.
	 * @return The file extension (e.g., ".java" for Java)
	 */
	public String getExtension() {
		return extension;
	}

}
