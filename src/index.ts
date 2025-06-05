// Example of ESM style TypeScript file
import { greeting } from './utils.js';

// Note: In ESM with NodeNext resolution, we must use the .js extension in imports
// even though we're writing .ts files. This is required by Node's ESM implementation.
// TypeScript will correctly resolve this to the .ts file during compilation.

console.log(greeting('world2'));

export function main(): void {
  console.log('LPK - Logic Package Manager');
}

// Execute main function if this module is run directly
if (import.meta.url === import.meta.resolve('./index.js')) {
  main();
}