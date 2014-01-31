This is the web application that powers my personal website.

## Building with Grunt

The application code is stored in the `app` directory. To build it for either development or deployment purposes, first install [Node](http://nodejs.org/) and run `npm install` in the root directory to install Grunt and other node modules on which it depends.

Then run [Grunt](https://github.com/gruntjs/grunt) depending on what you want to do:

- **Development Dry Run**: run `grunt dev-dry` to compile the code for development purposes. This compiled code can be found in the `dev` directory.

- **Development**: run `grunt dev` to compile the code for development purposes and start a web server to view it locally on your machine. See the grunt output for the address and port to use.

-  **Deployment Dry Run**: run `grunt deploy-dry` to compile code for deployment purposes that can be pushed to a server manually or simply checked for accuracy before deployment below. This compiled code can be found in the `public` directory.

- **Deployment Testing**: run `grunt deploy-test` to compile code for deployment and start a web server to view it locally on your machine. See the grunt output for the address and port to use.

-  **Deployment**: run `grunt deploy` to compile code for deployment then commit and push it to the `gh-pages` branch for hosting on GitHub Pages.

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