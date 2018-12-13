#Deployment
For the production environment, we use AWS virtual machine.

You need a linux computer (or VM) with the port for HTTP(80), HTTPS(443) and SSH(22) open.

##Install the tools
###System update
First we need to update the system:  
```sudo apt-get update```    
```sudo apt-get upgrade -y```    
If it ask you to keep your local copy, say YES.  
### NGINX
Install nginx: ```sudo apt-get install nginx -y```    
Check installation success: ```sudo systemctl status nginx```  
Launch it: ```sudo systemctl start nginx```  
Launch it when system boot: ```sudo systemctl enable nginx```  
### MongoDB
Import they key for the official MongoDB repository: ```sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927```  
Create a list file for MongoDB: ```echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list```  
Update package list: ```sudo apt-get update```  
Install MongoDB: ```sudo apt-get install -y mongodb-org``` 
Launch it: ```sudo systemctl start mongod```
Check for status: ```sudo systemctl status mongod```  
Launch it when system boot: ```sudo systemctl enable mongod```  
If you need a mongo shell: ````mongo````  
### NPM
First, some utils: ```sudo apt-get install build-essential libssl-dev```  
Say Y when it ask you if you want to install.  
Install curl: ```sudo apt install curl```  
Enable latest release: ```curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -```  
Update package list: ```sudo apt-get update```   
Get latest release: ```sudo apt-get install -y nodejs```  
Check for version installed: ```node -v``` and ```npm -v```
### Git 
Update package list: ```sudo apt-get update```
Install: ```sudo apt-get install git-core```  
Check: ````git --version````
### PM2
PM2 is the tool that will reboot the server if it crash.  
Install PM2: ```sudo npm install pm2 -g```  
Install serve: ```sudo npm install -g serve``` 
### Certbot
Certbot automatically enable HTTPS on the website with EFF's Certbot, deploying Let's Encrypt certificates.  
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```  

##Configuration
Remove nginx default configuration: ```sudo rm /etc/nginx/sites-available/default```  
Add new configuration: ```sudo nano /etc/nginx/sites-available/default```  
You need to change ```your_domain``` to a domain you have bought (for example here dragncode.tk).   
```
server {
    listen 80;
    server_name your_domain www.your_domain;
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
     }
}
```
```Ctrl+O``` to save, ```Ctrl+X``` to exit.  
You can test the configuration with ```sudo nginx -t```  
Then reload nginx: ```sudo systemctl reload nginx```  

Update the address of the API with your own domain: 
```
sudo nano ~/2018-project-drag-n-code/client/src/config.json
```

###Generate a certificate
Replace example.com with your domain name  
```
sudo certbot --nginx -d example.com -d www.example.com
```  
If it's the first time you use certbot, provide an email and agree to Terms of Service.  
Choose Redirect All to force https traffic.  
Test the renewal of the certificate: ````sudo certbot renew --dry-run```  

### Clone the repository
```
cd ~/
git clone https://github.com/LuleaUniversityOfTechnology/2018-project-drag-n-code.git
ls
```
The project must appear after the last command (ls).  
Install all the project dependencies:
```
cd ~/2018-project-drag-n-code/server
npm install
cd ~/2018-project-drag-n-code/client
npm install
```   

### Launch the client-server
Build the client: 
```
cd ~/2018-project-drag-n-code/client
npm run build
```
Launch the client-server: 
```
cd ~/2018-project-drag-n-code/client
pm2 start app.config.json
cd ~/2018-project-drag-n-code/server
pm2 start app.config.json
```
Check for server status: 
General status: ```pm2 report```  
Client status: ```pm2 show client```  
Server status: ```pm2 show server```  
