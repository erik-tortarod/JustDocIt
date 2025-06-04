import { DocContent } from "../types";

export const typescriptDocs: DocContent = {
	emoji: "📘",
	title: "TypeScript",
	description: "Learn how to document your TypeScript code effectively",
	sections: [
		{
			title: "Class Documentation",
			content: `/**
 * @class UserService
 * @description Service class for handling user-related operations
 * @example
 * const userService = new UserService();
 * const user = await userService.getUserById(123);
 */
class UserService {
  /**
   * @property {string} apiUrl - The base URL for the API
   * @private
   */
  private apiUrl: string;

  /**
   * @property {Map<number, User>} cache - In-memory cache for users
   * @private
   */
  private cache: Map<number, User>;

  /**
   * @constructor
   * @param {string} baseUrl - The base URL for the API
   */
  constructor(baseUrl: string) {
    this.apiUrl = baseUrl;
    this.cache = new Map();
  }

  /**
   * @method getUserById
   * @description Retrieves a user by their ID
   * @param {number} id - The user's ID
   * @returns {Promise<User>} A promise that resolves to the user
   * @throws {UserNotFoundError} If the user is not found
   * @example
   * const user = await userService.getUserById(123);
   */
  async getUserById(id: number): Promise<User> {
    // Method implementation
  }
}`,
			explanation:
				"TypeScript classes should be documented using JSDoc comments. Include a description of the class, its properties, and methods. Use @property for class properties and @method for class methods. Always specify types for parameters and return values. Add examples when helpful and document any exceptions that might be thrown.",
		},
		{
			title: "Interface Documentation",
			content: `/**
 * @interface User
 * @description Represents a user in the system
 */
interface User {
  /**
   * @property {number} id - The unique identifier for the user
   * @readonly
   */
  readonly id: number;

  /**
   * @property {string} username - The user's username
   * @minLength 3
   * @maxLength 50
   */
  username: string;

  /**
   * @property {string} email - The user's email address
   * @format email
   */
  email: string;

  /**
   * @property {UserRole[]} roles - The user's roles
   * @default []
   */
  roles: UserRole[];

  /**
   * @property {Date} createdAt - When the user was created
   * @readonly
   */
  readonly createdAt: Date;
}`,
			explanation:
				"Interfaces in TypeScript define the structure of objects. Document them with a clear description of their purpose and document each property with its type and description. Use @interface to mark interface documentation. Include validation rules, default values, and readonly properties when applicable.",
		},
		{
			title: "Type Documentation",
			content: `/**
 * @typedef {Object} UserPreferences
 * @description User preferences and settings
 * @property {boolean} darkMode - Whether dark mode is enabled
 * @property {string} language - The user's preferred language
 * @property {NotificationSettings} notifications - Notification preferences
 */
type UserPreferences = {
  darkMode: boolean;
  language: string;
  notifications: NotificationSettings;
};

/**
 * @typedef {Object} NotificationSettings
 * @description Settings for user notifications
 * @property {boolean} email - Whether email notifications are enabled
 * @property {boolean} push - Whether push notifications are enabled
 * @property {string[]} mutedChannels - List of muted channel IDs
 */
type NotificationSettings = {
  email: boolean;
  push: boolean;
  mutedChannels: string[];
};`,
			explanation:
				"Custom types should be documented using @typedef. Include descriptions for each property and specify their types. This helps maintain type safety and provides clear documentation for other developers. Group related types together and document their relationships.",
		},
		{
			title: "Function Documentation",
			content: `/**
 * @function validateUser
 * @description Validates a user object against schema rules
 * @param {User} user - The user object to validate
 * @param {ValidationOptions} [options] - Optional validation options
 * @returns {ValidationResult} The validation result
 * @throws {ValidationError} If validation fails
 * @example
 * const result = validateUser(user, { strict: true });
 * if (result.isValid) {
 *   // Process valid user
 * }
 */
function validateUser(
  user: User,
  options?: ValidationOptions
): ValidationResult {
  // Function implementation
}`,
			explanation:
				"Functions should be documented with JSDoc comments. Include a description, parameter types and descriptions, return value type and description, and examples when helpful. Document any exceptions that might be thrown and provide usage examples.",
		},
	],
};
