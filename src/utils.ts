/**
 * Returns a greeting message
 * @param name - The name to greet
 * @returns A greeting string
 */
export function greeting(name: string): string {
  return `Hello, ${name}!`;
}

// ESM allows for named exports like above
// or default exports like below:
export default {
  greeting
}; 