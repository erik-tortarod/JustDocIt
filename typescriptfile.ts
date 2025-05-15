/**
 * Calculates the factorial of a given number.
 * 
 * The factorial of a non-negative integer `n` is the product of all positive integers less than or equal to `n`.
 * It is denoted as `n!`. For example, 5! = 5 * 4 * 3 * 2 * 1 = 120.
 * 
 * @param num - A non-negative integer whose factorial is to be calculated.
 * @returns The factorial of the given number. Returns 1 if the input is 0.
 * @throws An error if the input is a negative number.
 */
function factorial(num: number): number {
   if (num < 0) {
      throw new Error("Factorial is not defined for negative numbers.");
   }

   if (num === 0) {
      return 1;
   }

   let result = 1;
   for (let i = 1; i <= num; i++) {
      result *= i;
   }

   return result;
}

// Example usage:
console.log(factorial(5)); // Output: 120