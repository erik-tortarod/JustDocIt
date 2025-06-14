export const generateAnyPrompt = (
	fileContents: { name: string; content: string }[],
) => {
	return `Please analyze these files and provide a detailed documentation. Please include:

1. Overview:
   - What is the purpose of these files?
   - What type of content do they contain?
   - What are the main elements or components?

2. Content Analysis:
   - For each file, explain:
     * What information or elements are present
     * What are their purposes and relationships
     * Any important details or configurations
     * How do they relate to each other

3. Structure and Organization:
   - Describe how the content is organized
   - Explain any patterns or conventions used
   - Highlight important structural elements

4. Relationship Diagram:
   - Generate an ASCII diagram showing the relationships between elements
   - Use characters like ->, <-, |, +, -, etc. to create the diagram
   - Example format:
     +----------------+     +----------------+
     |   Element A    | --> |   Element B    |
     +----------------+     +----------------+
            |
            v
     +----------------+
     |   Element C    |
     +----------------+
   - Include all major elements and their connections
   - Show relationships and dependencies

5. Recommendations:
   - Evaluate the current organization
   - Suggest potential improvements
   - Highlight any concerns or issues
   - Provide best practices for similar content

Files to analyze:
${fileContents
	.map((file) => `\nFile: ${file.name}\nContent:\n${file.content}\n`)
	.join("\n")}

Please provide a clear, structured response that would be helpful for both technical and non-technical team members.`;
};

export const systemPrompt = `You are an expert in documentation and content analysis.
Your task is to analyze files and provide clear, comprehensive documentation.
Focus on explaining the purpose and relationships of elements, organization, and best practices.
When creating diagrams, use ASCII characters (->, <-, |, +, -, etc.) to create clear and well-structured diagrams.
Your documentation should be accessible to both technical and non-technical team members.`;
