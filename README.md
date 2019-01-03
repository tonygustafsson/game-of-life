# Game of life

This is an implementation of the famous [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
It's a demonstration of how simple rules can create complex patterns.

## Rules

-   Any live cell with fewer than two live neighbours dies, as if caused by under-population.
-   Any live cell with two or three live neighbours lives on to the next generation.
-   Any live cell with more than three live neighbours dies, as if by over-population.
-   Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Code

This is written in JavaScript, mostly as an experiment with Canvas element and JavaScript performance.

## Demo

[Try it out](http://www.tonyg.se/projects/game-of-life/)
