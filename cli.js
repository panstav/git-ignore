#!/usr/bin/env node

const fs = require('fs');

const mkpath = require('mkpath');
const promptly = require('promptly');

var ignoreString = '/.idea/\n\n/node_modules/\n/npm-debug.log';

askAboutDotEnv()
	.then(askAboutPublic)
	.then(createFile)
	.catch(err => {
		console.error(err);
		console.error(err.stack);
	});

function askAboutDotEnv(){
  return new Promise((resolve, reject) => {

	  promptly.confirm('Ignore /.env?', (err, value) => {
		  if (err) return reject(err);

		  if (!value) return resolve();

		  ignoreString += '\n\n/.env';

		  fs.writeFile(`.env`, '', err => {
			  if (err) return reject(err);
			  resolve();
		  });
	  });

  });
}

function askAboutPublic(){
  return new Promise((resolve, reject) => {

	  promptly.confirm('Ignore /public?', (err, value) => {
		  if (err) return reject(err);

		  if (!value) return resolve();

		  const publicIgnore = '/*\n!/.gitignore';

		  mkpath('public', err => {
			  if (err) return reject(err);

			  fs.writeFile(`public/.gitignore`, publicIgnore, err => {
				  if (err) return reject(err);
				  resolve();
			  });
		  });
	  });

  });
}

function createFile(){
  return new Promise((resolve, reject) => {

	  fs.writeFile(`.gitignore`, ignoreString, err => {
		  if (err) return reject(err);
		  resolve();
	  });

  });
}