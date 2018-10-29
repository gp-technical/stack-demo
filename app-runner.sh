#!/bin/bash

sed -i "s#wss://localhost:3001#$SOCKET_SERVER#g" bundle.js

pm2 start process.json --no-daemon
