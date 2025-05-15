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
 * Parser mejorado para TypeScript que captura elementos con JSDoc.
 */
@Service
public class TypeScriptDocumentationParser {

    private static final Logger logger = LoggerFactory.getLogger(TypeScriptDocumentationParser.class);

    public boolean supports(Language language) {
        return language == Language.TYPESCRIPT;
    }

    public CodeDocumentation parseFile(String repositoryId, String filePath, String content, Language language) {
        logger.info("Starting to parse TypeScript file: {}", filePath);
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
            // Paso 1: Buscar clases con comentarios JSDoc
            Pattern classPattern = Pattern.compile("/\\*\\*([\\s\\S]*?)\\*/\\s*(?:export\\s+)?class\\s+([A-Za-z0-9_]+)",
                    Pattern.DOTALL);

            Matcher classMatcher = classPattern.matcher(content);
            while (classMatcher.find()) {
                String jsdoc = classMatcher.group(1).trim();
                String className = classMatcher.group(2);

                logger.info("Clase encontrada: {}", className);

                CodeClass codeClass = new CodeClass();
                codeClass.setName(className);
                codeClass.setDescription(cleanJSDoc(jsdoc));
                codeClass.setProperties(new ArrayList<>());

                // Buscar el bloque de la clase para extraer sus métodos
                Pattern classBlockPattern = Pattern.compile("class\\s+" + Pattern.quote(className)
                        + "\\s*(?:implements\\s+[^{]+)?\\s*\\{([\\s\\S]*?)\\n\\}", Pattern.DOTALL);

                Matcher classBlockMatcher = classBlockPattern.matcher(content);
                if (classBlockMatcher.find()) {
                    String classBlock = classBlockMatcher.group(1);
                    codeClass.setMethods(extractMethods(classBlock));
                } else {
                    codeClass.setMethods(new ArrayList<>());
                }

                classes.add(codeClass);
            }

            // Paso 2: Buscar funciones globales con comentarios JSDoc
            Pattern functionPattern = Pattern.compile(
                    "/\\*\\*([\\s\\S]*?)\\*/\\s*(?:export\\s+)?(?:default\\s+)?(?:async\\s+)?function\\s+([A-Za-z0-9_]+)\\s*\\(([^)]*)\\)",
                    Pattern.DOTALL);

            Matcher functionMatcher = functionPattern.matcher(content);
            while (functionMatcher.find()) {
                String jsdoc = functionMatcher.group(1).trim();
                String functionName = functionMatcher.group(2);
                String params = functionMatcher.group(3);

                logger.info("Función global encontrada: {}", functionName);

                CodeFunction function = new CodeFunction();
                function.setName(functionName);
                function.setDescription(cleanJSDoc(jsdoc));
                function.setSignature("function " + functionName + "(" + params + ")");
                function.setParameters(extractParameters(jsdoc, params));

                // Extraer tipo de retorno
                String returnType = "void";
                String returnDescription = "";

                Pattern returnTypePattern = Pattern.compile("@returns?(?:\\s+\\{([^}]+)\\})?\\s+([^@]*)",
                        Pattern.DOTALL);
                Matcher returnMatcher = returnTypePattern.matcher(jsdoc);
                if (returnMatcher.find()) {
                    if (returnMatcher.group(1) != null) {
                        returnType = returnMatcher.group(1).trim();
                    }
                    returnDescription = returnMatcher.group(2).trim();
                }

                function.setReturnType(returnType);
                function.setReturnDescription(returnDescription);
                function.setExamples(new ArrayList<>());

                functions.add(function);
            }

            // Paso 3: Buscar interfaces con comentarios JSDoc
            Pattern interfacePattern = Pattern
                    .compile("/\\*\\*([\\s\\S]*?)\\*/\\s*(?:export\\s+)?interface\\s+([A-Za-z0-9_]+)", Pattern.DOTALL);

            Matcher interfaceMatcher = interfacePattern.matcher(content);
            while (interfaceMatcher.find()) {
                String jsdoc = interfaceMatcher.group(1).trim();
                String interfaceName = interfaceMatcher.group(2);

                logger.info("Interfaz encontrada: {}", interfaceName);

                CodeInterface codeInterface = new CodeInterface();
                codeInterface.setName(interfaceName);
                codeInterface.setDescription(cleanJSDoc(jsdoc));
                codeInterface.setProperties(new ArrayList<>());
                codeInterface.setMethods(new ArrayList<>());

                interfaces.add(codeInterface);
            }

            logger.info("Elementos encontrados: {} clases, {} funciones, {} interfaces, {} variables", classes.size(),
                    functions.size(), interfaces.size(), variables.size());

        } catch (Exception e) {
            logger.error("Error al parsear archivo: {}", e.getMessage(), e);
            // Continuar con listas vacías
        }

        docContent.setClasses(classes);
        docContent.setFunctions(functions);
        docContent.setInterfaces(interfaces);
        docContent.setVariables(variables);

