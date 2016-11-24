# Dutchwebworks Yeoman generator for Vagrant Wordpress setup

*By Dennis Burger, april 2016*

A Yeoman generator for creating a basic Vagrant setup for use with a Ubuntu virtual-machine for local Wordpress development.

## Prerequsites

* [NodeJS](https://nodejs.org/en/)
* [Yeoman](http://yeoman.io), a scaffolding tool.

## One time installation

Make sure NodeJS is installed by going to the [NodeJS website](https://nodejs.org/en/), download and install it for your operating system. This will also make the `npm` command-line tool available.

Open a **command-line window** (Terminal or MS-DOS) and type the following to globally (`-g`) install the above required NPM components all in one go:

	npm install -g yo

## Download this Yeoman generator

Before you can use this generator you need to download it. Run the command below to **globally** install this generator.

	npm install -g generator-dwwvagrant

### Check globally installed NPM packages

To view your globally installed NPM list type the following. The new Yeoman generator should be listed here.

	npm ls -g --depth=0

## Using this generator in a new project

Create and `cd` to a new (empty) project directory where we'll use this generator as a starting point for a new project. Now type:

	yo dwwvagrant

### Yeoman questions

You will be greated by Yeoman and it will ask you some basic questions regarding this project. This **meta-data information** is used inside some of the Yeoman generated files, like: `Vagrantfile`, `bootstrap.sh` and your project's `README.md` file.

## Unlinking this Yeoman generator

To unlink this Yeoman generator, type:

	npm uninstall -g generator-dwwgrunt