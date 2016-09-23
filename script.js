(function gameOfLife() {
    "use strict";

    var canvas = {
        context: document.getElementById('game-canvas').getContext("2d"),
        width: Math.floor(window.innerWidth * 0.95),
        height: Math.floor(window.innerHeight * 0.8),
        init: function initCanvas() {
            this.context.canvas.width  = this.width;
            this.context.canvas.height = this.height;
        },
        paint: function paintCanvas() {
            for (var cellId in cells) {
                if (!cells.hasOwnProperty(cellId)) {
                    continue;
                }

                var cell = cells[cellId],
                    posX = Math.floor(cell.column * cellSize) - 1,
                    posY = Math.floor(cell.row * cellSize) - 1;

                this.context.beginPath();
                this.context.rect(posX, posY, cellSize - 1, cellSize - 1);
                this.context.fillStyle = cell.getColor();
                this.context.fill();
            }
        }
    };

    var cellSize = 10,
        cells = [],
        numberOfRows = Math.floor(canvas.height / cellSize),
        numberOfColumns = Math.floor(canvas.width / cellSize),
        percentageAlive = 8,
        gameTickSpeed = 10,
        predictionMode = false;

    function createCells() {
        for (var rowId = 0; rowId < numberOfRows; rowId = rowId + 1) {
            for (var columnId = 0; columnId < numberOfColumns; columnId = columnId + 1) {
                var alive = Math.random() < (percentageAlive / 100);

                var cell = {
                    'row': rowId,
                    'column': columnId,
                    'alive': alive,
                    'willBeAlive': alive,
                    'getNeighbors': function getNeighbors() {
                        var neighbors = 0,
                            position = (this.row * numberOfColumns) + this.column,
                            top = cells[position - numberOfColumns],
                            topRight = cells[position - (numberOfColumns - 1)],
                            topLeft = cells[position - (numberOfColumns + 1)],
                            right = cells[position + 1],
                            left = cells[position - 1],
                            bottom = cells[position + numberOfColumns],
                            bottomRight = cells[position + (numberOfColumns - 1)],
                            bottomLeft = cells[position + (numberOfColumns + 1)];

                        function isNeighborAlive(cell) {
                            if (typeof cell === "undefined") return false;

                            return cell.alive;
                        }

                        if (isNeighborAlive(top)) neighbors++;
                        if (isNeighborAlive(topLeft)) neighbors++;
                        if (isNeighborAlive(topRight)) neighbors++;
                        if (isNeighborAlive(right)) neighbors++;
                        if (isNeighborAlive(left)) neighbors++;
                        if (isNeighborAlive(bottom)) neighbors++;
                        if (isNeighborAlive(bottomRight)) neighbors++;
                        if (isNeighborAlive(bottomLeft)) neighbors++;

                        return neighbors;
                    },
                    'getColor': function getColor() {
                        if (this.alive && !this.willBeAlive) {
                            // Dying
                            return "#b7542c";
                        }
                        else if (!this.alive && this.willBeAlive) {
                            // New cell
                            return "#00ab71";
                        }
                        else if (!this.alive) {
                            return "#000";
                        }
                        else if (this.getNeighbors() === 3) {
                            return "#006040";
                        }
                        else {
                            return "green";
                        }
                    }
                };

                cells.push(cell);
            }
        }

        console.log('Created ' + cells.length + ' cells.');
    }

    function checkForFutureLife() {
        var cellId, cell;

        for (cellId in cells) {
            if (!cells.hasOwnProperty(cellId)) {
                continue;
            }

            cell = cells[cellId];

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
    }

    function checkForLife() {
        var cellId, cell;

        for (cellId in cells) {
            if (!cells.hasOwnProperty(cellId)) {
                continue;
            }

            cell = cells[cellId];

            cell.alive = cell.willBeAlive;
        }
    }

    function startLife() {
        var performanceStart = performance.now();

        if (predictionMode) {
            checkForFutureLife();
        }
        else {
            checkForLife();
        }

        var performanceAfterLife = performance.now();

        canvas.paint();

        var performanceAfterPaint = performance.now();

        var lifeChangeString = predictionMode ? "Predict life took: " : "Change life took: ";
        console.log(lifeChangeString + Math.floor(performanceAfterLife - performanceStart) + ' ms');
        console.log('Paint took: ' + Math.floor(performanceAfterPaint - performanceAfterLife) + ' ms');

        predictionMode = !predictionMode;
        setTimeout(startLife, gameTickSpeed);
    }

    canvas.init();
    createCells();
    startLife();
})();