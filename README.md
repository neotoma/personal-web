# Personal web

This repository contains the source code for a [Ember](https://www.emberjs.com/)-powered web app that serves as a personal website for an individual on the Web according to principles embodied by the [IndieWeb](https://indieweb.org/) community.

This app is initially intended to display data from [a personal web server](https://github.com/asheville/personal-server) but can be powered by any data server conforming to [the JSON API specification](http://jsonapi.org/).

A real-world instance of this web app can be found at [markmhendrickson.com](http://markmhendrickson.com/).

## Setting up the environment

The code requires the following environment variables to run or deploy the server. The following environment variables can be declared by adding a file named `.env` (in [INI format](https://en.wikipedia.org/wiki/INI_file)) to the base directory, assuming they're not declared elsewhere in the system already. Such a file will be ignored by Git.

## Optional to run ap

- `PERSONAL_WEB_API_HOST`: Host address for data server conforming to JSON API specification (defaults to `http://127.0.0.1:9100`)
- `PERSONAL_WEB_SEGMENT_WRITE_KEY`: [Segment](http://segment.com) write key

## Required to deploy app

- `HOIST_DEST_USER`: User name with which to SSH into remote deployment server
- `HOIST_DEST_HOST`: Host address for remote deployment server
- `HOIST_DEST_DIR`: Remote system path to app directory on deployment server
- `PERSONAL_WEB_PRODUCTION_API_HOST`: Host address for data server needed by remote deployment

## Optional to deploy app

- `PERSONAL_WEB_PRODUCTION_SEGMENT_WRITE_KEY`: [Segment](http://segment.com) write key for remote deployment
- `HOIST_SYSTEMD_SERVICE`: 

If you intend to deploy the server to another system using scripts within the "Developing and deploying" section below, you can also create a `.env-deploy` file in the base directory, one that will be ignored by Git and used upon deployment to create an `.env` file remotely, thereby setting environment variables on the deployment server.

## Expecting data from the server

The app will expect the data server to fulfill requests for the following types of data:

- `attribute`: Basic attributes about the individual, namely those with IDs `birthday`, `coverImageUrl`, `description`, `firstName`, `fullName`, `gender`,  `history`, `homeLocation`, `imageUrl`, `lastName`, and `profession`
- `checkin`: Check-ins to list on homepage under "Check-ins"
- `company`: Companies to list on homepage under "Companies"
- `image`: Images to show in relation to posts
- `link`: Links to list on homepage under "Links"
- `photo`: Photos to show in relation to posts
- `post`: Posts to list on homepage under "Posts" and display individually on post pages
- `redirect`: Redirects to posts that previously had different IDs and therefore different URLs
- `skill`: Skills to list on homepage under "Skills"

## Running the app

Once the environment is ready per above, and [Node.js](http://nodejs.org/) with [NPM](https://www.npmjs.com/), [Bower](https://bower.io/), and [Ember CLI](https://ember-cli.com/) are installed, simply execute the following commands to prepare and run the app:

1. `npm run install-all` to install NPM and Bower dependencies
2. `npm run build` to build the app
3. `npm start` to fire app up and automatically reloads it when code changes are made

## Deploying the server

Deployment scripts are available through [Hoist](https://github.com/markmhx/grunt-hoist).