        documentation.setContent(docContent);
        return documentation;
    }

    /**
     * Extrae métodos de un bloque de clase
     */
    private List<CodeMethod> extractMethods(String classBlock) {
        List<CodeMethod> methods = new ArrayList<>();

        // Buscar métodos con comentarios JSDoc
        Pattern methodPattern = Pattern.compile(
                "/\\*\\*([\\s\\S]*?)\\*/\\s*(?:static\\s+)?(?:async\\s+)?([A-Za-z0-9_]+)\\s*\\(([^)]*)\\)",
                Pattern.DOTALL);

        Matcher methodMatcher = methodPattern.matcher(classBlock);
        while (methodMatcher.find()) {
            String jsdoc = methodMatcher.group(1).trim();
            String methodName = methodMatcher.group(2);
            String params = methodMatcher.group(3);

            logger.debug("Método encontrado: {}", methodName);

            CodeMethod method = new CodeMethod();
            method.setName(methodName);
            method.setDescription(cleanJSDoc(jsdoc));
            method.setSignature("public void exampleMethod()");
            method.setParameters(new ArrayList<>()); // Example empty list
            method.setReturnType("void");
            method.setReturnDescription("No return value.");
            method.setExamples(new ArrayList<>()); // Example empty list

            // Determinar si es estático buscando hacia atrás
            boolean isStatic = Pattern.compile("static\\s+" + Pattern.quote(methodName)).matcher(classBlock).find();
            method.setSignature((isStatic ? "static " : "") + methodName + "(" + params + ")");

            method.setParameters(extractParameters(jsdoc, params));

            // Extraer tipo de retorno
            String returnType = "void";
            String returnDescription = "";

            Pattern returnTypePattern = Pattern.compile("@returns?(?:\\s+\\{([^}]+)\\})?\\s+([^@]*)", Pattern.DOTALL);
            Matcher returnMatcher = returnTypePattern.matcher(jsdoc);
            if (returnMatcher.find()) {
                if (returnMatcher.group(1) != null) {
                    returnType = returnMatcher.group(1).trim();
                }
                returnDescription = returnMatcher.group(2).trim();
            }

            method.setReturnType(returnType);
            method.setReturnDescription(returnDescription);
            method.setExamples(new ArrayList<>());

            methods.add(method);
        }

        return methods;
    }

    /**
     * Extrae parámetros de un JSDoc y su firma
     */
    private List<CodeParameter> extractParameters(String jsdoc, String params) {
        List<CodeParameter> parameters = new ArrayList<>();

        // Extraer nombres y tipos de parámetros de la firma
        if (params != null && !params.trim().isEmpty()) {
            String[] paramParts = params.split(",");
            for (String param : paramParts) {
                param = param.trim();
                if (param.isEmpty()) {
                    continue;
                }

                // Extraer nombre y tipo
                Pattern paramPattern = Pattern.compile("([a-zA-Z0-9_]+)(?:\\s*:\\s*([^=]+))?");
                Matcher paramMatcher = paramPattern.matcher(param);

                if (paramMatcher.find()) {
                    String paramName = paramMatcher.group(1);
                    String paramType = paramMatcher.group(2) != null ? paramMatcher.group(2).trim() : "any";

                    CodeParameter parameter = new CodeParameter();
                    parameter.setName(paramName);
                    parameter.setType(paramType);

                    // Buscar descripción en JSDoc
                    Pattern paramDescPattern = Pattern
                            .compile("@param\\s+(?:\\{[^}]+\\}\\s+)?([a-zA-Z0-9_]+)\\s+-?\\s+([^@]*)", Pattern.DOTALL);
                    Matcher paramDescMatcher = paramDescPattern.matcher(jsdoc);

                    while (paramDescMatcher.find()) {
                        if (paramDescMatcher.group(1).equals(paramName)) {
                            parameter.setDescription("This is an example parameter description.");
                            break;
                        }
                    }

                    if (parameter.getDescription() == null) {
                        parameter.setDescription("");
                    }

                    parameters.add(parameter);
                }
            }
        }

        return parameters;
    }

    /**
     * Limpia un comentario JSDoc eliminando asteriscos y etiquetas
     */
    private String cleanJSDoc(String jsdoc) {
        if (jsdoc == null) {
            return "";
        }

        // Extraer solo la descripción principal (antes de cualquier etiqueta @)
        int tagIndex = jsdoc.indexOf("@");
        if (tagIndex != -1) {
            jsdoc = jsdoc.substring(0, tagIndex);
        }

        // Eliminar asteriscos y formateo
        return jsdoc.replaceAll("^\\s*\\*", "") // Eliminar asterisco al principio de
                // línea
                .replaceAll("\\n\\s*\\*", "\n") // Eliminar asteriscos en líneas intermedias
                .replaceAll("\\s+", " ") // Normalizar espacios
                .trim();
    }

}
