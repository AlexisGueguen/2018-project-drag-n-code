#!/bin/sh
echo Filling the database with data
mongo < achievements.js
mongo < levels.js
echo database version: 1
echo OK.