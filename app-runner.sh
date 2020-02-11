#!/bin/sh

if [ -f index.html ]; then
  echo 'moving files to app folder'
  mkdir -p app
  mv bundle.js app
  mv index.html app
  mv style.css app

  sed -i "s#wss://stack-demo.local.goodpractice.net:3001#$SOCKET_SERVER#g" app/bundle.js
fi

pm2 start process.json --no-daemon
