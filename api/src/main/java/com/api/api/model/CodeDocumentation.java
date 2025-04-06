package com.api.api.model;

import com.api.api.controller.Language;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "code_documentation")
public class CodeDocumentation {

	@Id
	private String id;

	private String repositoryId;

	private String filePath;

	private Language language;

	private DocumentationContent content;

	@Data
	public static class DocumentationContent {

		private List<CodeClass> classes;

		private List<CodeFunction> functions;

		private List<CodeInterface> interfaces;

		private List<CodeVariable> variables;

		// Campos específicos para otros lenguajes se pueden añadir según sea necesario
		// private List<...> modules; // Para lenguajes con módulos específicos
		// private List<...> annotations; // Para lenguajes con anotaciones

	}

	@Data
	public static class CodeClass {

		private String name;

		private String description;

		private List<CodeProperty> properties;

		private List<CodeMethod> methods;

	}

	@Data
	public static class CodeProperty {

		private String name;

		private String type;

		private String description;

	}

	@Data
	public static class CodeMethod {

		private String name;

		private String signature;

		private String description;

		private List<CodeParameter> parameters;

		private String returnType;

		private String returnDescription;

		private List<String> examples;

	}

	@Data
	public static class CodeParameter {

		private String name;

		private String type;

		private String description;

	}

	@Data
	public static class CodeFunction {

		private String name;

		private String signature;

		private String description;

		private List<CodeParameter> parameters;

		private String returnType;

		private String returnDescription;

		private List<String> examples;

	}

	@Data
	public static class CodeInterface {

		private String name;

		private String description;

		private List<CodeProperty> properties;

		private List<CodeMethod> methods;

	}

	@Data
	public static class CodeVariable {

		private String name;

		private String type;

		private String description;

	}

}