---
layout: single
source : https://influencetech.github.io/ivx-js/
---

# Dev Tools

{% include toc %}

## Overview

Development on the iVXjs Library could be difficult. To help streamline the process, there is an 
internal build tools that allows developers the ability run a local server and continuously 
build out as they develop. This documentation will go over some basic CLI commands that can get you 
started. 

## Requirements

To get started you will need to get node that supports ES6. To figure out which version meets this requirement you can 
go to this site [node.green](http://node.green/)

After a suitable nodejs version is download, make sure to run `npm install`.

## Interactive Tutorial

For an interactive guide on contributing and developing on iVXjs, go to the [Favorite Color Tutorial](https://influencetech.github.io/ivx-js/developer/tutorial.color-input)

## npm run setup 

__Description__ 

Sets up and generates static files into a `public` forlder at the root. This should run only when the public folder needs to be reset or initially. The static files generated are
meant to support the *Favorite Color Tutorial*.

## npm start 

__Description__ 

Watches the source code for updates and adds them to both the `public/js` and the `dist` folders with a local webserver. This command is meant to help 
make it easier for developers to develop on the library. 

__Special Note__

All iVXjs related code and the index.html file are autogenerated by this command. So, if you have various html files serving up local instances, it is advised 
to copy/duplicate those in another folder.

__Flags__ 

* `--ui "MODULE NAME"` - Watches the source for this UI module and injects all dependencies into the index.html file in the public folder
* `--data "MODULE NAME"` - Watches the source for this data module and injects all dependencies into the index.html file in the public folder
* `--validation "MODULE NAME"` - Watches the source for this validation module and injects all dependencies into the index.html file in the public folder
* `--analytics "MODULE NAME"` - Watches the source for this analytics module and injects all dependencies into the index.html file in the public folder

__Example__

If as a developer, I wanted to work on the Firebase data module and the Semantic UI module the command I would use is: 

```
npm start --ui "semantic-ui" --data "firebase"
```