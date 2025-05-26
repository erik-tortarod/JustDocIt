import { describe, it, expect } from "vitest";
import { replaceLanguageByIcon } from "../replaceLanguageByIcon";
import { PhpIcon } from "../../assets/images/languages/PhpIcon";
import { JavascriptIcon } from "../../assets/images/languages/JavascriptIcon";
import { TypescriptIcon } from "../../assets/images/languages/TypescriptIcon";
import { PythonIcon } from "../../assets/images/languages/PythonIcon";

describe("replaceLanguageByIcon", () => {
	it("should return TypescriptIcon for typescript", () => {
		expect(replaceLanguageByIcon("typescript")).toBe(TypescriptIcon);
	});

	it("should return JavascriptIcon for javascript", () => {
		expect(replaceLanguageByIcon("javascript")).toBe(JavascriptIcon);
	});

	it("should return PhpIcon for php", () => {
		expect(replaceLanguageByIcon("php")).toBe(PhpIcon);
	});

	it("should return PythonIcon for python", () => {
		expect(replaceLanguageByIcon("python")).toBe(PythonIcon);
	});

	it("should return null for unsupported language", () => {
		expect(replaceLanguageByIcon("ruby")).toBeNull();
	});

	it("should be case insensitive", () => {
		expect(replaceLanguageByIcon("TYPESCRIPT")).toBe(TypescriptIcon);
		expect(replaceLanguageByIcon("TypeScript")).toBe(TypescriptIcon);
	});
});
