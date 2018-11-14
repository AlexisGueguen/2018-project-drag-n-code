#!/bin/bash
echo Initializing database
BASEDIR=$(dirname "$0")
mongo dragncode $BASEDIR/init/users.validation.js