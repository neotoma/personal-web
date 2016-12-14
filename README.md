# Personal web

This repository contains the source code for a web app that serves as a personal website for an individual on the Web.

This app is initially intended to display data from [a personal web server](https://github.com/asheville/personal-server) but can be powered by any data server conforming to [the JSON API specification](http://jsonapi.org/).

An real-world instance of this web app can be found at [markmhendrickson.com](http://markmhendrickson.com/).

## Setting up the environment

The code requires the following environment variables to run or deploy the server. The following environment variables can be declared by adding a file named `.env` (in [INI format](https://en.wikipedia.org/wiki/INI_file)) to the base directory, assuming they're not declared elsewhere in the system already. Such a file will be ignored by Git.

- `PERSONAL_WEB_PORT`: Port through which to run the app locally (required to run app)
- `PERSONAL_WEB_API_HOST`: Host address for data server conforming to JSON API specification (required to run app)
- `PERSONAL_WEB_GA_TRACKING_ID`: Google Analytics tracking ID (optional to run app)
- `PERSONAL_WEB_DEPLOY_USERNAME`: User name with which to SSH into remote deployment server (required to deploy app)
- `PERSONAL_WEB_DEPLOY_HOST`: Host address for remote deployment server (required to deploy app)
- `PERSONAL_WEB_DEPLOY_DIR`: Remote system path to app directory on deployment server (required to deploy app)

If you intend to deploy the server to another system using scripts within the "Developing and deploying" section below, you can also create a `.env-deploy` file in the base directory, one that will be ignored by Git and used upon deployment to create an `.env` file remotely, thereby setting environment variables on the deployment server.

## Data types

The app will query the data server for the following types of data:

- `attribute`: Basic attributes about the individual, namely those with IDs `birthday`, `coverImageUrl`, `description`, `firstName`, `fullName`, `gender`,  `history`, `homeLocation`, `imageUrl`, `lastName`, and `profession`
- `checkin`: Latest checkin to show on homepage within cover
- `company`: Companies to list on homepage under "Companies"
- `geolocation`: Latest geolocation to show on homepage within cover
- `link`: Links to list on homepage under "Links"
- `post`: Posts to list on homepage under "Writing" and display individually on post pages
- `skill`: Skills to list on homepage under "Skills"
- `update`: Latest update to show on homepage within cover
- `weatherExperience`: Latest weather experience to show on homepage within cover

## Running the app

Once the environment is ready per above, and [Node.js](http://nodejs.org/) with [NPM](https://www.npmjs.com/) is installed, simply execute the following commands to prepare and run the app:

1. `npm install` to install NPM dependencies
2. `bower install` to install Bower dependencies
3. `ember build` to build the app
4. `node app` to fire it up

## Developing and deploying

With [Grunt](gruntjs.com) installed in addition to establishing your environment and data accordingly per the instructions above, you can run any of the following scripts to help with development and deployment:

- `ember serve`: Runs the app and automatically reloads it when code changes are made during development
- `grunt deploy`: Deploys environment and certificate file dependencies, deploys the app, runs `npm install` remotely to ensure any new dependencies are installed
- `grunt deploy-dependencies`: Deploys environment and certificate file dependencies
- `grunt deploy-app`: Deploys the app and runs `npm install` remotely to ensure any new dependencies are installed

If you add `forever` to any of the deployment scripts (e.g. `grunt deploy forever`), [forever](https://github.com/foreverjs/forever) will be used to start or restart the app remotely post-deployment. Ensure that Node with NPM and forever are installed remotely before appending this script.

If you add `systemd` to any of the deployment scripts (e.g. `grunt deploy systemd`), [systemd](https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal) will be used to start or restart the app remotely post-deployment. Ensure that Node and systemd with a service for the app called `personalweb` are installed remotely before running this script.