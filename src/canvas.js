// @flow

import { cellSize, cells } from './life';
import { changePaintSpeed } from './statistics';

export var numberOfRows: number = 0;
export var numberOfColumns: number = 0;
var width = 0;
var height = 0;
var contextElement: any = null;
var context: any = null;

export const initCanvas: function = function initCanvas() {
    contextElement = document.getElementById('game-canvas');
    context = contextElement.getContext('2d');

    width = Math.floor(window.innerWidth * 0.95);
    height = Math.floor(window.innerHeight * 0.8);

    context.canvas.width = width;
    context.canvas.height = height;

    numberOfRows = Math.floor(height / cellSize);
    numberOfColumns = Math.floor(width / cellSize);
}

export const paint: function = function paintCanvas() {
        /* Will paint each generation to the canvas */

        // Keep track of performance
        var performanceStart = performance.now();

        // Clear all cells so we won't have to paint out dead cells (performance hog)
        if (context !== undefined) {
            context.clearRect(0, 0, width, height);
        }
       
        cells.forEach(cell => {
            // Get the X and Y position from the cell position and size
            var posX = Math.floor(cell.column * cellSize) + 1,
                posY = Math.floor(cell.row * cellSize) + 1;

            // Get the cell color depending on cell state
            var cellColor = cell.getCellColor();

            if (cellColor) {
                // Do not paint if dead cell
                context.beginPath();
                // Leave a pixel to create a border (actual borders on rectangle did slow it down for some reason)
                context.rect(posX, posY, cellSize - 1, cellSize - 1);
                context.fillStyle = cellColor;
                context.fill();
            }
        });

        // Write the paint speed to the statistics
        changePaintSpeed(performance.now() - performanceStart);
    };

type CanvasType = {
    init: Function,
    height: number,
    width: number,
    context: any,
    paint: Function
};
