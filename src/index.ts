#!/usr/bin/env node

import { Command } from 'commander';
import { greeting, spawnCommand } from './utils.js';

// Set version manually (can be updated during build)
const VERSION = '1.0.0';

// Define types for our commands
interface CloneOptions {
  directory?: string;
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

// Parse command line arguments
program.parse();

// If no command is provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}