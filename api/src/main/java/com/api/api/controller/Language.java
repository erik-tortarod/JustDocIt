package com.api.api.controller;

public enum Language {

	JAVA(".java"), PYTHON(".py"), JAVASCRIPT(".js"), TYPESCRIPT(".ts"), HTML(".html"), CSS(".css");

	private final String extension;

	Language(String extension) {
		this.extension = extension;
	}

	public String getExtension() {
		return extension;
	}

}
