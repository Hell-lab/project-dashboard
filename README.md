# Project Dashboard
This project dashboard should give transparent insights into the StV Informatik's work.
It is inspired by our [current dashboard](https://new.oeh.jku.at/cs/dashboard).

## Setup
### Environments
Create .env files at the root of the backend and frontend folder.

The backend should contain database information, e.g.:
```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=
DB_PORT=
```

The frontend should contain connection details for the backend, e.g.:
```
VUE_APP_API_BASE_URL=
```

Both need to also declare the same secret: 
```
JWT_SECRET=
```

### Running the application
To start the backend, navigate to the backend root folder and execute
```node index.js```

To start the frontend, navigate to the frontend root folder and execute ```npm run build``` and ```npm run preview```.

You might need to first call ```npm install``` to ensure that all dependencies have been installed.

## Features
### Leveled Authorization
Use the login button to use advanced features.
All StV members can perform most post requests, Admins can also delete projects.

### Real-time updates
Changes are instantly reflected across all devices thanks to web sockets.

### Beautiful Simplistic Design
You can't beat the classics.

### Ease of use
We hid most things in the backend with no real way of accidentally touching them during browsing. This is not because of a lack of time, but in order to protect incapable users.

## Responsible Disclosure
This project was created using AI-tools. Like, a lot. Citing all our tool requests would probably more than double the project size.<br>
We found quite a few limitations in the tools' capabilities however.