# Game of life

This is an implementation of the famous [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
It's a demonstration of how simple rules can create complex patterns.

## The challange

As a developer it was somewhat of a challange, mostly because of performance.
There can easily be 100 000 cells that can have cells that are alive, dying or
resurrected. Each cell needs to keep track of it's neighbors, which demands
high CPU usage.

Most of the CPU time is used to paint the canvas though. Each frame is repainted
fully depending on cell states. To keep performance in mind the dead cells isn't
painted on the canvas at all.

In the future I will try out webassembly and service workers to increase performance
even more.

![Game of Life screenshot](game-of-life.png 'Game of Life screenshot')

## Rules

-   Any live cell with fewer than two live neighbours dies, as if caused by under-population.
-   Any live cell with two or three live neighbours lives on to the next generation.
-   Any live cell with more than three live neighbours dies, as if by over-population.
-   Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Code

This is written in JavaScript (ES6), mostly as an experiment with Canvas element and JavaScript performance.

-   **canvas.js**: Takes care of painting the canvas.
-   **controls.js**: Takes care of changing settings and pause/start/reset.
-   **game.js**: The starting point of the game, controls the timer and initilize everything.
-   **life.js**: Creates all the cells, checks neighbors, creates and kill life.
-   **statistics.js**: Shows statistics on number of living cells, paint times and such.

## Make it run

```
npm install
npm run build
```

Then just open ./dist/index.html in a browser or upload the files to a server.

## Development run

```
npm install
npm run dev
```

Then just open ./dist/index.html in a browser or upload the files to a server.

## Demo

[Try it out](http://www.tonyg.se/projects/game-of-life/)

It's actually possible to paint new cells by dragging on the canvas area :)
