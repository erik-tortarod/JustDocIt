import { describe, it, expect } from "vitest";
import {
	getFileName,
	getFileExtension,
	getFileIcon,
	getDirectory,
	fileHasDocumentation,
} from "../fileUtils";

describe("getFileName", () => {
	it("should extract filename from path", () => {
		expect(getFileName("path/to/file.ts")).toBe("file.ts");
		expect(getFileName("file.ts")).toBe("file.ts");
		expect(getFileName("path/to/file")).toBe("file");
	});

	it("should handle empty path", () => {
		expect(getFileName("")).toBe("");
	});
});
//
describe("getFileExtension", () => {
	it("should extract file extension", () => {
		expect(getFileExtension("file.ts")).toBe("ts");
		expect(getFileExtension("file.tsx")).toBe("tsx");
		expect(getFileExtension("file.js")).toBe("js");
		expect(getFileExtension("file.json")).toBe("json");
	});

	it("should handle empty path", () => {
		expect(getFileExtension("")).toBe("");
	});
});

describe("getFileIcon", () => {
	it("should return appropriate icon for known extensions", () => {
		expect(getFileIcon("file.ts")).toBe("📘");
		expect(getFileIcon("file.tsx")).toBe("📘");
		expect(getFileIcon("file.js")).toBe("📙");
		expect(getFileIcon("file.jsx")).toBe("📙");
		expect(getFileIcon("file.json")).toBe("📒");
		expect(getFileIcon("file.md")).toBe("📝");
		expect(getFileIcon("file.html")).toBe("📰");
		expect(getFileIcon("file.css")).toBe("🎨");
	});

	it("should return generic icon for unknown extensions", () => {
		expect(getFileIcon("file.xyz")).toBe("📄");
		expect(getFileIcon("file")).toBe("📄");
	});
});

describe("getDirectory", () => {
	it("should extract directory path", () => {
		expect(getDirectory("path/to/file.ts")).toBe("path/to");
		expect(getDirectory("file.ts")).toBe("");
	});

	it("should handle empty path", () => {
		expect(getDirectory("")).toBe("");
	});
});

describe("fileHasDocumentation", () => {
	it("should return true when file has documentation", () => {
		const fileWithClasses = { content: { classes: [{ name: "Test" }] } };
		const fileWithFunctions = { content: { functions: [{ name: "test" }] } };
		const fileWithInterfaces = { content: { interfaces: [{ name: "ITest" }] } };
		const fileWithVariables = { content: { variables: [{ name: "test" }] } };

		expect(fileHasDocumentation(fileWithClasses)).toBe(true);
		expect(fileHasDocumentation(fileWithFunctions)).toBe(true);
		expect(fileHasDocumentation(fileWithInterfaces)).toBe(true);
		expect(fileHasDocumentation(fileWithVariables)).toBe(true);
	});
});
