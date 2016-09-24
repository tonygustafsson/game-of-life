(function gameOfLife() {
    "use strict";

    var game = {
        cellSize: 6,
        cells: [],
        numberOfRows: null,
        numberOfColumns: null,
        percentageAlive: 15,
        gameTickSpeed: 35,
        predictionMode: false,
        init: function init() {
            game.numberOfRows = Math.floor(game.canvas.height / game.cellSize);
            game.numberOfColumns = Math.floor(game.canvas.width / game.cellSize);
            game.cells = game.createCells();

            console.log('Created ' + game.cells.length + ' cells on ' + game.numberOfRows + ' rows and ' + game.numberOfColumns + ' columns');

            game.canvas.init();

            game.runLife();
        },
        runLife: function runLife() {
            var performanceStart = performance.now();

            if (game.predictionMode) {
                game.checkForFutureLife();
            }
            else {
                game.checkForLife();
            }

            var performanceAfterLife = performance.now();

            game.canvas.paint();

            var performanceAfterPaint = performance.now();

            var lifeChangeString = game.predictionMode ? "Predict life took: " : "Change life took: ";
            console.log(lifeChangeString + Math.floor(performanceAfterLife - performanceStart) + ' ms');
            console.log('Paint took: ' + Math.floor(performanceAfterPaint - performanceAfterLife) + ' ms');

            game.predictionMode = !game.predictionMode;
            setTimeout(game.runLife, game.gameTickSpeed);
        },
        createCell: function createCell(rowId, columnId, alive) {
            var cell = {
                row: rowId,
                column: columnId,
                alive: alive,
                willBeAlive: alive,
                getNeighbors: function getNeighbors() {
                    var neighbors = 0,
                        position = (cell.row * game.numberOfColumns) + cell.column,
                        top = game.cells[position - game.numberOfColumns],
                        topRight = game.cells[position - (game.numberOfColumns - 1)],
                        topLeft = game.cells[position - (game.numberOfColumns + 1)],
                        right = game.cells[position + 1],
                        left = game.cells[position - 1],
                        bottom = game.cells[position + game.numberOfColumns],
                        bottomRight = game.cells[position + (game.numberOfColumns - 1)],
                        bottomLeft = game.cells[position + (game.numberOfColumns + 1)];

                    if (typeof top !== "undefined" && top.alive) neighbors++;
                    if (typeof topLeft !== "undefined" && topLeft.alive) neighbors++;
                    if (typeof topRight !== "undefined" && topRight.alive) neighbors++;
                    if (typeof right !== "undefined" && right.alive) neighbors++;
                    if (typeof left !== "undefined" && left.alive) neighbors++;
                    if (typeof bottom !== "undefined" && bottom.alive) neighbors++;
                    if (typeof bottomRight !== "undefined" && bottomRight.alive) neighbors++;
                    if (typeof bottomLeft !== "undefined" && bottomLeft.alive) neighbors++;

                    return neighbors;
                },
                getPaintSettings: function getColor() {
                    var cell = this;

                    if (cell.alive && !cell.willBeAlive) {
                        // Dying
                        return {
                            color: "rgb(182,84,44)"
                        };
                    }
                    else if (!cell.alive && cell.willBeAlive) {
                        // New cell
                        return {
                            color: "rgb(0,171,133)"
                        };
                    }
                    else if (!cell.alive) {
                        return false;
                    }
                    else if (cell.getNeighbors() === 3) {
                        return {
                            color: "#006040"
                        };
                    }
                    else {
                        return {
                            color: "green"
                        };
                    }
                }
            };

            return cell;
        },
        createCells: function createCells() {
            var cells = [];

            for (var rowId = 0; rowId < game.numberOfRows; rowId = rowId + 1) {
                for (var columnId = 0; columnId < game.numberOfColumns; columnId = columnId + 1) {
                    var alive = Math.random() < (game.percentageAlive / 100);

                    var cell = game.createCell(rowId, columnId, alive);
                    cells.push(cell);
                }
            }

            return cells;
        },
        checkForFutureLife: function checkForFutureLife() {
            for (var cellId in game.cells) {
                if (!game.cells.hasOwnProperty(cellId)) {
                    continue;
                }

                var cell = game.cells[cellId];

                cell.willBeAlive = cell.getNeighbors() === 2 || cell.getNeighbors() === 3;

                if (cell.alive) {
                    // Only survive if it got 2-3 neighbors
                    cell.willBeAlive = cell.getNeighbors() === 2 || cell.getNeighbors() === 3;
                }
                else {
                    // Start life if 3 neighbors
                    cell.willBeAlive = cell.getNeighbors() === 3;
                }
            }
        },
        checkForLife: function checkForLife() {
            for (var cellId in game.cells) {
                if (!game.cells.hasOwnProperty(cellId)) {
                    continue;
                }

                var cell = game.cells[cellId];

                cell.alive = cell.willBeAlive;
            }
        },
        canvas: {
            context: document.getElementById('game-canvas').getContext("2d"),
            width: Math.floor(window.innerWidth * 0.95),
            height: Math.floor(window.innerHeight * 0.8),
            init: function initCanvas() {
                var canvas = this;

                game.canvas.context.canvas.width  = canvas.width;
                game.canvas.context.canvas.height = canvas.height;
            },
            paint: function paintCanvas() {
                var canvas = this;

                // Clear all cells
                canvas.context.clearRect(0, 0, canvas.width, canvas.height);

                for (var cellId in game.cells) {
                    if (!game.cells.hasOwnProperty(cellId)) {
                        continue;
                    }

                    var cell = game.cells[cellId],
                        posX = Math.floor(cell.column * game.cellSize) + 1,
                        posY = Math.floor(cell.row * game.cellSize) + 1;

                    var paintSettings = cell.getPaintSettings();

                    if (paintSettings) {
                        // Do not paint if dead cell
                        canvas.context.beginPath();
                        canvas.context.rect(posX, posY, game.cellSize - 1, game.cellSize - 1);
                        canvas.context.fillStyle = paintSettings.color;
                        canvas.context.fill();
                    }
                }
            }
        }
    };

    game.init();
})();