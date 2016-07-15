const fs = require('fs');

const mkpath = require('mkpath');

module.exports = createGitIgnoreFile;

function createGitIgnoreFile(options){

	var ignoreString = '/.idea/\n\n/node_modules/\n/npm-debug.log';

	return dotEnv()
		.then(publicDir)
		.then(createFile);

	function dotEnv(){
		return new Promise((resolve, reject) => {

			if (!options.env) return resolve();

			ignoreString += '\n\n/.env';

			fs.writeFile(`.env`, '', err => {
				if (err) return reject(err);
				resolve();
			});

		});
	}

	function publicDir(){
		return new Promise((resolve, reject) => {

			if (!options.public) return resolve();

			mkpath('public', err => {
				if (err) return reject(err);

				fs.writeFile(`public/.gitignore`, '/*\n!/.gitignore', err => {
					if (err) return reject(err);
					resolve();
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

}