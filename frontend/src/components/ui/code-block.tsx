import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
	code: string;
	language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
	return (
		<SyntaxHighlighter
			language={language.toLowerCase()}
			style={vscDarkPlus}
			customStyle={{
				margin: 0,
				borderRadius: "0.5rem",
				padding: "1rem",
			}}
			showLineNumbers
			lineNumberStyle={{
				color: "#6e7681",
				marginRight: "1rem",
				userSelect: "none",
			}}
		>
			{code.trim()}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;
