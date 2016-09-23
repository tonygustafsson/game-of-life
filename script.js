(function gameOfLife() {
    "use strict";

    var gameCanvas = document.getElementById('game-canvas'),
        ctx = gameCanvas.getContext("2d"),
        canvasWidth = Math.floor(window.innerWidth * 0.95),
        canvasHeight = Math.floor(window.innerHeight * 0.8),
        cellSize = 10,
        cells = [],
        numberOfRows = Math.floor(canvasHeight / cellSize),
        numberOfColumns = Math.floor(canvasWidth / cellSize),
        percentageAlive = 8,
        gameTickSpeed = 10,
        predictionMode = false;

    function setCanvasSize() {
        ctx.canvas.width  = canvasWidth;
        ctx.canvas.height = canvasHeight;
    }

    function isNeighborAlive(cell) {
        if (typeof cell === "undefined") return false;

        return cell.alive;
    }

    function getLivingNeighbors(cell) {
        if (typeof cell === "undefined") return 0;

        var row = cell.row,
            column = cell.column,
            neighbors = 0,
            top = cells['row-' + (row + 1) + '-column-' + column],
            topRight = cells['row-' + (row + 1) + '-column-' + (column + 1)],
            topLeft = cells['row-' + (row + 1) + '-column-' + (column - 1)],
            right = cells['row-' + row + '-column-' + (column + 1)],
            left = cells['row-' + row + '-column-' + (column - 1)],
            bottom = cells['row-' + (row - 1) + '-column-' + column],
            bottomRight = cells['row-' + (row - 1) + '-column-' + (column + 1)],
            bottomLeft = cells['row-' + (row - 1) + '-column-' + (column - 1)];

        if (isNeighborAlive(top)) neighbors++;
        if (isNeighborAlive(topLeft)) neighbors++;
        if (isNeighborAlive(topRight)) neighbors++;
        if (isNeighborAlive(right)) neighbors++;
        if (isNeighborAlive(left)) neighbors++;
        if (isNeighborAlive(bottom)) neighbors++;
        if (isNeighborAlive(bottomRight)) neighbors++;
        if (isNeighborAlive(bottomLeft)) neighbors++;

        return neighbors;
    }

    function createCells() {
        var numberOfCells = 0;

        for (var rowId = 0; rowId < numberOfRows; rowId = rowId + 1) {
            for (var columnId = 0; columnId < numberOfColumns; columnId = columnId + 1) {
                var alive = Math.random() < (percentageAlive / 100),
                    id = "row-" + rowId + "-column-" + columnId;

                var cell = {
                    'id': id,
                    'row': rowId,
                    'column': columnId,
                    'alive': alive,
                    'willBeAlive': alive
                };

                cells[cell.id] = cell;
                numberOfCells++;
            }
        }

        console.log('Created ' + numberOfCells + ' cells.');
    }

    function getCellColor(cell) {
        if (cell.alive && !cell.willBeAlive) {
            // Dying
            return "#b7542c";
        }
        else if (!cell.alive && cell.willBeAlive) {
            // New cell
            return "#00ab71";
        }
        else if (!cell.alive) {
            return "#000";
        }
        else if (cell.neighbors === 3) {
            return "#006040";
        }
        else {
            return "green";
        }
    }

    function checkForFutureLife() {
        var cellId, cell;

        for (cellId in cells) {
            if (!cells.hasOwnProperty(cellId)) {
                continue;
            }

            cell = cells[cellId];

            cell.neighbors = getLivingNeighbors(cell);
            cell.willBeAlive = cell.neighbors === 2 || cell.neighbors === 3;

            if (cell.alive) {
                // Only survive if it got 2-3 neighbors
                cell.willBeAlive = cell.neighbors === 2 || cell.neighbors === 3;
            }
            else {
                // Start life if 3 neighbors
                cell.willBeAlive = cell.neighbors === 3;
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

    function paintCanvas() {
        ctx.strokeStyle = '#001100';

        for (var cellId in cells) {
            if (!cells.hasOwnProperty(cellId)) {
                continue;
            }

            var cell = cells[cellId],
                posX = Math.floor(cell.column * cellSize),
                posY = Math.floor(cell.row * cellSize);

            ctx.beginPath();
            ctx.rect(posX, posY, cellSize, cellSize);
            ctx.stroke();
            ctx.fillStyle = getCellColor(cell);
            ctx.fill();
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

        paintCanvas();

        var performanceAfterPaint = performance.now();

        var lifeChangeString = predictionMode ? "Predict life took: " : "Change life took: ";
        console.log(lifeChangeString + Math.floor(performanceAfterLife - performanceStart) + ' ms');
        console.log('Paint took: ' + Math.floor(performanceAfterPaint - performanceAfterLife) + ' ms');

        predictionMode = !predictionMode;
        setTimeout(startLife, gameTickSpeed);
    }

    setCanvasSize();
    createCells();
    startLife();
})();