# tiny dragon game

This is a game created for the Github Game off 2023, a month long game making marathon.

The game is written in JavaScript using Phaser 3.

This game jam was mainly an exercise in exploring AI generated art for use in game jams. The original plan was to have many levels in different areas of the house, art for which can be found in the assets folder. Due to time constraints, the eventual game is just one level and more of a proof of concept. 

The main learnings from this experience was that the AI tools I was using (ChatGPT 4 and Dall-E 3) can create very good one-off images (great for backgrounds), but trying to get it to create similar looking images, i.e. multiple images of the player character, is very very difficult. The tools don't understand what a spritesheet is and end up giving the character in different positions (standing, lying down etc), but some are often cut off at the edges and not quite the same as each other, missing limbs etc. Trying to get a new image of a character you like is almost impossible and I ended up heavily using editing tools (GIMP) to manipulate the AI art into something usable.

In the future, I will likely use AI art for backgrounds extensively and as inspiration for characters and other assets that need to move.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

# Initial Setup

Clone the repo:

`git clone git@github.com:BethFromAbove/tiny-dragon-game.git`

From within the tiny-dragon-game directory, install the dependencies:

`npm install`

To run:

``npm start``

This will start a local live server and open a browser window to localhost:8080 with the game running.

## Node Version Issues

You may get the following error when you do ``npm start``:

`Error message "error:0308010C:digital envelope routines::unsupported"`

This is due to trying to use SLL in Node.js v17 or later. See this thread on SO:

[Error message "error:0308010C:digital envelope routines::unsupported"](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)

To fix it downgrade to Node 16.20. Node version manager makes this easy.

Install nvm (Mac and Linux) or nvm-windows (Windows):

[NVM](https://github.com/nvm-sh/nvm)

[NVM-windows](https://github.com/coreybutler/nvm-windows)

Then from a terminal:

``nvm install 16.20``

``nvm use 16.20``

This is an issue with Phaser that even affects the official template, reported last December:

[Unable to build project on Node version 18 and above](https://github.com/photonstorm/phaser3-project-template/issues/100)

## Build

``` bash
npm run build && cp -r assets/ dist/ && zip -r tiny-dragon-game dist/*
```
