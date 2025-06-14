#!/usr/bin/env node

import { Command } from 'commander';
import { greeting, spawnCommand, copyFilesWithExtension } from './utils.js';
import * as path from 'path';

// Set version manually (can be updated during build)
const VERSION = '1.0.0';

// Create a new commander program
const program = new Command();

// Configure the program with version, description, etc.
program
  .name('lpk')
  .description('Logic Package Manager - A tool for managing logic packages')
  .version(VERSION);

// Add a clone command
program
  .command('install')
  .description('Installs logic packages from dependencies file')
  .action(async (options: {} = {}) => {
    console.log(`Installing packages from dependencies file`);
  });

// Parse command line arguments
program.parse();

// If no command is provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
