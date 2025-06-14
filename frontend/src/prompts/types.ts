export type PromptType = "terraform" | "code" | "any";

export interface PromptGenerator {
	generatePrompt: (fileContents: { name: string; content: string }[]) => string;
	systemPrompt: string;
}
