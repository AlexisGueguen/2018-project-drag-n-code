#!/bin/sh
cd ~/2018-project-drag-n-code/server
npm install
cd ~/2018-project-drag-n-code/client
npm install
cd ~/2018-project-drag-n-code/client
npm run build
cd ~/2018-project-drag-n-code/client
pm2 start app.config.json
cd ~/2018-project-drag-n-code/server
pm2 start app.config.json
pm2 report