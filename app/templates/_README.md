# Dutchwebworks Vagrant setup for Wordpress <%= appname %> project

*By <%= appauthor %>, Dutchwebworks Waddinxveen, april 2016*

The following is a basic installation and setup for running the Wordpress site locally using the **free Virtualbox and Vagrant**.

Using this setup uses a Ubuntu Linux virtual-machine that (could) closely match the production environment. This in favor of running something that doesn't match a production environment like a Windows WAMP setup.

One must download Wordpress itself and place it into the already present (but empty) `<%= synced_folder %>` directory.

## Installation

This setup uses the **Virtualbox** and **Vagrant** for running a Linux Ubuntu virtual-machine. Make sure the following is installed on your local development computer.

* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](https://www.vagrantup.com/downloads.html)

This setup works on both Windows and Mac.

## One time setup

Open a **Terminal** (MS-Dos prompt) window and go the directory where the `Vagrantfile` is located. By running the command below Vagrant will read the `vagrantfile` configuration file, download and boot the Ubuntu virtual-machine.

	vagrant up

### Vagrant provisioning

After booting up the virtual-machine Vagrant will (once) **provision** the virtual-machine according to the `bootstrap.sh` file. Using `apt-get install` it will install and configure:

* Apache, with a preconfigured **vhost** configuration and enable `mod_rewrite` (URL rewriting) module. See `bootstrap.sh` for details.
* PHP.
* PHP Composer.
* MySQL, with predefined `root` password (see `bootstrap.sh` file).
* phpMyAdmin.
* Git.

### Vagrant synced folders

Vagrant will automatically keep your local development computers **working directory in sync. with the virtual-machine**. This is configured by the `Vagrantfile`.

	config.vm.synced_folder "./<%= synced_folder %>", "/var/www/html/<%= appname %>/httpdocs"

This way you can use your own preferred local development computers code-editor or IDE to edit files and folders. When saving a file (or manage directoires) Vagrant will synchronize them to the virtual-machine.

### Get IP address of Ubuntu virtual-machine

This is one time requirement or when you know the IP addresses are going to change in your network setup. You'll need to figure out the **IP address** of the Vagrant virtual-machine in order to **add it to your own local machine's** `hosts` file. This is required to map the hostname to the IP address of the virtual-machine. Later on you can use for example `http://<%= appname %>.local.nl` in your local development computers web browser. That will display the web site running in the Ubuntu virtual-machine (and virtual-machine's Apache web server is listening to this hostname for requests).

#### SSH access

On your local development computer open a SSH connection to your `localhost` on port `2222` (this port is forwarded by Vagrant to the virtual-machine). Windows users you can use the free [PuTTy SSH client](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).  The default Vagrant username and password is: `vagrant`.

Once logged in get the IP address of the virtual-machine.

	hostname -I
    
Thit will sometimes give you 2 IP address. Usually it's the second IP address. Then close the SSH connection by running: 

	exit

### Add the Ubuntu virtual-machine IP address to you local machine

Open your local development computers `hosts` file and add the IP address of the Ubuntu virtual-machine. Remember to **open the `hosts` file as an adminitrator** user. Otherwise you can't save your changes to this file.

	Windows: 		C:\Windows\System32\Drivers\etc\hosts
    Mac & Linux: 	/etc/hosts   

Add the end of the `hosts` file add the following line. This will map the domainname to the IP address of the Ubuntu virtual-machine.

	172.28.128.3	<%= appname %>.local.poort80.nl

### Import the MySQL database dump

MySQL is running inside the virtual-machine. When the virtual-machine was provisioned, and MySQL was installed, the provision script `bootstrap.sh` also created a database for this project. But this database is still empty.

* You'll need to import a MySQL dump file from production to the virtual-machine. Use for example phpMyAdmin on production server to get a MySQL database dump file.
* Use free Windows, Mac or Linux tools like the [MySQL Workbench](http://www.mysql.com/products/workbench/) to connect (via SSH) to the virtual-machine MySQL database server.
* Import the MySQL dump database file.

### Correct local domainname

In the production MySQL dump; all URL's point to the production environment. Make sure, in the virtual-machine Wordpress `wp-options` MySQL table, that the site's URL's, and local path to the Wordpress `wp-uploads` directory, point to the correct setup inside the virtual-machine.

Check the SQL vars. below and run the SQL script on the virtual-machine MySQL database.

	SET @fromDomainname = 'https://www.<%= appname %>.nl';
	SET @toDomainname = 'http://<%= appname %>.local.nl/';
	SET @uploadPath = '/var/www/html/<%= appname %>/httpdocs/wp-content/uploads';

	SET collation_connection = 'utf8_general_ci';
	UPDATE `wp_options` SET `option_value`=(REPLACE(`option_value`,@fromDomainname,@toDomainname));
	UPDATE `wp_posts` SET `post_content`=(REPLACE(`post_content`,@fromDomainname,@toDomainname));
	UPDATE `wp_posts` SET `guid`=(REPLACE (`guid`,@fromDomainname,@toDomainname));
	UPDATE `wp_postmeta` SET `meta_value`=(REPLACE(`meta_value`,@fromDomainname,@toDomainname));
	UPDATE `wp_usermeta` SET `meta_value`=(REPLACE(`meta_value`,@fromDomainname,@toDomainname));
	UPDATE `wp_options` SET `option_value` = @uploadPath WHERE `option_name` = 'upload_path';

This will **find/replace** all URL's in Wordpress to a local pointing URL. When doing a re-import of the prodution database to the virtual-machine remember to run this SQL script again.

### Download Wordpress upload directory

Now you'll need to have an updated Wordpress upload images directory. Otherwise you'll see missing HTML `img` -tags.

* Download the production `/wp-content/wp-uploads/` images and sub-directories to your local development computer corresponding directory.
* Vagrant will then automatically sync. them with to the Ubuntu virtual-machine.

## Viewing and editing the web site

Once the database import is done, the Wordpress local URL's are correct and the Wordpress 'upload' directory is up to date, open your local development computers web browser to view the web site (running inside the virtual-machine).

	http://<%= appname %>.local.nl

* Now use your local development computers editor / IDE to make changes to the Wordrpess web site source files. 
* Vagrant will automatically sync. your changes to the virtual-machine. 
* Refresh the above URL local development computers web browser.
* Rinse and repeat!

### Don't have VPN running

If your local development computers web browser can't view the virtual-machines Apache web site; make sure you DON'T have VPN connection running. Otherwise your local development computer can't *find* the virtual-machine.

## phpMyAdmin

One can also access the virtual-machines Ubuntu MySQL databases by using the pre-installed phpMyAdmin setup that was installed during the provisioning installation.

	http://<%= appname %>.local.nl/phpmyadmin
    
Or use the IP address of the Ubuntu virtual-machine

	http://172.28.128.3/phpmyadmin

Login using the Wordpress credentials, see `wp-config.php` file. Or use the Vagrant provisioned MySQL `root` user password, see `bootstrap.sh` file.

Keep in mind that **phpMyAdmin can't upload files larger than the default 2MB** due to Apache config settings. For large SQL dump imports use the above mentioned free [MySQL Workbench](http://www.mysql.com/products/workbench/) tool with option to directly connect to the virtual-machine over SSH.

## Shutdown the Vagrant virtual-machine

To shutdown the running Vagrant box run the command below on your local development copmuter (again where the `Vagrantfile` is located). This will properly shutdown the Ubuntu virtual-machine.

	vagrant halt

To list the currently running Vagrant box(es) use this command in the same directory:

	vagrant status

### Vagrant global status

You can also check the global (for you local development computers) status of **all running Vagrant virtual-machines**.

	vagrant global-status

You can shutdown other Vagrant VM's by using their ID

	vagrant halt 1089deb

## Continue local development on the Wordpress blog

Once the initial setup is done; all you need to do to continue working on the blog is boot up the Vagrant Ubuntu virtual-machine. Open a **Terminal** (MS-Dos prompt) window and go the directory where the `Vagrantfile` is located.

	vagrant up

*On Windows one can also use the `_Vagrant-up.cmd` file; double-click it run the above command*.

When booting the virtual-machine the **provioning part is skipped** because the virtual-machine was already provioned before. Now open your local machine web browser again and load the web site again.

	http://<%= appname %>.local.nl

Please make sure your **network setup hasn't changed**. If so the IP addresses of the virtual-machine might have changed. Then you'll need to get the IP address again from the virtual-machine and update your local machine's `hosts` file appropriately.

## Destroying the Vagrant virtual-machine

When your all done and want to delete the virtual-machine, or start all over from scratch, you can (shutdown) and destroy the Vagrant virtual-machine by running this command inside the same directory as the `vagrantfile`.

	vagrant destroy

To start all over again run:

	vagrant up

The virtual-machine is copied to this project then booted and provisioned again.

## More info

Please make sure your **network setup hasn't changed**. If so the IP addresses of the virtual-machine might have changed. Then you'll need to get the IP address again from the virtual-machine and update your local machine's `hosts` file appropriately.

## Destroying the Vagrant virtual-machine

When your all done and want to delete the virtual-machine, or start all over from scratch, you can (shutdown) and destroy the Vagrant virtual-machine by running this command inside the same directory as the `vagrantfile`.

	vagrant destroy

To start all over again run:

	vagrant up

The virtual-machine is copied to this project then booted and provisioned again.

## More info

* [Vagrant getting started](http://docs.vagrantup.com/v2/getting-started/)
* [Vagrant documentation](https://docs.vagrantup.com/v2/)
* This Vagrant with LAMP stack setup is based on Github [panique vagrant lamp bootstrap](https://github.com/panique/vagrant-lamp-bootstrap)
* [Installing Wordpress](https://codex.wordpress.org/Installing_WordPress)