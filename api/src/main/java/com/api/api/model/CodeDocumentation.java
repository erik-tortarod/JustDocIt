package com.api.api.model;

import com.api.api.controller.Language;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

/**
 * Represents code documentation for a specific file in a repository. This class
 * stores structured documentation for code elements like classes, functions,
 * interfaces, etc. Documentation is stored in MongoDB in the
 * 'code_documentation' collection.
 */
@Data
@Document(collection = "code_documentation")
public class CodeDocumentation {

    /**
     * Unique identifier for the documentation.
     */
    @Id
    private String id;

    /**
     * ID of the repository this documentation belongs to.
     */
    private String repositoryId;

    /**
     * Path to the file in the repository.
     */
    private String filePath;

    /**
     * Programming language of the documented code.
     */
    private Language language;

    /**
     * Structured content of the documentation.
     */
    private DocumentationContent content;

    /**
     * ID of the user who owns this documentation.
     */
    private String userId;

    /**
     * Branch of the repository this documentation belongs to.
     */
    private String branch;

    // Getters and setters
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

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getBranch() {
        return branch;
    }

    /**
     * Represents the structured content of code documentation. Contains lists
     * of different code elements that have been documented.
     */
    @Data
    public static class DocumentationContent {

        /**
         * List of documented classes.
         */
        private List<CodeClass> classes;

        /**
         * List of documented functions.
         */
        private List<CodeFunction> functions;

        /**
         * List of documented interfaces.
         */
        private List<CodeInterface> interfaces;

        /**
         * List of documented variables.
         */
        private List<CodeVariable> variables;

        // Getters and setters
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

    /**
     * Represents a documented class in the code.
     */
    @Data
    public static class CodeClass {

        /**
         * Name of the class.
         */
        private String name;

        /**
         * Description of the class's purpose and functionality.
         */
        private String description;

        /**
         * List of documented properties in the class.
         */
        private List<CodeProperty> properties;

        /**
         * List of documented methods in the class.
         */
        private List<CodeMethod> methods;

        // Getters and setters
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

    /**
     * Represents a documented property in a class.
     */
    @Data
    public static class CodeProperty {

        /**
         * Name of the property.
         */
        private String name;

        /**
         * Data type of the property.
         */
        private String type;

        /**
         * Description of the property's purpose.
         */
        private String description;
    }

    /**
     * Represents a documented method in a class.
     */
    @Data
    public static class CodeMethod {

        /**
         * Name of the method.
         */
        private String name;

        /**
         * Method signature including parameters and return type.
         */
        private String signature;

        /**
         * Description of the method's functionality.
         */
        private String description;

        /**
         * List of documented parameters.
         */
        private List<CodeParameter> parameters;

        /**
         * Return type of the method.
         */
        private String returnType;

        /**
         * Description of the return value.
         */
        private String returnDescription;

        /**
         * List of usage examples.
         */
        private List<String> examples;

        // Getters and setters
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

    /**
     * Represents a documented parameter in a method or function.
     */
    @Data
    public static class CodeParameter {

        /**
         * Name of the parameter.
         */
        private String name;

        /**
         * Data type of the parameter.
         */
        private String type;

        /**
         * Description of the parameter's purpose.
         */
        private String description;

        // Getters and setters
        public void setName(String name) {
            this.name = name;
        }

        public void setType(String type) {
            this.type = type;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    /**
     * Represents a documented function in the code.
     */
    @Data
    public static class CodeFunction {

        /**
         * Name of the function.
         */
        private String name;

        /**
         * Function signature including parameters and return type.
         */
        private String signature;

        /**
         * Description of the function's functionality.
         */
        private String description;

        /**
         * List of documented parameters.
         */
        private List<CodeParameter> parameters;

        /**
         * Return type of the function.
         */
        private String returnType;

        /**
         * Description of the return value.
         */
        private String returnDescription;

        /**
         * List of usage examples.
         */
        private List<String> examples;

        // Getters and setters
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

    /**
     * Represents a documented interface in the code.
     */
    @Data
    public static class CodeInterface {

        /**
         * Name of the interface.
         */
        private String name;

        /**
         * Description of the interface's purpose.
         */
        private String description;

        /**
         * List of documented properties in the interface.
         */
        private List<CodeProperty> properties;

        /**
         * List of documented methods in the interface.
         */
        private List<CodeMethod> methods;

        // Getters and setters
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

    /**
     * Represents a documented variable in the code.
     */
    @Data
    public static class CodeVariable {

        /**
         * Name of the variable.
         */
        private String name;

        /**
         * Data type of the variable.
         */
        private String type;

        /**
         * Description of the variable's purpose.
         */
        private String description;

        // Getters and setters
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
