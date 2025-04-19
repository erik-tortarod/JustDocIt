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

	private String userId; // Add this field to associate documentation with a user

	// Add missing setter methods
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setRepositoryId(String repositoryId) {
		this.repositoryId = repositoryId;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public void setContent(DocumentationContent content) {
		this.content = content;
	}

	@Data
	public static class DocumentationContent {

		private List<CodeClass> classes;

		private List<CodeFunction> functions;

		private List<CodeInterface> interfaces;

		private List<CodeVariable> variables;

		// Add missing setter methods for nested classes
		public void setClasses(List<CodeClass> classes) {
			this.classes = classes;
		}

		public void setFunctions(List<CodeFunction> functions) {
			this.functions = functions;
		}

		public void setInterfaces(List<CodeInterface> interfaces) {
			this.interfaces = interfaces;
		}

		public void setVariables(List<CodeVariable> variables) {
			this.variables = variables;
		}

	}

	@Data
	public static class CodeClass {

		private String name;

		private String description;

		private List<CodeProperty> properties;

		private List<CodeMethod> methods;

		// Add missing setter methods
		public void setName(String name) {
			this.name = name;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public void setProperties(List<CodeProperty> properties) {
			this.properties = properties;
		}

		public void setMethods(List<CodeMethod> methods) {
			this.methods = methods;
		}

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

		// Add missing setter methods
		public void setName(String name) {
			this.name = name;
		}

		public void setSignature(String signature) {
			this.signature = signature;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public void setParameters(List<CodeParameter> parameters) {
			this.parameters = parameters;
		}

		public void setReturnType(String returnType) {
			this.returnType = returnType;
		}

		public void setReturnDescription(String returnDescription) {
			this.returnDescription = returnDescription;
		}

		public void setExamples(List<String> examples) {
			this.examples = examples;
		}

	}

	@Data
	public static class CodeParameter {

		private String name;

		private String type;

		private String description;

		// Add missing setter methods
		public void setName(String name) {
			this.name = name;
		}

		public void setType(String type) {
			this.type = type;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		// Add missing getter methods
		public String getDescription() {
			return description;
		}

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

		// Add missing setter methods
		public void setName(String name) {
			this.name = name;
		}

		public void setSignature(String signature) {
			this.signature = signature;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public void setParameters(List<CodeParameter> parameters) {
			this.parameters = parameters;
		}

		public void setReturnType(String returnType) {
			this.returnType = returnType;
		}

		public void setReturnDescription(String returnDescription) {
			this.returnDescription = returnDescription;
		}

		public void setExamples(List<String> examples) {
			this.examples = examples;
		}

	}

	@Data
	public static class CodeInterface {

		private String name;

		private String description;

		private List<CodeProperty> properties;

		private List<CodeMethod> methods;

		// Add missing setter methods
		public void setName(String name) {
			this.name = name;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public void setProperties(List<CodeProperty> properties) {
			this.properties = properties;
		}

		public void setMethods(List<CodeMethod> methods) {
			this.methods = methods;
		}

	}

	@Data
	public static class CodeVariable {

		private String name;

		private String type;

		private String description;

		// Add missing setter methods
		public void setName(String name) {
			this.name = name;
		}

		public void setType(String type) {
			this.type = type;
		}

		public void setDescription(String description) {
			this.description = description;
		}

	}

}
