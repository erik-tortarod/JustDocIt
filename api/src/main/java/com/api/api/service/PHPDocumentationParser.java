package com.api.api.service;

import com.api.api.controller.Language;
import com.api.api.model.CodeDocumentation;
import com.api.api.model.CodeDocumentation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Parser for PHP code that extracts documentation from PHPDoc comments.
 */
@Service
public class PHPDocumentationParser {

	private static final Logger logger = LoggerFactory.getLogger(PHPDocumentationParser.class);

	public boolean supports(Language language) {
		return language == Language.PHP;
	}

	public CodeDocumentation parseFile(String repositoryId, String filePath, String content, Language language) {
		logger.info("Starting to parse PHP file: {}", filePath);
		logger.debug("File content length: {}", content.length());
		logger.debug("First 100 characters of content: {}", content.substring(0, Math.min(content.length(), 100)));

		CodeDocumentation documentation = new CodeDocumentation();
		documentation.setRepositoryId(repositoryId);
		documentation.setFilePath(filePath);
		documentation.setLanguage(language);

		DocumentationContent docContent = new DocumentationContent();
		List<CodeClass> classes = new ArrayList<>();
		List<CodeFunction> functions = new ArrayList<>();
		List<CodeInterface> interfaces = new ArrayList<>();
		List<CodeVariable> variables = new ArrayList<>();

		try {
			// Step 1: Find classes with PHPDoc
			Pattern classPattern = Pattern.compile("/\\*\\*([\\s\\S]*?)\\*/\\s*class\\s+([A-Za-z0-9_]+)",
					Pattern.DOTALL);

			Matcher classMatcher = classPattern.matcher(content);
			while (classMatcher.find()) {
				String phpdoc = classMatcher.group(1).trim();
				String className = classMatcher.group(2);

				logger.info("Class found: {}", className);

				CodeClass codeClass = new CodeClass();
				codeClass.setName(className);
				codeClass.setDescription(cleanPHPDoc(phpdoc));
				codeClass.setProperties(new ArrayList<>());

				// Find the class block to extract its methods and properties
				Pattern classBlockPattern = Pattern
					.compile("class\\s+" + Pattern.quote(className) + "\\s*\\{([\\s\\S]*?)\\n\\}", Pattern.DOTALL);

				Matcher classBlockMatcher = classBlockPattern.matcher(content);
				if (classBlockMatcher.find()) {
					String classBlock = classBlockMatcher.group(1);
					codeClass.setMethods(extractMethods(classBlock));
					codeClass.setProperties(extractProperties(classBlock));
				}
				else {
					codeClass.setMethods(new ArrayList<>());
					codeClass.setProperties(new ArrayList<>());
				}

				classes.add(codeClass);
			}

			logger.info("Elements found: {} classes, {} functions, {} interfaces, {} variables", classes.size(),
					functions.size(), interfaces.size(), variables.size());

		}
		catch (Exception e) {
			logger.error("Error parsing file: {}", e.getMessage(), e);
			// Continue with empty lists
		}

		docContent.setClasses(classes);
		docContent.setFunctions(functions);
		docContent.setInterfaces(interfaces);
		docContent.setVariables(variables);

		documentation.setContent(docContent);
		return documentation;
	}

	private List<CodeMethod> extractMethods(String classBlock) {
		List<CodeMethod> methods = new ArrayList<>();
		Pattern methodPattern = Pattern.compile(
				"/\\*\\*([\\s\\S]*?)\\*/\\s*(?:public|private|protected)\\s+(?:static\\s+)?function\\s+([A-Za-z0-9_]+)\\s*\\(([^)]*)\\)\\s*(?::\\s*([^{]+))?",
				Pattern.DOTALL);

		Matcher methodMatcher = methodPattern.matcher(classBlock);
		while (methodMatcher.find()) {
			String phpdoc = methodMatcher.group(1).trim();
			String methodName = methodMatcher.group(2);
			String params = methodMatcher.group(3);
			String returnType = methodMatcher.group(4);

			logger.debug("Method found: {}", methodName);

			CodeMethod method = new CodeMethod();
			method.setName(methodName);
			method.setDescription(cleanPHPDoc(phpdoc));
			method.setParameters(extractParameters(phpdoc, params));
			method.setReturnType(returnType != null ? returnType.trim() : "void");
			method.setReturnDescription(extractReturnDescription(phpdoc));
			method.setExamples(new ArrayList<>());

			methods.add(method);
		}

		return methods;
	}

