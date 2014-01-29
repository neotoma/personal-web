This is the web application that powers my personal website.

## Building with Grunt

The application code is stored in the `app` directory. To build it for either debugging or release purposes, first install [Node](http://nodejs.org/) and run `node install` in the root directory to install Grunt and other node modules on which it depends.

Then run [Grunt](https://github.com/gruntjs/grunt) depending on what you want to do:

- **Debugging**: run `grunt debug` from within the root directory to compile the code and start a web server to view it locally on your machine. See the grunt output for the address and port to use.

-  **Deployment Dry Run**: run `grunt public` to compile fully minified code and styling that can be pushed to a server manually or simply checked for accuracy before deployment below.

-  **Deployment**: run `grunt deploy` to compile, commit and push everything in the `public` directory to the `gh-pages` branch for hosting on GitHub Pages.

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