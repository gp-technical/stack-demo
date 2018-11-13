#!/bin/bash

sed -i "s#wss://stack-demo.local.goodpractice.net:3001#$SOCKET_SERVER#g" bundle.js

pm2 start process.json --no-daemon