	private List<CodeProperty> extractProperties(String classBlock) {
		List<CodeProperty> properties = new ArrayList<>();
		Pattern propertyPattern = Pattern.compile(
				"/\\*\\*([\\s\\S]*?)\\*/\\s*(?:public|private|protected)\\s+(?:static\\s+)?(?:\\?)?([a-zA-Z0-9_]+)\\s+\\$([A-Za-z0-9_]+)",
				Pattern.DOTALL);

		Matcher propertyMatcher = propertyPattern.matcher(classBlock);
		while (propertyMatcher.find()) {
			String phpdoc = propertyMatcher.group(1).trim();
			String type = propertyMatcher.group(2);
			String name = propertyMatcher.group(3);

			logger.debug("Property found: {}", name);

			CodeProperty property = new CodeProperty();
			property.setName(name);
			property.setType(type);
			property.setDescription(cleanPHPDoc(phpdoc));

			properties.add(property);
		}

		return properties;
	}

	private List<CodeParameter> extractParameters(String phpdoc, String params) {
		List<CodeParameter> parameters = new ArrayList<>();
		if (params == null || params.trim().isEmpty()) {
			return parameters;
		}

		String[] paramParts = params.split(",");
		for (String param : paramParts) {
			param = param.trim();
			if (param.isEmpty()) {
				continue;
			}

			// Extract type and name from parameter
			Pattern paramPattern = Pattern.compile("(?:\\?)?([a-zA-Z0-9_]+)\\s+\\$([A-Za-z0-9_]+)");
			Matcher paramMatcher = paramPattern.matcher(param);

			if (paramMatcher.find()) {
				String type = paramMatcher.group(1);
				String name = paramMatcher.group(2);

				CodeParameter parameter = new CodeParameter();
				parameter.setName(name);
				parameter.setType(type);

				// Extract parameter description from PHPDoc
				Pattern paramDescPattern = Pattern
					.compile("@param\\s+(?:\\?)?([a-zA-Z0-9_]+)\\s+\\$([a-zA-Z0-9_]+)\\s+([^@]*)", Pattern.DOTALL);
				Matcher paramDescMatcher = paramDescPattern.matcher(phpdoc);

				while (paramDescMatcher.find()) {
					if (paramDescMatcher.group(2).equals(name)) {
						parameter.setDescription(paramDescMatcher.group(3).trim());
						break;
					}
				}

				if (parameter.getDescription() == null) {
					parameter.setDescription("");
				}

				parameters.add(parameter);
			}
		}

		return parameters;
	}

	private String extractReturnDescription(String phpdoc) {
		if (phpdoc == null) {
			return null;
		}

		Pattern returnPattern = Pattern.compile("@return\\s+(?:\\?)?([a-zA-Z0-9_]+)\\s+([^@]*)", Pattern.DOTALL);
		Matcher returnMatcher = returnPattern.matcher(phpdoc);
		if (returnMatcher.find()) {
			return returnMatcher.group(2).trim();
		}
		return null;
	}

	private String cleanPHPDoc(String phpdoc) {
		if (phpdoc == null) {
			return "";
		}

		// Extract only the main description (before any @ tag)
		int tagIndex = phpdoc.indexOf("@");
		if (tagIndex != -1) {
			phpdoc = phpdoc.substring(0, tagIndex);
		}

		// Remove asterisks and formatting
		return phpdoc.replaceAll("^\\s*\\*", "") // Remove asterisk at start of line
			.replaceAll("\\n\\s*\\*", "\n") // Remove asterisks in middle lines
			.replaceAll("\\s+", " ") // Normalize spaces
			.trim();
	}

}
