// @flow

import { cells, giveLifeToCell } from './life';

const contextElementId: string = 'game-canvas';
const canvasWidthPercentage: number = 0.95;
const canvasHeightPercentage: number = 0.8;
const red: string = '#b6542c';
const darkgreen: string = '#006040';
const green: string = '#008000';
const blue: string = '#0057aa';

export let numberOfRows: number = 0;
export let numberOfColumns: number = 0;
export let cellSize: number = 6;
let width: number = 0;
let height: number = 0;
let contextElement: ?HTMLElement = null;
let context: any = null;

export const initCanvas = () => {
    contextElement = document.getElementById(contextElementId);
    if (contextElement instanceof HTMLCanvasElement)
        context = contextElement.getContext('2d', {
            alpha: true,
        });

    width = Math.floor(window.innerWidth * canvasWidthPercentage);
    height = Math.floor(window.innerHeight * canvasHeightPercentage);

    context.canvas.width = width;
    context.canvas.height = height;

    numberOfRows = Math.floor(height / cellSize);
    numberOfColumns = Math.floor(width / cellSize);
};

export const changeCellSize = (newCellSize: number) => {
    cellSize = newCellSize;
};

export const paint = (): number => {
    /* Will paint each generation to the canvas */

    // Keep track of performance
    let performanceStart = performance.now();

    // Clear all cells so we won't have to paint out dead cells (performance hog)
    if (context !== undefined) {
        context.clearRect(0, 0, width, height);
    }

    cells.forEach((cell) => {
        let borderWidth = cellSize < 4 ? 0 : 1;

        // Get the X and Y position from the cell position and size
        let posX = Math.floor(cell.column * cellSize) + borderWidth,
            posY = Math.floor(cell.row * cellSize) + borderWidth;

        // Get the cell color depending on cell state
        let cellColor = getCellColor(cell);

        if (cellColor) {
            // Do not paint if dead cell

            // Leave a pixel to create a border (actual borders on rectangle did slow it down for some reason)
            context.fillStyle = cellColor;
            context.fillRect(posX, posY, cellSize - borderWidth, cellSize - borderWidth);
        }
    });

    return performance.now() - performanceStart;
};

export const giveLifeToCellByCoordinates = (x: number, y: number) => {
    /* Give life when drawing on canvas, get cellId by coordinates */
    let row = Math.floor(y / cellSize),
        column = Math.floor(x / cellSize),
        cellsBeforeLastRow = (row + 1) * numberOfColumns,
        cellId = cellsBeforeLastRow - numberOfColumns * 2 + column - 1;

    giveLifeToCell(cellId);
};

const getCellColor = (cell) => {
    /* Get the cell color depending of cell state */

    // Dying cell
    if (cell.alive && !cell.willBeAlive) return red;
    // Popular cell
    else if (cell.alive && cell.neighbors === 3) return darkgreen;
    // Alive
    else if (cell.alive) return green;
    // New cell
    else if (!cell.alive && cell.willBeAlive) return blue;
    // Dead, do not paint
    else return false;
};
