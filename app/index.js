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
			};

		// Images
		mkdirp(appDir + '/img');

		// Javascript
		mkdirp(appDir + '/js');
		mkdirp(appDir + '/js/libs');

		// Sass
		mkdirp(appDir + '/sass');
		mkdirp(appDir + '/sass/base');
		mkdirp(appDir + '/sass/modules');
		mkdirp(appDir + '/sass/layout');
		mkdirp(appDir + '/sass/overrides');
		this.fs.copy(sourceRoot + '/httpdocs/sass/style.scss', appDir + '/sass/style.scss');

		// Grunt related files
		this.fs.copy(sourceRoot + '/_Grunt_Mac.command', destRoot + '/_Grunt_Mac.command');
		this.fs.copy(sourceRoot + '/_Grunt_serve_Mac.command', destRoot + '/_Grunt_serve_Mac.command');
		this.fs.copy(sourceRoot + '/_Grunt_watch_Mac.command', destRoot + '/_Grunt_watch_Mac.command');
		this.fs.copy(sourceRoot + '/_Grunt_serve_Windows.cmd', destRoot + '/_Grunt_serve_Windows.cmd');
		this.fs.copy(sourceRoot + '/_Grunt_watch_Windows.cmd', destRoot + '/_Grunt_watch_Windows.cmd');
		this.fs.copy(sourceRoot + '/_Grunt_Windows.cmd', destRoot + '/_Grunt_Windows.cmd');
		this.fs.copy(sourceRoot + '/Gruntfile.js', destRoot + '/Gruntfile.js');

		// License
		this.fs.copy(sourceRoot + '/LICENSE', destRoot + '/LICENSE');

		// Ignore files
		this.fs.copy(sourceRoot + '/_gitignore', destRoot + '/.gitignore');
		this.fs.copy(sourceRoot + '/_bowerrc', destRoot + '/.bowerrc');

		// Template context aware files
		this.fs.copyTpl(sourceRoot + '/package.json', destRoot + '/package.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/bower.json', destRoot + '/bower.json', templateContext);
		this.fs.copyTpl(sourceRoot + '/README.md', destRoot + '/README.md', templateContext);
		this.fs.copyTpl(sourceRoot + '/httpdocs/index.html', appDir + '/index.html', templateContext);
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
		callback();
	},
	initializing: function() {
		var message = chalk.yellow.bold('Welcome to Dutwebworks Grunt ') + chalk.yellow('A starter kit for a web site with Grunt');
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
		this.bowerInstall();
		this.npmInstall();
	},
});