This contains both the client and server that constitute my personal website.

## Building with Grunt

To build the client for either development or deployment purposes, first install [Node](http://nodejs.org/) and run `npm install` in the root directory to install Grunt and other node modules on which it depends. Then run `bower install` to install the Bower components on which it depends as well.

Then install the [Grunt](https://github.com/gruntjs/grunt) command line interface:

`sudo npm install -g grunt-cli`

And depending on what you want to do:

- **Development Dry Run**: run `grunt dev-dry` to compile the client for development purposes. The compiled client can be found in the `client-build` directory.

- **Development**: run `grunt dev` to compile development code and run the server for local testing. See the Grunt output for the client address and port to use in the browser.

- **Deployment Dry Run**: run `grunt deploy-dry` to compile production code that can be pushed to a server manually or simply checked for accuracy before deployment.

- **Deployment Testing**: run `grunt deploy-test` to compile production code and run the servr for local testing. See the Grunt output for the client address and port to use in the browser.

-  **Deployment**: run `grunt deploy` to compile production code and deploy it to your host. The following environmental variables must be set on the production server:

```
export MARKMHENDRICKSON_HOST=<your host address>
export MARKMHENDRICKSON_HOST_USERNAME=<username on host with which to connect>
export MARKMHENDRICKSON_HOST_DIR=<destination directory on host for app>
```

## Loading data

All content on which the app depends should be placed inside the `data` directory. Alternatively, symbolic links can be added to that folder that point to data stored elsewhere.

The app currently looks for the following resources under `data` to function:

### posts-all

A collection of available posts. Example:

	{
	  "posts": [
	    {
	      "id": 24,
	      "title": "First Post",
	      "publishedAt": "2013-12-06 00:00:00"
	    },
	    {
	      "id": 23,
	      "title": "Second Post",
	      "publishedAt": "2012-12-11 07:50:07"
	    },
	    ...
	  ]
	}

### posts/[id]

Content for individual posts. Example:

    {
      "post": {
        "id": 8,
        "title": "Example Post",
        "createdAt": "2011-06-16 22:33:45",
        "updatedAt": "2011-06-19 22:15:49",
        "publishedAt": "2009-03-22 00:00:00",
        "slug": "example-post",
        "body": "The content of this post goes here."
      }
    }