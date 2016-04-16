# Dutchwebworks Vagrant setup for Wordpress <%= appname %> project

*By <%= appauthor %>, Dutchwebworks Waddinxveen, april 2016*

This documentation describes how to install and run a basic Wordpress web site inside a (Ubuntu) virtual-machine for local Wordpress development.

One must download Wordpress itself and place it into the already present (but empty) `<%= synced_folder %>` directory.

## Prerequisites

* Make sure [Virual-box](https://www.virtualbox.org) is installed
* And [Vagrant](https://www.vagrantup.com/downloads.html) is installed
* Download [Wordpress](https://wordpress.org) and insert the Wordpress files into the (Yeoman Generated) `httpdocs` directory.
* For Windows users: [PuTTY](http://www.putty.org) SSH client.

## Running the virtual-machine withing Vagrant

Open a **Terminal** (or Command-promt) window and `cd ` into this directory where the `Vagrantfile` is located. Then run:

	vagrant up
	
Virtual-box wil boot-up the Vagrant (Ubuntu) virtual-machine; will read the `Vagrantfile` configuration and **provision** the virtual-machine with the following basic web server software:

* Apache
* MySQL
* Git
* PHP
* PHP Composer

It will proceed with a setup of a default Apache **virtual-host** for this project. MySQL will be installed with a provided root password. The provisioning script will also create a new MySQL username, and corresponding database, for this project. 

See `bootstrap.sh` for further details.

## Host file setup

In order to reach the virtual-machine's Apache virtual-host in a browser (on the local machine) one must add the IP-number of the virtual-machine and the used host name to the local machine's `hosts` file.

### Getting the IP-number of the virtual-machine

Login using SSH into the running virtual-machine. On the local machine Vagrant has forwarded port 22 to the virtual-machine. Open a SSH connection to (Windows users can use PuTTY):

	127.0.0.1
	
Login using these credentials: username and password are:

	vagrant

Once inside the (Ubuntu) virtual-machine; get its IP-number by running:

	hostname -I
	
Or by running `ifconfig` and search for the IP-number at `eth0`.

### Add this info to the local machine `hosts` file

The local machine needs to reach this virtual-machine by its IP address and the provided Apache virtual-host name.

Open you local machine's `hosts` file. Make sure you open this file with (Windows) **administrator** or (Unix / Linux / MacOS X) **root** privileges.

#### Windows location: 

	%SystemRoot%\System32\drivers\etc\hosts

#### Unix / Linux / MacOS X location: 

	/etc/hosts
	
At the bottom of this file add:

	192.168.178.10 <%= appname %>.local.dutchwebworks.nl
	
Where the IP-number is the IP-number of the virtual-machine. And the name of the Apache virtual-host web site. 

Note: do NOT include the `http://` protocal nor the port number in this `hosts` file.

## Install Wordpress

When Vagrant is up and running (see: "Running the virtual-machine withing Vagrant" above) open a web browser on the local machine and go to the following address:

	http://<%= appname %>.local.dutchwebworks.nl:<%= apache_port %>

Where `<%= appname %> ` is the name of the web site. Check these details in the `bootstrap.sh` file, and the choosen port number for this project.

One now should see the famous Wordpress install page. Use the MySQL credentials listed in the `bootstrap.sh` file.

## More info

* [Getting started with Vagrant](https://www.vagrantup.com/docs/getting-started/)
* [Installing Wordpress](https://codex.wordpress.org/Installing_WordPress)