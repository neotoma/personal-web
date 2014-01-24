This is the web application that powers my personal website.

## Building with Grunt

The application code is stored in the `app` directory. To build it for either debugging or release purposes, first install [Node](http://nodejs.org/) and run `node install` in the root directory to install Grunt and other node modules on which it depends.

Then run [Grunt](https://github.com/gruntjs/grunt):

- For *debugging*, simply run `grunt` from within the root directory. That will compile the code and start a web server to view it locally on your machine. See the grunt output for the address and port to use.

- For *release*, simply run `grunt release`. That will compile fully minified code and styling that you can then push to a server.