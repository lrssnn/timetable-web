# `timetable-web` — Angular JS Timetabling tool

This project is based on the `angular-seed` base project.

`timtable-web` is an Angular JS app to assist in timetabling decisions such as university 
class decisions.

## Getting Started

Just clone the repo and install. The project requires both `npm` and `bower` to run. With
both prerequisites installed, simply run 

```
npm install
```

to install dependencies.

### Run the Application

The project can be run as a dev web server locally with:
```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].


> Note: Everything below this point is copied verbatim from the `angular-seed` README.md

## Updating Angular

Since the Angular framework library code and tools are acquired through package managers 
(npm and bower) you can use these tools to easily update the dependencies. Simply run the 
preconfigured script:

```
npm run update-deps
```

This will call `npm update` and `bower update`, which in turn will find and install the 
latest versions that match the version ranges specified in the `package.json` and 
`bower.json` files respectively.


## Loading Angular Asynchronously

The `angular-seed` project supports loading the framework and application scripts 
asynchronously. The special `index-async.html` is designed to support this style of loading. 
For it to work you must inject a piece of Angular JavaScript into the HTML page. The project 
has a predefined script to help do this:

```
npm run update-index-async
```

This will copy the contents of the `angular-loader.js` library file into the 
`index-async.html` page. You can run this every time you update the version of Angular that 
you are using.


## Serving the Application Files

While Angular is client-side-only technology and it is possible to create Angular web apps 
that do not require a backend server at all, we recommend serving the project files using a 
local web server during development to avoid issues with security restrictions (sandbox) in 
browsers. The sandbox implementation varies between browsers, but quite often prevents things
like cookies, XHR, etc to function properly when an HTML page is opened via the `file://` 
scheme instead of `http://`.

### Running the App during Development

The `angular-seed` project comes preconfigured with a local development web server. It is a 
Node.js tool called [http-server][http-server]. You can start this web server with 
`npm start`, but you may choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by 
running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own web server, such as Apache or Nginx. Just
configure your server to serve the files under the `app/` directory.

### Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system,but the general rule is that all you need in production are the files under the `app/` 
directory. Everything else should be omitted.

Angular apps are really just a bunch of static HTML, CSS and JavaScript files that need to be
hosted somewhere they can be accessed by browsers.

If your Angular app is talking to the backend server via XHR or other means, you need to 
figure out what is the best way to host the static files to comply with the same origin 
policy if applicable. Usually this is done by hosting the files by the backend server or 
through reverse-proxying the backend server(s) and web server(s).


## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new 
commits to your repository and execute scripts such as building the app or running tests. 
The `angular-seed` project contains a Travis configuration file, `.travis.yml`, which will 
cause Travis to run your tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the
[Travis website][travis-docs] for instructions on how to do this.


## Contact

For more information on AngularJS please check out [angularjs.org][angularjs].

[angularjs]: https://angularjs.org/
[http-server]: https://github.com/indexzero/http-server
[local-app-url]: http://localhost:8000/index.html
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
