/**
 * Returns a greeting message
 * @param name - The name to greet
 * @returns A greeting string
 */
export function greeting(name: string): string {
  return `Hello, ${name}!`;
}

// Import Node.js child_process module for executing shell commands
import { exec, spawn } from 'child_process';
import { promisify } from 'util';

// Convert exec callback to promise-based function
const execPromise = promisify(exec);

/**
 * Executes a shell command and returns the output
 * @param command - The shell command to execute
 * @returns Promise with stdout and stderr
 */
export async function executeCommand(command: string): Promise<{stdout: string, stderr: string}> {
  try {
    const { stdout, stderr } = await execPromise(command);
    return { stdout, stderr };
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    return { stdout: '', stderr: error instanceof Error ? error.message : String(error) };
  }
}

/**
 * Executes a shell command using spawn for better handling of interactive commands
 * @param command - The command to run
 * @param args - Command arguments as an array
 * @returns Promise that resolves when the command completes
 */
export function spawnCommand(command: string, args: string[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    
    const process = spawn(command, args, {
      stdio: 'inherit', // This passes through stdin/stdout/stderr to the parent process
      shell: true
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log(`Command completed successfully`);
        resolve();
      } else {
        console.error(`Command failed with code ${code}`);
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    process.on('error', (err) => {
      console.error(`Failed to start command: ${err}`);
      reject(err);
    });
  });
}

// ESM allows for named exports like above
// or default exports like below:
export default {
  greeting,
  executeCommand,
  spawnCommand
}; 