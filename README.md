#Craft Boilerplate

**Starting point for custom Craft site development.**

The primary goals of this build process are a clean, component based organization, mixed with automation for CSS/SASS and JavaScript concatenation and minification/uglification.

## Author(s) / Inspiration
Build process, base styles, and JavaScript by [Nick Katarow](http://github.com/nkatarow).

SASS Structure and base styles inspired by [Brad Frost](http://bradfrostweb.com/)'s [Pattern Lab](http://demo.patternlab.io/).

## What it does

**CSS/SASS**

The CSS directory structure broken into three categories.

* **helpers** - Used primarily for things like CSS reset/normalize files, SASS variables and mixins.
* **base** - Intended for base, classless, global styles for HTML elements. In addition, utilities like clear fixes and offscreen text can be considered base styles.
* **components** - Where the majority of your custom styling should take place. For best organization, create a new file for each new component you build and take advantage of SASS nesting techniques to keep your components self contained.

**JavaScript**

The JavaScript build process varies slightly from the CSS process for easier debugging in development. Details on the differences between the development and production processes can be found in the **Usage** section below.

The JavaScript directory structure broken into three categories.

* **head-libs** - Some JS libraries need to be loaded in the header in order to work properly, place those libraries in this directory, but only if you have to. Best practices dictate to load as much of the JS in the footer as possible. This comes with jQuery 1.11.1 and the dev build of Modernizr by default.
* **foot-libs** - Put the rest of your JS libraries that can be loaded in the footer here.
* **components** - Outside of the **_ui/js/app.main.js** file, all of your JS components should be placed here. By default, this comes with an empty name spaced file to used as a template.

**Master Template**

**/craft/templates/_layout.html** is the master template that controls all loading of header, footer, and main content areas. In it, you will find all the usual header meta type information, as well as a check to see if the site is currently in dev mode (as defined by the general config file). The template will load CSS/JS file accordingly.

## Setup
To get the app up and running, you will need to make sure you have the following software installed prior to running. If you've already got these all installed, skip to the app dependencies.

### System Dependancies
* [Node](http://nodejs.org/) - Download and install using the link provided.
* [NPM](https://npmjs.org/) - This should be installed automatically with Node.js.
* [Gulp]() - Run the following command after Node/NPM are installed:

```
$
```

* [Sass](http://sass-lang.com/) - Assuming you're running ruby, run the following command (if you get an error, try running with sudo):

```
gem install sass
```

### Application Dependencies
Once you have the proper system dependencies installed, run the following command in the application's root directory:

```
npm install
```

## Usage
Below you'll fine a list of commands to perform varying tasks followed by a detailed description of what each does.

```
gulp
```
* **CSS/SASS**
	* The default gulp task will check the **_ui/css/main.scss** file and compile all the specified scss files into **_ui/compiled/main.css**. This CSS style is expanded, have a sourcemap file, trace, debug info and line number. This is the CSS file loaded when viewing the development site.
* **JavaScript**
	* The default gulp task will also run through the js directories and create the two JS files to include (**_ui/compiled/header-scripts.js** and **_ui/compiled/footer-scripts.js**). **header-scripts.js** includes only libraries that live in the **_ui/js/header-scripts/** directory. **footer-scripts.js** includes those in the **_ui/js/footer-scripts/** and **_ui/js/component/** directories as well as **_ui/js/app.main.js**.

```
gulp watch
```
The watch task will look for changes on all SCSS and JS files, automatically run the same processes as the default gulp task, and reload your webpage for you (as long as you're running the livereload browser plugin).

```
gulp build
```
The build task should be run when you're ready to generate or update your optimized production files.

* **CSS/SASS**
	* Gulp will take **_ui/compiled/main.css** and run a minify task on it, outputting to **_ui/dist/main.min.css**.
* **JavaScript**
	* Gulp will take **_ui/compiled/header-scripts.js** and **_ui/compiled/footer-scripts.js**, run an uglify task on them, outputting to **_ui/dist/header-scripts.min.js** and **_ui/dist/footer-scripts.min.js**.

## Libraries Included
* [Profound Grid](http://www.profoundgrid.com/)
* [jQuery 1.11.1](http://jquery.com/)
* [Modernizr](http://www.modernizr.com)
* [Picturefill](https://github.com/scottjehl/picturefill)
