import { DocContent } from "../types";

export const javascriptDocs: DocContent = {
	emoji: "📗",
	title: "JavaScript",
	description: "Learn how to document your JavaScript code effectively",
	sections: [
		{
			title: "Function Documentation",
			content: `/**
 * @function calculateTotal
 * @description Calculates the total price including tax and discounts
 * @param {number} basePrice - The base price of the item
 * @param {number} [taxRate=0.2] - The tax rate to apply (default: 20%)
 * @param {number} [discount=0] - The discount amount to apply
 * @returns {number} The total price after tax and discounts
 * @throws {Error} If basePrice is negative
 * @example
 * const total = calculateTotal(100, 0.1, 10); // Returns 99
 */
function calculateTotal(basePrice, taxRate = 0.2, discount = 0) {
  if (basePrice < 0) {
    throw new Error('Base price cannot be negative');
  }
  const priceWithTax = basePrice * (1 + taxRate);
  return priceWithTax - discount;
}`,
			explanation:
				"JavaScript functions should be documented with JSDoc comments. Include a description, parameter types and descriptions, return value type and description, and examples when helpful. Document default parameter values and any exceptions that might be thrown.",
		},
		{
			title: "Object Documentation",
			content: `/**
 * @object config
 * @description Application configuration object
 */
const config = {
  /**
   * @property {string} apiUrl - The base URL for the API
   * @default 'https://api.example.com'
   */
  apiUrl: 'https://api.example.com',

  /**
   * @property {Object} auth - Authentication settings
   * @property {number} auth.timeout - Session timeout in minutes
   * @property {boolean} auth.requireMFA - Whether MFA is required
   */
  auth: {
    timeout: 30,
    requireMFA: true
  },

  /**
   * @property {string[]} supportedLanguages - List of supported languages
   * @readonly
   */
  supportedLanguages: ['en', 'es', 'fr']
};`,
			explanation:
				"Objects should be documented with a clear description of their purpose. Document each property with its type and description. Use @object to mark object documentation and @property for individual properties. Include default values and readonly properties when applicable.",
		},
		{
			title: "Module Documentation",
			content: `/**
 * @module utils/validation
 * @description Utility functions for data validation
 * @exports {function} validateEmail
 * @exports {function} validatePassword
 * @exports {Object} validationRules
 */

/**
 * @function validateEmail
 * @description Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const validateEmail = (email) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
};

/**
 * @function validatePassword
 * @description Validates a password against security rules
 * @param {string} password - The password to validate
 * @returns {boolean} Whether the password meets requirements
 */
export const validatePassword = (password) => {
  return password.length >= 8 && /[A-Z]/.test(password);
};

/**
 * @object validationRules
 * @description Default validation rules
 */
export const validationRules = {
  minPasswordLength: 8,
  requireUppercase: true,
  requireNumbers: true
};`,
			explanation:
				"Modules should be documented with a description of their purpose and what they export. Use @module to mark module documentation and @exports to document exported items. Group related functions and objects together and document their relationships.",
		},
		{
			title: "Class Documentation",
			content: `/**
 * @class Logger
 * @description Utility class for logging messages
 * @example
 * const logger = new Logger('App');
 * logger.info('Application started');
 */
class Logger {
  /**
   * @property {string} context - The logging context
   * @private
   */
  private context: string;

  /**
   * @constructor
   * @param {string} context - The logging context
   */
  constructor(context: string) {
    this.context = context;
  }

  /**
   * @method info
   * @description Logs an info message
   * @param {string} message - The message to log
   * @param {Object} [metadata] - Additional metadata
   */
  info(message: string, metadata: Record<string, unknown> = {}): void {
    console.log(\`[\${this.context}] INFO: \${message}\`, metadata);
  }

  /**
   * @method error
   * @description Logs an error message
   * @param {string} message - The error message
   * @param {Error} [error] - The error object
   */
  error(message: string, error: Error | null = null): void {
    console.error(\`[\${this.context}] ERROR: \${message}\`, error);
  }
}`,
			explanation:
				"JavaScript classes should be documented using JSDoc comments. Include a description of the class, its properties, and methods. Use @class to mark class documentation, @property for class properties, and @method for class methods. Document private fields and methods appropriately.",
		},
	],
};
