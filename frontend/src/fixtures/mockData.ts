import { IRepository, ICodeDocumentation } from "../types/interfaces";
import { ELanguage } from "../types/enums";

export const mockRepositories: IRepository[] = [
	{
		id: 1,
		githubId: "123456",
		name: "Mock just-doc-it",
		private: false,
		htmlUrl: "https://github.com/user/just-doc-it",
		description: "A documentation generator for developers.",
		size: 1024,
		defaultBranch: "main",
		visibility: "public",
		documentedLanguages: ["TYPESCRIPT", "JAVASCRIPT"],
	},
	{
		id: 1,
		githubId: "654321",
		name: "Mock api-service",
		private: true,
		htmlUrl: "https://github.com/user/api-service",
		description: "Backend API service for JustDocIt.",
		size: 2048,
		defaultBranch: "develop",
		visibility: "private",
		documentedLanguages: ["JAVA"],
	},
];

export const mockCodeDocumentation: ICodeDocumentation[] = [
	{
		id: "doc1",
		repositoryId: "1",
		filePath: "src/components/Button.tsx",
		language: ELanguage.ENGLISH,
		content: {
			classes: [
				{
					name: "Button",
					description: "A reusable button component.",
					properties: [
						{
							name: "label",
							type: "string",
							description: "The text displayed on the button.",
						},
					],
					methods: [
						{
							name: "handleClick",
							signature: "handleClick(event: MouseEvent): void",
							description: "Handles the button click event.",
							parameters: [
								{
									name: "event",
									type: "MouseEvent",
									description: "The click event object.",
								},
							],
							returnType: "void",
							returnDescription: null,
							examples: ["<Button label='Click me' />"],
						},
					],
				},
			],
			functions: [],
			interfaces: [],
			variables: [],
		},
	},
];
