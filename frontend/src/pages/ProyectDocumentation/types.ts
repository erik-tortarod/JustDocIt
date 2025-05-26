import { ReactNode } from "react";

export type Language = "typescript" | "javascript" | "java" | "python";

export interface Section {
	title: string;
	content: string | ReactNode;
	explanation: string;
}

export interface DocContent {
	emoji: string;
	title: string;
	description: string;
	sections: Section[];
}

export interface LanguageDocs {
	[key: string]: DocContent;
}

export const languageMap = {
	typescript: "typescript",
	javascript: "javascript",
	java: "java",
	python: "python",
} as const;
