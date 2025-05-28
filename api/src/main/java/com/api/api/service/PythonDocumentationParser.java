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
 * Parser for Python code that extracts documentation from docstrings and type hints.
 */
@Service
public class PythonDocumentationParser {

	private static final Logger logger = LoggerFactory.getLogger(PythonDocumentationParser.class);

	public boolean supports(Language language) {
		return language == Language.PYTHON;
	}

	public CodeDocumentation parseFile(String repositoryId, String filePath, String content, Language language) {
		logger.info("Starting to parse Python file: {}", filePath);
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
			// Step 1: Find classes with docstrings
			Pattern classPattern = Pattern.compile(
					"class\\s+([A-Za-z0-9_]+)(?:\\([^)]*\\))?\\s*:\\s*(?:\\n\\s*\"\"\"([\\s\\S]*?)\"\"\")?",
					Pattern.DOTALL);

			Matcher classMatcher = classPattern.matcher(content);
			while (classMatcher.find()) {
				String className = classMatcher.group(1);
				String docstring = classMatcher.group(2);

				logger.info("Class found: {}", className);

				CodeClass codeClass = new CodeClass();
				codeClass.setName(className);
				codeClass.setDescription(docstring != null ? cleanDocstring(docstring) : null);
				codeClass.setProperties(new ArrayList<>());

				// Find the class block to extract its methods
				Pattern classBlockPattern = Pattern.compile("class\\s+" + Pattern.quote(className)
						+ "\\s*(?:\\([^)]*\\))?\\s*:\\s*([\\s\\S]*?)(?=\\n\\S|$)", Pattern.DOTALL);

				Matcher classBlockMatcher = classBlockPattern.matcher(content);
				if (classBlockMatcher.find()) {
					String classBlock = classBlockMatcher.group(1);
					codeClass.setMethods(extractMethods(classBlock));
				}
				else {
					codeClass.setMethods(new ArrayList<>());
				}

				classes.add(codeClass);
			}

			// Step 2: Find global functions with docstrings
			Pattern functionPattern = Pattern.compile(
					"def\\s+([A-Za-z0-9_]+)\\s*\\(([^)]*)\\)\\s*(?:->\\s*([^:]+))?\\s*:\\s*(?:\\n\\s*\"\"\"([\\s\\S]*?)\"\"\")?",
					Pattern.DOTALL);

			Matcher functionMatcher = functionPattern.matcher(content);
			while (functionMatcher.find()) {
				String functionName = functionMatcher.group(1);
				String params = functionMatcher.group(2);
				String returnType = functionMatcher.group(3);
				String docstring = functionMatcher.group(4);

				logger.info("Function found: {}", functionName);

				CodeFunction codeFunction = new CodeFunction();
				codeFunction.setName(functionName);
				codeFunction.setDescription(docstring != null ? cleanDocstring(docstring) : null);
				codeFunction.setParameters(extractParameters(params, docstring));
				codeFunction.setReturnType(returnType != null ? returnType.trim() : "None");
				codeFunction.setReturnDescription(extractReturnDescription(docstring));
				codeFunction.setExamples(extractExamples(docstring));

				functions.add(codeFunction);
			}

			// Step 3: Find global variables with type hints
			Pattern variablePattern = Pattern.compile("([A-Za-z0-9_]+)\\s*:\\s*([^=]+)\\s*=\\s*[^\\n]+",
					Pattern.DOTALL);

			Matcher variableMatcher = variablePattern.matcher(content);
			while (variableMatcher.find()) {
				String varName = variableMatcher.group(1);
				String varType = variableMatcher.group(2);

				logger.info("Variable found: {}", varName);

				CodeVariable codeVariable = new CodeVariable();
				codeVariable.setName(varName);
				codeVariable.setType(varType.trim());
				codeVariable.setDescription(null); // Python doesn't have variable
				// docstrings

				variables.add(codeVariable);
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
				"def\\s+([A-Za-z0-9_]+)\\s*\\(([^)]*)\\)\\s*(?:->\\s*([^:]+))?\\s*:\\s*(?:\\n\\s*\"\"\"([\\s\\S]*?)\"\"\")?",
				Pattern.DOTALL);

		Matcher methodMatcher = methodPattern.matcher(classBlock);
		while (methodMatcher.find()) {
			String methodName = methodMatcher.group(1);
			String params = methodMatcher.group(2);
			String returnType = methodMatcher.group(3);
			String docstring = methodMatcher.group(4);

			CodeMethod codeMethod = new CodeMethod();
			codeMethod.setName(methodName);
			codeMethod.setDescription(docstring != null ? cleanDocstring(docstring) : null);
			codeMethod.setParameters(extractParameters(params, docstring));
			codeMethod.setReturnType(returnType != null ? returnType.trim() : "None");
			codeMethod.setReturnDescription(extractReturnDescription(docstring));
			codeMethod.setExamples(extractExamples(docstring));

			methods.add(codeMethod);
		}

		return methods;
	}

