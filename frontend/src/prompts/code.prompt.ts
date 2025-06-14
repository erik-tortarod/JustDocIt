export const generateCodePrompt = (
	fileContents: { name: string; content: string }[],
) => {
	return `Please analyze these code files and provide a detailed documentation. Please include:

1. Overview:
   - What is the purpose of this codebase?
   - What programming languages and frameworks are being used?
   - What are the main features and functionalities?

2. Code Analysis:
   - For each file, explain:
     * What classes, functions, or components are defined
     * What are their purposes and responsibilities
     * How do they interact with each other
     * Any important algorithms or patterns used

3. Architecture:
   - Describe the overall architecture
   - Explain the design patterns used
   - Highlight any architectural decisions and their rationale

4. Code Structure Diagram:
   - Generate an ASCII diagram showing the relationships between components
   - Use characters like ->, <-, |, +, -, etc. to create the diagram
   - Example format:
     +----------------+     +----------------+
     |   Class A      | --> |   Class B      |
     +----------------+     +----------------+
            |
            v
     +----------------+
     |   Interface C  |
     +----------------+
   - Include all major components and their relationships
   - Show inheritance, composition, and dependencies

5. Code Quality:
   - Evaluate code quality and maintainability
   - Identify potential improvements
   - Suggest refactoring opportunities
   - Highlight any code smells or anti-patterns

Files to analyze:
${fileContents
	.map((file) => `\nFile: ${file.name}\nContent:\n${file.content}\n`)
	.join("\n")}

Please provide a clear, structured response that would be helpful for both technical and non-technical team members.`;
};

export const systemPrompt = `You are an expert in software development, code architecture, and technical documentation.
Your task is to analyze code files to provide clear, comprehensive documentation.
Focus on explaining the purpose and relationships of components, architectural decisions, and code quality.
When creating diagrams, use ASCII characters (->, <-, |, +, -, etc.) to create clear and well-structured diagrams.
Your documentation should be accessible to both technical and non-technical team members.`;
