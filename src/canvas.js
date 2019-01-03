// @flow

export const Canvas: CanvasType = {
    context: undefined,
    width: Math.floor(window.innerWidth * 0.95),
    height: Math.floor(window.innerHeight * 0.8),
    cells: [],
    cellSize: 0,
    statistics: {},
    init: function initCanvas(cells, statistics, cellSize) {
        this.cells = cells;
        this.statistics = statistics;
        this.cellSize = cellSize;

        /* Initialize the canvas, set the width and height */
        var contextElement: any = document.getElementById('game-canvas');
        this.context = contextElement.getContext('2d');

        var canvas = this;

        this.context.canvas.width = canvas.width;
        this.context.canvas.height = canvas.height;
    },
    paint: function paintCanvas() {
        /* Will paint each generation to the canvas */

        var canvas = this;

        // Keep track of performance
        var performanceStart = performance.now();

        // Clear all cells so we won't have to paint out dead cells (performance hog)
        if (canvas.context !== undefined) {
            canvas.context.clearRect(0, 0, canvas.width, canvas.height);
        }

        this.cells.forEach(cell => {
            // Get the X and Y position from the cell position and size
            var posX = Math.floor(cell.column * this.cellSize) + 1,
                posY = Math.floor(cell.row * this.cellSize) + 1;

            // Get the cell color depending on cell state
            var cellColor = cell.getCellColor();

            if (cellColor) {
                // Do not paint if dead cell
                canvas.context.beginPath();
                // Leave a pixel to create a border (actual borders on rectangle did slow it down for some reason)
                canvas.context.rect(posX, posY, this.cellSize - 1, this.cellSize - 1);
                canvas.context.fillStyle = cellColor;
                canvas.context.fill();
            }
        });

        // Write the paint speed to the statistics
        this.statistics.changePaintSpeed(performance.now() - performanceStart);
    }
};

type CanvasType = {
    init: Function,
    height: number,
    width: number,
    context: any,
    paint: Function
};
