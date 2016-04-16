'use strict';

var generators = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = generators.Base.extend({
	_createProjectFileSystem: function() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			appDir = destRoot + '/httpdocs',
			templateContext = {
				appname: this.appname,
				appdescription: this.appdescription,
				appauthor: this.appauthor,
				youremail: this.youremail,
				appversion: this.appversion,
				synced_folder: this.synced_folder,
				db_name: this.db_name,
				db_user: this.db_user,
				db_password: this.db_password,
			};

		// Template context aware files
		this.fs.copyTpl(sourceRoot + '/_README.md', destRoot + '/README.md', templateContext);
	},
	_getPrompt: function() {
		var prompts = [
				{
					name: 'name',
					message: 'What is the name of the project?',
					default: this.appname
				},
				{
					name: 'description',
					message: 'What is the project description?',
				},
				{
					name: 'yourname',
					message: 'What is your name?',
				},
				{
					name: 'youremail',
					message: 'What is your e-mail address?',
				},
				{
					name: 'version',
					message: 'What is the version of your app?',
					default: '0.1.0'
				},
				{
					name: 'synced_folder',
					message: 'What is the directory name of the Vagrant synced folder going to be?',
					default: this.appname
				},
				{
					name: 'db_name',
					message: 'What is the MySQL database name of your app going to be?',
					default: this.appname,
				},
				{
					name: 'db_user',
					message: 'What is the MySQL database username of your project going to be?',
					default: this.appname,
				},
				{
					name: 'db_password',
					message: 'What is the MySQL database password of your project going to be?',
					default: '1234',
				}
			];

			return prompts;
	},
	_saveAnswers: function(answers, callback) {
		this.appname = answers.name;
		this.appdescription = answers.description;
		this.appauthor = answers.yourname,
		this.youremail = answers.youremail,
		this.appversion = answers.version,
		this.synced_folder = answers.synced_folder,
		this.db_name = answers.db_name,
		this.db_user = answers.db_user,
		this.db_password = answers.db_password,
		callback();
	},
	initializing: function() {
		var message = chalk.yellow.bold('Welcome to Dutwebworks Vagrant ') + chalk.yellow('A starter kit for a web site with Vagrant');
		this.log(yosay(message, { maxLength: 17 }));
	},
	promting: function() {
		var done = this.async();

		this.prompt(this._getPrompt(), function(answers){			
			this._saveAnswers(answers, done);
		}.bind(this));
	},
	configuring: function() {
		this.config.save();
	},
	writing: function() {
		this._createProjectFileSystem();
	},
	install: function() {
		// vagrant up
	},
});