#!/usr/bin/env node

const createGitIgnore = require('./lib/create-git-ignore');

const argv = require('yargs')
	.usage('Usage: $ git-ignore [options]')
	.option('env', {
		alias: 'e',
		describe: 'Create a .env file, and gitignore it',
		default: false
	})
	.option('public', {
		alias: 'p',
		describe: 'Create another .gitignore in /public to ignore all but the directory',
		default: false
	})
	.help('h')
	.alias('h', 'help')
	.wrap()
	.argv;

createGitIgnore(argv)
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});