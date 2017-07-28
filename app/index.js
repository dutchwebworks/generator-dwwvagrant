'use strict';

var Generator = require('yeoman-generator'),
	mkdirp = require('mkdirp'),
	yosay = require('yosay'),
	chalk = require('chalk');

module.exports = class extends Generator {
	initializing() {
		var message = chalk.yellow.bold('Welcome to Dutchwebworks Vagrant ') + chalk.yellow('A starter kit for a Wordpress web site running in Vagrant');
		this.log(yosay(message, { maxLength: 16 }));
	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message	: 'What is the name of this project?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'description',
			message	: 'What is the project description?',
			default : this.appname
		}, {
			type    : 'input',
			name	: 'yourname',
			message	: 'What is your name?',
		}, {
			name 	: 'mysql_root_password',
			message	: 'What is the MySQL root password of the virtual machine going to be?',
			default	: '1234',
		}, {
			name 	: 'db_name',
			message	: 'What is the MySQL database name of your app going to be?',
			default	: this.appname,
		}, {
			name 	: 'db_user',
			message : 'What is the MySQL database username of your project going to be?',
			default	: this.appname,
		}, {
			name 	: 'db_password',
			message	: 'What is the MySQL database password of your project going to be?',
			default	: '1234'
		}]).then((answers) => {
			this.appname = answers.name;
			this.appauthor = answers.yourname,
			this.mysql_root_password = answers.mysql_root_password;
			this.db_name = answers.db_name;
			this.db_user = answers.db_user;
			this.db_password = answers.db_password;
		});
	}

	configuring() {
		this.config.save();
	}

	writing() {
		var destRoot = this.destinationRoot(),
			sourceRoot = this.sourceRoot(),
			appDir = destRoot + '/httpdocs',
			templateContext = {
				appname: this.appname,
				appauthor: this.appauthor,
				mysql_root_password: this.mysql_root_password,
				db_name: this.db_name,
				db_user: this.db_user,
				db_password: this.db_password,
			};	

		// ---------------------------
		// Directory scaffolding
		// ---------------------------

		mkdirp(appDir);	

		// ---------------------------
		// Copy over (template) files
		// ---------------------------

		this.fs.copyTpl(sourceRoot + '/_Vagrantfile', destRoot + '/Vagrantfile', templateContext);
		this.fs.copyTpl(sourceRoot + '/_bootstrap.sh', destRoot + '/bootstrap.sh', templateContext);
		this.fs.copyTpl(sourceRoot + '/_README.md', destRoot + '/README.md', templateContext);
	}

	install() {
		var message = chalk.yellow.bold('When Vagrant is done, view the site at http://' + this.appname + '.local.dutchwebworks.nl, read the README.md file!');
		this.log(yosay(message, { maxLength: 44 }));
	}

	end() {
		this.spawnCommand('vagrant', ['up']);
	}
};