import { PhpIcon } from "../assets/images/languages/PhpIcon";
import { JavascriptIcon } from "../assets/images/languages/JavascriptIcon";
import { TypescriptIcon } from "../assets/images/languages/TypescriptIcon";
import { PythonIcon } from "../assets/images/languages/PythonIcon";

type IconComponent = React.ComponentType;

const iconsMap: Record<string, IconComponent> = {
	TYPESCRIPT: TypescriptIcon,
	JAVASCRIPT: JavascriptIcon,
	PHP: PhpIcon,
	PYTHON: PythonIcon,
};

export function replaceLanguageByIcon(language: string): IconComponent | null {
	return iconsMap[language.toUpperCase()] || null;
}
