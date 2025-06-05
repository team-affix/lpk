// Example of ESM style TypeScript file
import { greeting, executeCommand, spawnCommand } from './utils.js';

// Note: In ESM with NodeNext resolution, we must use the .js extension in imports
// even though we're writing .ts files. This is required by Node's ESM implementation.
// TypeScript will correctly resolve this to the .ts file during compilation.

console.log(greeting('world2'));

export async function main(): Promise<void> {
  console.log('LPK - Logic Package Manager');
  
  // Example of running a git clone command using spawn
  try {
    // Break the command into the executable and arguments
    await spawnCommand('git', ['clone', 'https://github.com/team-affix/armory.git']);
    console.log('Git clone completed successfully');
  } catch (error) {
    console.error('Failed to execute git clone:', error);
  }
}

// Execute main function if this module is run directly
if (import.meta.url === import.meta.resolve('./index.js')) {
  main().catch(error => console.error('Error in main:', error));
}