	private List<CodeParameter> extractParameters(String paramsString, String docstring) {
		List<CodeParameter> parameters = new ArrayList<>();
		if (paramsString == null || paramsString.trim().isEmpty()) {
			return parameters;
		}

		String[] params = paramsString.split(",");
		for (String param : params) {
			param = param.trim();
			if (param.isEmpty()) {
				continue;
			}

			// Handle type hints
			String[] parts = param.split(":");
			String name = parts[0].trim();
			String type = parts.length > 1 ? parts[1].trim() : "Any";

			CodeParameter parameter = new CodeParameter();
			parameter.setName(name);
			parameter.setType(type);

			// Extract parameter description from docstring
			if (docstring != null) {
				Pattern paramPattern = Pattern.compile("(?i):param\\s+" + Pattern.quote(name) + "\\s*:\\s*([^\\n]+)");
				Matcher paramMatcher = paramPattern.matcher(docstring);
				if (paramMatcher.find()) {
					parameter.setDescription(paramMatcher.group(1).trim());
				}
				else {
					parameter.setDescription("");
				}
			}
			else {
				parameter.setDescription("");
			}

			parameters.add(parameter);
		}

		return parameters;
	}

	private String extractReturnDescription(String docstring) {
		if (docstring == null) {
			return null;
		}

		Pattern returnPattern = Pattern.compile("(?i)Returns?:\\s*([^\\n]+)");
		Matcher returnMatcher = returnPattern.matcher(docstring);
		if (returnMatcher.find()) {
			return returnMatcher.group(1).trim();
		}
		return null;
	}

	private List<String> extractExamples(String docstring) {
		List<String> examples = new ArrayList<>();
		if (docstring == null) {
			return examples;
		}

		Pattern examplePattern = Pattern.compile("(?i)Example[s]?:\\s*\\n\\s*```python\\s*\\n([\\s\\S]*?)\\n\\s*```");
		Matcher exampleMatcher = examplePattern.matcher(docstring);
		while (exampleMatcher.find()) {
			examples.add(exampleMatcher.group(1).trim());
		}
		return examples;
	}

	private String cleanDocstring(String docstring) {
		if (docstring == null) {
			return null;
		}

		// Remove leading/trailing whitespace and quotes
		docstring = docstring.trim();
		docstring = docstring.replaceAll("^[\"']+|[\"']+$", "");

		// Remove common docstring formatting
		docstring = docstring.replaceAll("(?m)^\\s*[\\*\\-]\\s*", ""); // Remove bullet
		// points
		docstring = docstring.replaceAll("(?m)^\\s*\\|\\s*", ""); // Remove table
		// formatting
		docstring = docstring.replaceAll("(?m)^\\s*$", ""); // Remove empty lines

		return docstring.trim();
	}

}
