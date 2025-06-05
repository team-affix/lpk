#!/usr/bin/env node

import { Command } from 'commander';
import { greeting, spawnCommand } from './utils.js';

// Set version manually (can be updated during build)
const VERSION = '1.0.0';

// Define types for our commands
interface CloneOptions {
  directory?: string;
}

// Define types for the build command options
interface BuildOptions {
  file?: string[];
  verbose?: boolean;
}

// Create a new commander program
const program = new Command();

// Configure the program with version, description, etc.
program
  .name('lpk')
  .description('Logic Package Manager - A tool for managing logic packages')
  .version(VERSION);

// Add a clone command
program
  .command('clone')
  .description('Clone a repository')
  .argument('<url>', 'Repository URL to clone')
  .option('-d, --directory <directory>', 'Directory to clone into')
  .action(async (url: string, options: CloneOptions) => {
    console.log(`Cloning repository: ${url}`);
    
    try {
      const args: string[] = ['clone', url];
      if (options.directory) {
        args.push(options.directory);
      }
      
      await spawnCommand('git', args);
      console.log('Repository cloned successfully');
    } catch (error) {
      console.error('Failed to clone repository:', error);
      process.exit(1);
    }
  });

// Add a hello command
program
  .command('hello')
  .description('Say hello to someone')
  .argument('[name]', 'Name to greet', 'world')
  .action((name: string) => {
    console.log(greeting(name));
  });

// Add a command that accepts multiple file arguments
program
  .command('process')
  .description('Process multiple files')
  .argument('<files...>', 'Files to process (accepts multiple)')
  .action((files: string[]) => {
    console.log('Processing files:');
    files.forEach(file => console.log(`- ${file}`));
  });

// Add a command with multiple distinct arguments
program
  .command('copy')
  .description('Copy a file')
  .argument('<source>', 'Source file')
  .argument('<destination>', 'Destination file')
  .action((source: string, destination: string) => {
    console.log(`Copying from ${source} to ${destination}`);
  });

// Add a command that uses options for multiple values
program
  .command('build')
  .description('Build project files')
  .option('-f, --file <file>', 'Files to build (can be used multiple times)', collect, [])
  .option('-v, --verbose', 'Enable verbose output')
  .action((options: BuildOptions) => {
    console.log('Building files:');
    if (options.file && options.file.length > 0) {
      options.file.forEach(file => console.log(`- ${file}`));
    } else {
      console.log('No files specified, building all');
    }
    
    if (options.verbose) {
      console.log('Verbose mode enabled');
    }
  });

// Helper function to collect multiple option values
function collect(value: string, previous: string[]): string[] {
  return previous.concat([value]);
}

// Parse command line arguments
program.parse();

// If no command is provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}