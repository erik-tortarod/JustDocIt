import { DocContent } from "../types";

export const javaDocs: DocContent = {
	emoji: "☕",
	title: "Java Documentation",
	description: "Learn how to document your Java code effectively",
	sections: [
		{
			title: "Class Documentation",
			content: `/**
 * Represents a user in the system.
 * This class handles user-related operations and data.
 *
 * @author John Doe
 * @version 1.0
 * @since 1.0.0
 */
public class User {
    /**
     * The unique identifier for the user.
     * This field is automatically generated.
     */
    private final Long id;

    /**
     * The user's username.
     * Must be between 3 and 50 characters.
     */
    private String username;

    /**
     * The user's email address.
     * Must be a valid email format.
     */
    private String email;

    /**
     * Creates a new user with the specified username and email.
     *
     * @param username The username for the new user
     * @param email The email address for the new user
     * @throws IllegalArgumentException if username or email is invalid
     */
    public User(String username, String email) {
        this.id = generateId();
        this.username = username;
        this.email = email;
    }

    /**
     * Updates the user's email address.
     *
     * @param newEmail The new email address
     * @return true if the email was updated successfully
     * @throws IllegalArgumentException if the email is invalid
     */
    public boolean updateEmail(String newEmail) {
        // Method implementation
    }

    /**
     * Generates a unique ID for a new user.
     * This method is thread-safe.
     *
     * @return A unique identifier
     */
    private Long generateId() {
        // Method implementation
    }
}`,
			explanation:
				"Java classes should be documented using Javadoc comments. Include author and version information, field descriptions, and detailed method documentation with parameters, return values, and exceptions. Use standard Javadoc tags and provide examples when helpful.",
		},
		{
			title: "Interface Documentation",
			content: `/**
 * Defines the contract for user-related operations.
 * This interface provides methods for managing users in the system.
 *
 * @author Jane Smith
 * @version 1.0
 * @since 1.0.0
 */
public interface UserService {
    /**
     * Retrieves a user by their ID.
     *
     * @param id The user's ID
     * @return The user if found
     * @throws UserNotFoundException if the user doesn't exist
     * @throws DatabaseException if there's an error accessing the database
     */
    User getUserById(Long id) throws UserNotFoundException, DatabaseException;

    /**
     * Creates a new user in the system.
     *
     * @param user The user to create
     * @return The created user with generated ID
     * @throws IllegalArgumentException if the user data is invalid
     * @throws DuplicateUserException if a user with the same email exists
     */
    User createUser(User user) throws IllegalArgumentException, DuplicateUserException;

    /**
     * Updates an existing user's information.
     *
     * @param id The ID of the user to update
     * @param user The updated user information
     * @return The updated user
     * @throws UserNotFoundException if the user doesn't exist
     * @throws IllegalArgumentException if the update data is invalid
     */
    User updateUser(Long id, User user) throws UserNotFoundException, IllegalArgumentException;
}`,
			explanation:
				"Java interfaces should be documented with a clear description of their purpose and contract. Document each method with its parameters, return values, and exceptions. Include author and version information for better code management. Use standard Javadoc tags and provide examples when helpful.",
		},
		{
			title: "Package Documentation",
			content: `/**
 * Provides user management functionality for the application.
 * This package contains classes and interfaces for handling user-related
 * operations such as creation, retrieval, and updates.
 *
 * @author Development Team
 * @version 1.0
 * @since 1.0.0
 */
package com.example.user;

/**
 * Main user management class.
 * This class implements the core user management functionality.
 */
public class UserManager {
    // Class implementation
}

/**
 * User data transfer object.
 * This class represents the data structure for user information.
 */
public class UserDTO {
    // Class implementation
}`,
			explanation:
				"Java packages should be documented with a package-info.java file. Include a description of the package's purpose, author information, and version. Document the relationships between classes in the package and provide examples of common usage patterns.",
		},
		{
			title: "Enum Documentation",
			content: `/**
 * Represents the possible states of a user account.
 * This enum is used to track the current state of user accounts
 * in the system.
 *
 * @author John Doe
 * @version 1.0
 * @since 1.0.0
 */
public enum UserStatus {
    /**
     * The user account is active and can be used.
     */
    ACTIVE,

    /**
     * The user account is inactive and cannot be used.
     * This state is typically used for suspended accounts.
     */
    INACTIVE,

    /**
     * The user account is pending activation.
     * This state is used for newly registered accounts.
     */
    PENDING,

    /**
     * The user account has been deleted.
     * This state is used for soft-deleted accounts.
     */
    DELETED;

    /**
     * Checks if the status allows the user to log in.
     *
     * @return true if the status allows login
     */
    public boolean canLogin() {
        return this == ACTIVE;
    }

    /**
     * Gets the display name for the status.
     *
     * @return A human-readable name for the status
     */
    public String getDisplayName() {
        return name().charAt(0) + name().substring(1).toLowerCase();
    }
}`,
			explanation:
				"Java enums should be documented with a clear description of their purpose and each constant. Include methods and their documentation. Use standard Javadoc tags and provide examples of common usage patterns. Document any special behavior or constraints.",
		},
	],
};
