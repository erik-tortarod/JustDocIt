import { PromptType, PromptGenerator } from "./types";
import {
	generateTerraformPrompt,
	systemPrompt as terraformSystemPrompt,
} from "./terraform.prompt";
import {
	generateCodePrompt,
	systemPrompt as codeSystemPrompt,
} from "./code.prompt";
import {
	generateAnyPrompt,
	systemPrompt as anySystemPrompt,
} from "./any.prompt";

export const prompts: Record<PromptType, PromptGenerator> = {
	terraform: {
		generatePrompt: generateTerraformPrompt,
		systemPrompt: terraformSystemPrompt,
	},
	code: {
		generatePrompt: generateCodePrompt,
		systemPrompt: codeSystemPrompt,
	},
	any: {
		generatePrompt: generateAnyPrompt,
		systemPrompt: anySystemPrompt,
	},
};
