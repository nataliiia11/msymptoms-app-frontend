<h1 align="center">
MSymptoms - Symptoms tracking web application
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## clone or download
## FRONTEND

```terminal
$ git clone https://github.com/nataliiia11/msymptoms-app-frontend.git
$ yarn # or npm i
```
## BACKEND
```terminal
$ git clone https://github.com/nataliiia11/msymptoms-backend.git
$ yarn # or npm i
```
## project structure
### FRONTEND
```terminal
build
public
LICENSE
package.json
.env
src/
   assets
   components/
        addSymptoms
        authorisation
        card
        dashboard
        dropdown
        layout
        loader
        news
        profile
        protect
        settings
    customHook
    pages/
        404
        addSymptoms
        authorisation
        contact
        dashboard
        home
        legal
        news
        profile
        settings
        symptomsList
    redux/
        api
        features/
            auth
            email
            news
            store
        store.js
    App.js
    index.css
    index.js
...
```
### BACKEND

```terminal
controllers
middleware
models
routers
utils
views
.gitgnore
README.md
package.json
server.js
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB]
- [Node] ^10.0.0
- [npm]

The frontend and backend should be run separately in two terminals.
## FRONTEND usage(PORT: 3000)

```terminal
$ cd frontend   
$ yarn # or npm i
$ npm start
```
.env file should contain the following 
REACT_APP_BACKEND_URL

## BACKEND usage(PORT: 5001)

.env file should contain the following 

MONGO_URI
NEWS_API
EMAIL_USER
EMAIL_HOST
JWT_SECRET
NODE_ENV
SENDGRID_USERNAME
SENDGRID_PASSWORD
CRYPTR_KEY

run the script at the first level:

### Start
#### BACKEND
```terminal 
$ npm i
$ npm start
```
#### FRONTEND
```terminal 
$ npm i
$ npm start
```
# Dependencies(tech-stacks)
Client-side 

  
    "@ant-design/pro-components": "^2.3.57",
    "@fullcalendar/react": "^6.1.1",
    "@jridgewell/sourcemap-codec": "^1.4.14",
    "@mui/material": "^5.11.6",
    "@react-oauth/google": "^0.6.1",
    "@react-pdf/renderer": "^3.1.5",
    "@reduxjs/toolkit": "^1.9.1",
    "@rollup/plugin-terser": "^0.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "antd": "^5.1.7",
    "axios": "^1.2.3",
    "chart.js": "^3.0.0",
    "chartjs-adapter-luxon": "^1.3.1",
    "chartjs-plugin-streaming": "^2.0.0",
    "chokidar": "^3.3.1",
    "html-react-parser": "^3.0.8",
    "lodash": "^4.17.21",
    "moment": "^2.29.4",
    "nth-check": "^2.1.1",
    "react": "^18.2.0",
    "react-calendar": "^4.0.0",
    "react-chartjs-2": "^4.3.1",
    "react-charts": "^3.0.0-beta.54",
    "react-confirm-alert": "^3.0.6",
    "react-cookie-consent": "^8.0.1",
    "react-csv": "^2.2.2",
    "react-document-title": "^2.0.3",
    "react-dom": "^18.2.0",
    "react-helmet": "^6.1.0",
    "react-icons": "^4.7.1",
    "react-native-webview": "^11.26.1",
    "react-paginate": "^8.1.4",
    "react-quill": "^2.0.0",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.7.0",
    "react-scripts": "^5.0.1",
    "react-select": "^5.7.0",
    "react-to-print": "^2.14.11",
    "react-toastify": "^9.1.1",
    "recharts": "^2.4.3",
    "sass": "^1.57.1",
    "sockjs": "^0.3.24",
    "ssri": "^10.0.1",
    "styled-components": "^5.3.6",
    "stylelint": "^15.2.0",
    "stylelint-config-standard": "^30.0.1",
    "svgo": "^1.3.2",
    "terser": "^4.8.1",
    "web-vitals": "^2.1.4",
    "yargs-parser": "^21.1.1"
    
   Server-side 
   
    "axios": "^1.2.6",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "cryptr": "^6.0.3",
    "dotenv": "^16.0.3",
    "escape-html": "^1.0.3",
    "express": "^4.18.2",
    "express-async-handler": "^1.2.0",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^6.7.0",
    "google-auth-library": "^8.7.0",
    "helmet": "^6.0.1",
    "hpp": "^0.2.3",
    "js-string-escape": "^1.0.1",
    "jsonwebtoken": "^9.0.0",
    "moment": "^2.29.4",
    "mongoose": "^6.7.2",
    "node-cron": "^3.0.2",
    "nodemailer": "^6.8.0",
    "nodemailer-express-handlebars": "^5.0.0",
    "nodemon": "^2.0.20",
    "ua-parser-js": "^1.0.32",
    "xss-clean": "^0.1.1"


# Screenshots of this project

Add symptoms
![ADD SYMPTOMS PAGE](https://i.imgur.com/1JYcqeg.png)

Dashboard
![DASHBOARD](https://i.imgur.com/PdEHULx.png)


Email Me: azarnyhna@gmail.com

# Web Sited of this project
###FRONTEND
https://msymptoms-app.onrender.com/

###BACKEND
https://msymptoms-backend.onrender.com

## Author
Nataliia Azarnykh

### License
[MIT]()
