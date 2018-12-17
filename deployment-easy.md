### Git 
Update package list: 
```
sudo apt-get update
```  
Install: 
```
sudo apt-get install git-core
```    
Check: 
```
git --version
```  

### Clone the repository
```
cd ~/
git clone https://github.com/LuleaUniversityOfTechnology/2018-project-drag-n-code.git
ls
```

### Run installation scripts
During the installation, if it is asked to keep your local copy, say YES. 
Then, follow the instructions to install the packages.  
```
chmod -R 755 ~/2018-project-drag-n-code
sudo ~/2018-project-drag-n-code/scripts/install.sh
sudo ~/2018-project-drag-n-code/scripts/configuration.sh
```

##Configuration
Remove nginx default configuration: 
```
sudo rm /etc/nginx/sites-available/default
```  
Add new configuration: 
```
sudo nano /etc/nginx/sites-available/default
```  
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
You can test the configuration with 
```
sudo nginx -t
```  
Then reload nginx: 
```
sudo systemctl reload nginx
```  

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
Test the renewal of the certificate: 
```
sudo certbot renew --dry-run
```  

### Launch the client-server
Launch the client-server: 
```
sudo ~/2018-project-drag-n-code/scripts/launch.sh
```  
Now the client and the server should appear in the PM2 report. Use ```pm2 report``` to show informations about running instances.