export const generateTerraformPrompt = (
	fileContents: { name: string; content: string }[],
) => {
	return `Please analyze these files and provide a detailed documentation. The files appear to be infrastructure and configuration files. Please include:

1. Overview:
   - What is the purpose of these files?
   - What type of infrastructure or system are they configuring?
   - What are the main components being defined?

2. Component Analysis:
   - For each file, explain:
     * What resources or components are being defined
     * What are their purposes and relationships
     * Any important configurations or settings
     * Dependencies between components

3. Security Considerations:
   - Identify any security-related configurations
   - Highlight potential security concerns
   - Suggest security best practices

4. Infrastructure Diagram:
   - Generate an ASCII diagram showing the relationships between components
   - Use characters like ->, <-, |, +, -, etc. to create the diagram
   - Example format:
     +----------------+     +----------------+
     |   Component A  | --> |   Component B  |
     +----------------+     +----------------+
            |
            v
     +----------------+
     |   Component C  |
     +----------------+
   - Include all major resources and their connections
   - Show data flow and dependencies

5. Best Practices:
   - Evaluate the current implementation against best practices
   - Suggest improvements where applicable
   - Highlight any potential issues or concerns

Files to analyze:
${fileContents
	.map((file) => `\nFile: ${file.name}\nContent:\n${file.content}\n`)
	.join("\n")}

Please provide a clear, structured response that would be helpful for both technical and non-technical team members.`;
};

export const systemPrompt = `You are an expert in infrastructure as code, cloud architecture, and technical documentation. 
Your task is to analyze infrastructure and configuration files to provide clear, comprehensive documentation.
Focus on explaining the purpose and relationships of components, security implications, and best practices.
When creating diagrams, use ASCII characters (->, <-, |, +, -, etc.) to create clear and well-structured diagrams.
Your documentation should be accessible to both technical and non-technical team members.`;
