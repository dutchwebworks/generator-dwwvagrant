#Dutchwebworks Yeoman generator for Vagrant Wordpress setup

*By Dennis Burger, april 2016*

A Yeoman generator for creating a basic Vagrant setup for use with a Ubuntu virtual-machine for local Wordpress development.

## Prerequsites

* [NodeJS](https://nodejs.org/en/)
* [Yeoman](http://yeoman.io), a scaffolding tool.

## One time installation

Make sure NodeJS is installed by going to the [NodeJS website](https://nodejs.org/en/), download and install it for your operating system. This will also make the `npm` command-line tool available.

Open a **command-line window** (Terminal or MS-DOS) and type the following to globally (`-g`) install the above required NPM components all in one go:

	npm install -g yo

## Linking this Yeoman generator

Once above is installed open a **command-line window** and `cd` into the directory of this `README.md` file. Make sure your **not** in the `app/` sub-directory. Then type the following:

	npm link

This will **sym-link** this Yeoman generator to your locally installed **global** NPM list. Now this Yeoman generator is available on your system.

To view your globally installed NPM list type:

	npm list -g --depth=0

## Using this generator in a new project

Create and `cd` to a new (empty) project directory where we'll use this generator as a starting point for a new project. Now type:

	yo dwwvagrant

### Yeoman questions

You will be greated by Yeoman and it will ask you some basic questions regarding this project. This **meta-data information** is used inside some of the Yeoman generated files, like: `Vagrantfile`, `bootstrap.sh` and your project's `README.md` file.

## Unlinking this Yeoman generator

To unlink this Yeoman generator, type:

	npm uninstall -g generator-dwwgrunt