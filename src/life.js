// @flow

import { paint, numberOfColumns, numberOfRows } from './canvas';
import { changeCellsCount, changeLifeCalcSpeed, changeLivingCellsCount } from './statistics';

type CellType = {
    row: number,
    column: number,
    alive: boolean,
    willBeAlive: boolean,
    getNeighbors: Function,
    getCellColor: Function
};

export var cellSize: number = 6;
var predictionMode: boolean = false;
export var generation: number = 0;
export var cells: Array<CellType> = [];
var percentageAlive: number = 15;

const createCell = function createCell(rowId: number, columnId: number, alive: boolean) {
    /* Will create a specific cell which will end up in an array */

    var cell = {
        row: rowId,
        column: columnId,
        alive: alive,
        willBeAlive: alive,
        getNeighbors: function getNeighbors() {
            /* Check how many neighbors are alive for this cell */
            var neighbors = 0,
                position = cell.row * numberOfColumns + cell.column,
                top = cells[position - numberOfColumns],
                topRight = cells[position - (numberOfColumns - 1)],
                topLeft = cells[position - (numberOfColumns + 1)],
                right = cells[position + 1],
                left = cells[position - 1],
                bottom = cells[position + numberOfColumns],
                bottomRight = cells[position + (numberOfColumns + 1)],
                bottomLeft = cells[position + (numberOfColumns - 1)];

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
};

const createCells = function createCells() {
    /* Will create all cells. It will add them to an array, and keep track
           of imaginary rows and columns too keep track of neighbors  */

    for (var rowId = 0; rowId < numberOfRows; rowId++) {
        for (var columnId = 0; columnId < numberOfColumns; columnId++) {
            // Check if it's initially dead or alive
            var alive = Math.random() < percentageAlive / 100;

            // Create the cell and add it to an array
            var cell = createCell(rowId, columnId, alive);
            cells.push(cell);
        }
    }
};

export const evolve = function evolve() {
    /* Calculates which cells will be alive or dead */

    if (predictionMode) {
        // Only predict the changes, so we can mark cells as new or dying
        predictCellStates();
    } else {
        // Actually move cells in memory
        changeCellStates();
    }

    // Every other evolution, it will first predict, then make cell changes
    predictionMode = !predictionMode;

    // Write to statistics which generation we are on now
    generation++;

    paint();

    // Change cell count in statistics
    changeCellsCount(cells.length);
};

const predictCellStates = function predictCellStates() {
    /*  Only predict the changes, so we can mark cells as new or dying without
            actually killing or creating something new. If we would kill cells every run
            the surrounding cells would response to this death directly, the game needs the
            all cells to change in response to the last cell move */

    var livingCells = 0;

    // Keep track of how long this execution takes
    var performanceStart = performance.now();

    cells.forEach(cell => {
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
    changeLivingCellsCount(livingCells);
    changeLifeCalcSpeed(performance.now() - performanceStart);
};

const changeCellStates = function changeCellStates() {
    /* Will execute the cell states depending of what predictCellStates() said */

    cells.forEach(cell => {
        cell.alive = cell.willBeAlive;
    });
};

export const initLife = function initLife() {
    generation = 0;
    createCells();
};
