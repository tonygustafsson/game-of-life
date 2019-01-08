// @flow

import { cells } from './life';

const contextElementId: string = 'game-canvas';

export let numberOfRows: number = 0;
export let numberOfColumns: number = 0;
export let cellSize: number = 6;
let width: number = 0;
let height: number = 0;
let contextElement: ?HTMLElement = null;
let context: any = null;

export const initCanvas = () => {
    contextElement = document.getElementById(contextElementId);
    if (contextElement instanceof HTMLCanvasElement) context = contextElement.getContext('2d');

    width = Math.floor(window.innerWidth * 0.95);
    height = Math.floor(window.innerHeight * 0.8);

    context.canvas.width = width;
    context.canvas.height = height;

    numberOfRows = Math.floor(height / cellSize);
    numberOfColumns = Math.floor(width / cellSize);
};

export const changeCellSize = (newCellSize: number) => {
    cellSize = newCellSize;
};

export const paint = () => {
    /* Will paint each generation to the canvas */

    // Keep track of performance
    let performanceStart = performance.now();

    // Clear all cells so we won't have to paint out dead cells (performance hog)
    if (context !== undefined) {
        context.clearRect(0, 0, width, height);
    }

    cells.forEach(cell => {
        // Get the X and Y position from the cell position and size
        let posX = Math.floor(cell.column * cellSize) + 1,
            posY = Math.floor(cell.row * cellSize) + 1;

        // Get the cell color depending on cell state
        let cellColor = cell.getCellColor();

        if (cellColor) {
            // Do not paint if dead cell
            context.beginPath();
            // Leave a pixel to create a border (actual borders on rectangle did slow it down for some reason)
            context.rect(posX, posY, cellSize - 1, cellSize - 1);
            context.fillStyle = cellColor;
            context.fill();
        }
    });

    return performance.now() - performanceStart;
};
