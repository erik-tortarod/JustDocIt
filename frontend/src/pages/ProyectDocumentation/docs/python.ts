import { DocContent } from "../types";

export const pythonDocs: DocContent = {
	emoji: "🐍",
	title: "Python",
	description:
		"Learn how to document your Python code effectively using docstrings and type hints",
	sections: [
		{
			title: "Class Documentation",
			content: `class User:
    """
    A class representing a user in the system.
    
    This class handles user-related operations and data management.
    
    Attributes:
        name (str): The user's full name
        email (str): The user's email address
        age (int): The user's age in years
        is_active (bool): Whether the user account is active
    
    Example:
        user = User("John Doe", "john@example.com", 30)
        user.activate()
        print(user.is_active)  # True
    """
    
    def __init__(self, name: str, email: str, age: int) -> None:
        """
        Initialize a new User instance.
        
        Args:
            name: The user's full name
            email: The user's email address
            age: The user's age in years
            
        Raises:
            ValueError: If age is negative or email is invalid
        """
        self.name = name
        self.email = email
        self.age = age
        self.is_active = False`,
			explanation:
				"Python classes should be documented with a docstring that describes the class's purpose, attributes, and provides examples. Use type hints for method parameters and return values. Document exceptions that may be raised.",
		},
		{
			title: "Function Documentation",
			content: `def calculate_total(base_price: float, tax_rate: float = 0.2, discount: float = 0) -> float:
    """
    Calculates the total price including tax and discounts.
    
    Args:
        base_price: The base price of the item
        tax_rate: The tax rate to apply (default: 20%)
        discount: The discount amount to apply
        
    Returns:
        The total price after tax and discounts
        
    Raises:
        ValueError: If base_price is negative
        
    Example:
        total = calculate_total(100, 0.1, 10)  # Returns 99
    """
    if base_price < 0:
        raise ValueError('Base price cannot be negative')
    price_with_tax = base_price * (1 + tax_rate)
    return price_with_tax - discount`,
			explanation:
				"Python functions should be documented with a docstring that describes the function's purpose, parameters, return value, and any exceptions it may raise. Use type hints for parameters and return values. Include examples of usage when helpful.",
		},
		{
			title: "Module Documentation",
			content: `"""
User Management Module

This module provides functionality for managing users in the system.
It includes classes and functions for user creation, authentication,
and profile management.

Example:
    from user_management import User, create_user
    
    user = create_user("John Doe", "john@example.com")
    user.activate()
"""

from typing import Optional, List
from datetime import datetime

# Module-level variables
DEFAULT_ROLES: List[str] = ["user", "admin"]
MAX_LOGIN_ATTEMPTS: int = 3

def create_user(name: str, email: str, role: str = "user") -> "User":
    """
    Creates a new user in the system.
    
    Args:
        name: The user's full name
        email: The user's email address
        role: The user's role (default: "user")
        
    Returns:
        A new User instance
        
    Raises:
        ValueError: If role is invalid
    """
    if role not in DEFAULT_ROLES:
        raise ValueError(f"Invalid role. Must be one of {DEFAULT_ROLES}")
    return User(name, email, role)`,
			explanation:
				"Python modules should start with a module-level docstring that describes the module's purpose and provides usage examples. Document module-level variables and functions. Use type hints for better code clarity and IDE support.",
		},
		{
			title: "Type Hints and Annotations",
			content: `from typing import List, Dict, Optional, Union, TypeVar, Generic

T = TypeVar('T')

class DataContainer(Generic[T]):
    """
    A generic container for storing and managing data.
    
    Type Parameters:
        T: The type of data stored in the container
    """
    
    def __init__(self, data: List[T]) -> None:
        self.data: List[T] = data
        
    def get_first(self) -> Optional[T]:
        """Returns the first item in the container or None if empty."""
        return self.data[0] if self.data else None
        
    def filter(self, predicate: callable[[T], bool]) -> List[T]:
        """
        Filters the container based on a predicate function.
        
        Args:
            predicate: A function that takes an item and returns a boolean
            
        Returns:
            A new list containing only the items that satisfy the predicate
        """
        return [item for item in self.data if predicate(item)]

# Example usage
numbers: List[int] = [1, 2, 3, 4, 5]
container = DataContainer(numbers)
even_numbers = container.filter(lambda x: x % 2 == 0)  # [2, 4]`,
			explanation:
				"Python's type hints system allows you to specify types for variables, function parameters, and return values. Use the typing module for complex types like List, Dict, Optional, etc. Type hints help with code clarity and enable better IDE support and static type checking.",
		},
	],
};
