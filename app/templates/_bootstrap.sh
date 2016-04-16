#!/usr/bin/env bash

########################################
# Project config
# Use single quotes instead of double quotes to make it work with special-character passwords
########################################

# Project folder
PROJECTFOLDER='<%= appname %>/<%= synced_folder %>'

# Apache virtual host
VHOST_SERVERNAME='<%= appname %>.local.dutchwebworks.nl'
VHOST_PORT='<%= apache_port %>'

# MySQL database
ROOT_PASSWORD='<%= mysql_root_password %>'
DB_NAME='<%= db_name %>'
DB_USER='<%= db_user %>'
DB_PASSWORD='<%= db_password %>'

########################################
# Provision script
########################################

# create project folder
sudo mkdir -p "/var/www/html/${PROJECTFOLDER}"

# update / upgrade
sudo apt-get update
sudo apt-get -y upgrade

# install apache 2.5 and php 5.5
sudo apt-get install -y apache2
sudo apt-get install -y php5

# install mysql and give password to installer
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $ROOT_PASSWORD"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $ROOT_PASSWORD"
sudo apt-get -y install mysql-server
sudo apt-get install php5-mysql

# Setup database, user and prefileges
mysql -uroot -p$ROOT_PASSWORD -e "CREATE DATABASE $DB_NAME CHARACTER SET utf8 COLLATE latin1_swedish_ci"
mysql -uroot -p$ROOT_PASSWORD -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD'"
mysql -uroot -p$ROOT_PASSWORD -e "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER ON '$DB_NAME'.* TO '$DB_USER'@'localhost';"

# install phpmyadmin and give password(s) to installer
# for simplicity I'm using the same password for mysql and phpmyadmin
sudo debconf-set-selections <<< "phpmyadmin phpmyadmin/dbconfig-install boolean true"
sudo debconf-set-selections <<< "phpmyadmin phpmyadmin/app-password-confirm password $ROOT_PASSWORD"
sudo debconf-set-selections <<< "phpmyadmin phpmyadmin/mysql/admin-pass password $ROOT_PASSWORD"
sudo debconf-set-selections <<< "phpmyadmin phpmyadmin/mysql/app-pass password $ROOT_PASSWORD"
sudo debconf-set-selections <<< "phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2"
sudo apt-get -y install phpmyadmin

# setup hosts file
VHOST=$(cat <<EOF
Listen $VHOST_PORT
<VirtualHost *:$VHOST_PORT>
	ServerName $VHOST_SERVERNAME
    DocumentRoot "/var/www/html/${PROJECTFOLDER}"
    <Directory "/var/www/html/${PROJECTFOLDER}">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
EOF
)
echo "${VHOST}" > /etc/apache2/sites-available/000-default.conf

# enable mod_rewrite
sudo a2enmod rewrite

# restart apache
service apache2 restart

# install git
sudo apt-get -y install git

# install Composer
curl -s https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
