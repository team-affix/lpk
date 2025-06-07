#!/usr/bin/env node

import { Command } from 'commander';
import { greeting, spawnCommand, copyFilesWithExtension } from './utils.js';
import * as path from 'path';

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

// Define types for the extract command options
interface ExtractOptions {
  output?: string;
  extension?: string;
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

// Add a command to extract only .agda files from a directory
program
  .command('extract-agda')
  .description('Extract only .agda files from a directory')
  .argument('<sourceDir>', 'Source directory path')
  .option('-o, --output <directory>', 'Output directory (default: ./agda-files)')
  .option('-e, --extension <ext>', 'File extension to extract (default: .agda)')
  .action((sourceDir: string, options: ExtractOptions) => {
    try {
      // Resolve the source directory path
      const sourcePath = path.resolve(sourceDir);
      
      // Default output directory is ./agda-files if not specified
      const outputDir = options.output 
        ? path.resolve(options.output) 
        : path.resolve('./agda-files');
      
      // Default extension is .agda if not specified
      const extension = options.extension || '.agda';
      
      console.log(`Extracting ${extension} files from: ${sourcePath}`);
      console.log(`Output directory: ${outputDir}`);
      
      // Copy the files
      const copiedFiles = copyFilesWithExtension(sourcePath, outputDir, extension);
      
      console.log(`\nExtraction complete. Copied ${copiedFiles.length} files.`);
    } catch (error) {
      console.error('Error extracting files:', error);
      process.exit(1);
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