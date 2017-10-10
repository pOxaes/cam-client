# Vue / VueX progressive web app (client) for personal security camera application  - WIP

this PWA takes part of a larger project which contains 2 more private projects:
- web server, using NodeJS
- local camera server, using NodeJS and ffmpeg. Running on a Raspberry PI which has an USB webcam

It uses mobile web app 'installation' & google push (movment detection notifications).

Both of those projects will be moved to public as soon as they are cleaned and more advanced.

## Features (WIP)
- handle multiple cameras
- distant movment detection toggler
- realtime snapshot on demand
- profile configuration (mail / notifications)
- secondary users administration

## Configuration
You must create ``config/prod.urls.js``, based on ``config/prod.urls.example.js``.

This project has been bootstraped with [vue-cli](https://github.com/vuejs/vue-cli) and is using VueX.

![login](https://raw.githubusercontent.com/pOxaes/cam-client/master/static/maquette_login.png)

## Quick Start
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Build Setup
``` bash

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

![cameras](https://raw.githubusercontent.com/pOxaes/cam-client/master/static/maquette_cameras.png)
![camera](https://raw.githubusercontent.com/pOxaes/cam-client/master/static/maquette_camera.png)
![movmentSessions](https://raw.githubusercontent.com/pOxaes/cam-client/master/static/maquette_movementSessions.png)
![movmentSession](https://raw.githubusercontent.com/pOxaes/cam-client/master/static/maquette_movementSession.png)
![profile](https://raw.githubusercontent.com/pOxaes/cam-client/master/static/maquette_profile.png)
![admin](https://raw.githubusercontent.com/pOxaes/cam-client/master/static/maquette_admin.png)