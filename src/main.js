// @flow

/* -------- GAME OF LIFE ---------- 
    Created by Tony Gustafsson
    More info: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
*/

import type { GameType } from './types';
import { Statistics } from './statistics';
import { Canvas } from './canvas';
import { Controls } from './controls';

var game: GameType = {
    cellSize: 6,
    cells: [],
    numberOfRows: null,
    numberOfColumns: null,
    percentageAlive: 15,
    generationSpeed: 35,
    predictionMode: false,
    generation: 0,
    lifeTimerId: null,
    init: function init() {
        /* Initializes the game, resets everything */
        var game = this;

        // Get the number of rows and columns of cells by deviding screen size with cell size
        game.numberOfRows = Math.floor(Canvas.height / game.cellSize);
        game.numberOfColumns = Math.floor(Canvas.width / game.cellSize);

        game.cells = game.createCells();
        Statistics.init();
        Canvas.init(game.cells, Statistics, game.cellSize);

        // Reset some stuff if the game is restarted
        game.generation = 0;

        if (game.lifeTimerId !== null) {
            clearInterval(game.lifeTimerId);
            game.lifeTimerId = null;
        }

        // Let's start the timer and get some life going
        game.runLife();
    },
    runLife: function runLife() {
        /* Keeps track of timer, makes the cells evolve automatically */

        game.evolve();

        game.lifeTimerId = setInterval(game.evolve, game.generationSpeed);
        game.controls.init(game.runLife, game.lifeTimerId, game.init, game.evolve, game.generationSpeed, game.cellSize, game.percentageAlive);
    },
    evolve: function evolve() {
        /* Calculates which cells will be alive or dead */

        if (game.predictionMode) {
            // Only predict the changes, so we can mark cells as new or dying
            game.predictCellStates();
        } else {
            // Actually move cells in memory
            game.changeCellStates();
        }

        // Every other evolution, it will first predict, then make cell changes
        game.predictionMode = !game.predictionMode;

        // Now we can paint these new positions and cells to the canvas
        Canvas.paint();

        // Write to statistics which generation we are on now
        Statistics.changeGeneration(game.generation);
        game.generation++;
    },
    createCell: function createCell(rowId, columnId, alive) {
        /* Will create a specific cell which will end up in an array */

        var cell = {
            row: rowId,
            column: columnId,
            alive: alive,
            willBeAlive: alive,
            getNeighbors: function getNeighbors() {
                /* Check how many neighbors are alive for this cell */
                var neighbors = 0,
                    position = cell.row * game.numberOfColumns + cell.column,
                    top = game.cells[position - game.numberOfColumns],
                    topRight = game.cells[position - (game.numberOfColumns - 1)],
                    topLeft = game.cells[position - (game.numberOfColumns + 1)],
                    right = game.cells[position + 1],
                    left = game.cells[position - 1],
                    bottom = game.cells[position + game.numberOfColumns],
                    bottomRight = game.cells[position + (game.numberOfColumns + 1)],
                    bottomLeft = game.cells[position + (game.numberOfColumns - 1)];

                if (typeof top !== 'undefined' && top.alive) neighbors++;
                if (typeof topLeft !== 'undefined' && topLeft.alive) neighbors++;
                if (typeof topRight !== 'undefined' && topRight.alive) neighbors++;
                if (typeof right !== 'undefined' && right.alive) neighbors++;
                if (typeof left !== 'undefined' && left.alive) neighbors++;
                if (typeof bottom !== 'undefined' && bottom.alive) neighbors++;
                if (typeof bottomRight !== 'undefined' && bottomRight.alive) neighbors++;
                if (typeof bottomLeft !== 'undefined' && bottomLeft.alive) neighbors++;

                return neighbors;
            },
            getCellColor: function getColor() {
                /* Get the cell color depending of cell state */

                var cell = this;

                if (cell.alive && !cell.willBeAlive) return '#b6542c';
                // Dying cell
                else if (cell.alive && cell.getNeighbors() === 3) return '#006040';
                // Popular cell
                else if (cell.alive) return '#008000';
                // Alive
                else if (!cell.alive && cell.willBeAlive) return '#0057aa';
                // New cell
                else return false; // Dead, do not paint
            }
        };

        return cell;
    },
    createCells: function createCells() {
        /* Will create all cells. It will add them to an array, and keep track
           of imaginary rows and columns too keep track of neighbors  */

        var cells = [];

        for (var rowId = 0; rowId < game.numberOfRows; rowId++) {
            for (var columnId = 0; columnId < game.numberOfColumns; columnId++) {
                // Check if it's initially dead or alive
                var alive = Math.random() < game.percentageAlive / 100;

                // Create the cell and add it to an array
                var cell = game.createCell(rowId, columnId, alive);
                cells.push(cell);
            }
        }

        // Change cell count in statistics
        Statistics.changeCellsCount(cells.length);

        return cells;
    },
    predictCellStates: function predictCellStates() {
        /*  Only predict the changes, so we can mark cells as new or dying without
            actually killing or creating something new. If we would kill cells every run
            the surrounding cells would response to this death directly, the game needs the
            all cells to change in response to the last cell move */

        var livingCells = 0;

        // Keep track of how long this execution takes
        var performanceStart = performance.now();

        game.cells.forEach(cell => {
            // Get the number of neighbors for each cell
            var neighbors = cell.getNeighbors();

            if (cell.alive) {
                // Only survive if it got 2-3 neighbors
                cell.willBeAlive = neighbors === 2 || neighbors === 3;
                livingCells++;
            } else {
                // Create new cell if 3 neighbors
                cell.willBeAlive = neighbors === 3;
            }
        });

        // Add performance and living cell count to statistics
        Statistics.changeLivingCellsCount(livingCells);
        Statistics.changeLifeCalcSpeed(performance.now() - performanceStart);
    },
    changeCellStates: function changeCellStates() {
        /* Will execute the cell states depending of what predictCellStates() said */

        game.cells.forEach(cell => {
            cell.alive = cell.willBeAlive;
        });
    },
    canvas: Canvas,
    controls: Controls,
    statistics: Statistics
};

(function gameOfLife() {
    'use strict';

    // Let's roll
    game.init();
})();
