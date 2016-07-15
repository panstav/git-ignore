const fs = require('fs');

const expect = require('expect.js');
const execa = require('execa');
const del = require('del');

describe('GitIgnore', () => {

	describe('No arguments', () => {

		beforeEach(() => execa.shell('node ./cli.js'));
		afterEach(() => del('./.gitignore'));

		it('Should create the file', done => {

			fs.exists('./.gitignore', exists =>{
				expect(exists).to.be.equal(true);
				done();
			});

		});

		it('Should ignore the regulars', done => {

			const regulars = ['/.idea/', '/node_modules/', '/npm-debug.log'];

			fs.readFile('./.gitignore', 'utf8', (err, file) => {
				if (err) return handle(err);

				regulars.forEach(regular => {
					expect(file).to.contain(regular);
				});

				done();
			});

		});

	});

	describe('Public flag', () => {

		beforeEach(() => execa.shell('node ./cli.js -p'));
		afterEach(() => del(['./.gitignore', './public/']));

		it('Should create .gitignore in /public', done => {

			fs.exists('./public/.gitignore', exists => {
				expect(exists).to.be.equal(true);
				done();
			});

		});

		it('Should ignore everything in /public except itself', done => {

			fs.readFile('./public/.gitignore', 'utf8', (err, file) => {
				if (err) return handle(err);

				['/*', '!/.gitignore'].forEach(regular => {
					expect(file).to.contain(regular);
				});

				done();
			});

		});

	});

	describe('Env flag', () => {

		beforeEach(() => execa.shell('node ./cli.js -e'));
		afterEach(() => del(['./.gitignore', './.env']));

		it('Should create .env in main dir', done => {

			fs.exists('./.env', exists => {
				expect(exists).to.be.equal(true);
				done();
			});

		});

		it('Should be empty', done => {

			fs.readFile('./.env', 'utf8', (err, file) => {
				if (err) return handle(err);

				expect(file).to.equal('');
				done();
			});

		});

	});

});

function handle(err){
	console.error(err);
	console.error(err.stack);
}