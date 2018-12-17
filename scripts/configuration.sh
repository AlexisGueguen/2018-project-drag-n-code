#!/bin/sh
echo ============================== Configuring Project
cd ~/2018-project-drag-n-code/server
npm install
cd ~/2018-project-drag-n-code/client
npm install
cd ~/2018-project-drag-n-code/client
npm run build

cd ~/2018-project-drag-n-code/scripts
./fill_db.sh