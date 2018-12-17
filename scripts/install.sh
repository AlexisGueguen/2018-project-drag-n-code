#!/bin/sh
echo installing server components...

echo ============================== Updating OS
sudo apt-get update
sudo apt-get upgrade -y

echo ============================== Installing NGINX
sudo apt-get install nginx -y
sudo systemctl status nginx
sudo systemctl start nginx
sudo systemctl enable nginx

echo ============================== Installing MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod
sudo systemctl enable mongod

echo ============================== Installing NPM
sudo apt-get install build-essential libssl-dev -y
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get update
sudo apt-get install -y nodejs

echo ============================== Installing PM2
sudo npm install pm2 -g
sudo npm install -g serve

echo ============================== Installing Cerbot
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx -y