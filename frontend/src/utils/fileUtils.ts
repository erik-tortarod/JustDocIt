/**
 * Utilities for handling files and paths in the documentation
 */

/**
 * Extracts the file name from a complete path
 * @param filePath Complete path of the file
 * @returns File name
 */
export const getFileName = (filePath: string): string => {
   return filePath.split("/").pop() || filePath;
};

/**
 * Extracts the file extension from a path
 * @param filePath Path of the file
 * @returns File extension in lower case
 */
export const getFileExtension = (filePath: string): string => {
   const fileName = getFileName(filePath);
   return fileName.split(".").pop()?.toLowerCase() || "";
};

/**
 * Gets an appropriate icon based on the file extension
 * @param filePath Path of the file
 * @returns Emoji that represents the file type
 */
export const getFileIcon = (filePath: string): string => {
   const ext = getFileExtension(filePath);
   switch (ext) {
      case "ts":
      case "tsx":
         return "📘"; // TypeScript
      case "js":
      case "jsx":
         return "📙"; // JavaScript
      case "json":
         return "📒"; // JSON
      case "md":
         return "📝"; // Markdown
      case "html":
         return "📰"; // HTML
      case "css":
         return "🎨"; // CSS
      default:
         return "📄"; // Generic
   }
};

/**
 * Gets the directory path of a file
 * @param filePath Complete path of the file
 * @returns Directory path
 */
export const getDirectory = (filePath: string): string => {
   const parts = filePath.split("/");
   parts.pop(); // Remove the last element (file name)
   return parts.join("/");
};

/**
 * Checks if a file has generated documentation
 * @param file Documentation object of the file
 * @returns true if the file has documentation
 */
export const fileHasDocumentation = (file: any): boolean => {
   return (
      (file.content?.classes && file.content.classes.length > 0) ||
      (file.content?.functions && file.content.functions.length > 0) ||
      (file.content?.interfaces && file.content.interfaces.length > 0) ||
      (file.content?.variables && file.content.variables.length > 0)
   );
};
