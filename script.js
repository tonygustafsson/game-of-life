(function video() {
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
        gameTickSpeed = 10;

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
        for (var rowId = 0; rowId < numberOfRows; rowId = rowId + 1) {
            for (var columnId = 0; columnId < numberOfColumns; columnId = columnId + 1) {
                var alive = Math.random() < (percentageAlive / 100),
                    id = "row-" + rowId + "-column-" + columnId;

                var cell = {
                    'id': id,
                    'row': rowId,
                    'column': columnId,
                    'alive': alive
                };

                cells[cell.id] = cell;
            }
        }
    }

    function setCanvasSize() {
        ctx.canvas.width  = canvasWidth;
        ctx.canvas.height = canvasHeight;
    }

    function getCellColor(cell) {
        if (!cell.alive) {
            return "#000";
        }
        else if (cell.neighbors === 3) {
            return "#006040";
        }
        else {
            return "green";
        }
    }

    function checkForLife() {
        // First loop checks which cells will be alive
        // Cannot change state at the same time because surrounding cells will be changed before
        var cellId,
            cell;
        
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

        for (cellId in cells) {
            if (!cells.hasOwnProperty(cellId)) {
                continue;
            }

            cell = cells[cellId];

            cell.alive = cell.willBeAlive;
        }
    }

    function paintCanvas() {
        for (var cellId in cells) {
            if (!cells.hasOwnProperty(cellId)) {
                continue;
            }

            var cell = cells[cellId],
                posX = Math.floor(cell.column * cellSize),
                posY = Math.floor(cell.row * cellSize);

            ctx.beginPath();
            ctx.arc(posX, posY, cellSize / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = getCellColor(cell);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#001100';
            ctx.stroke();
        }
    }

    function startTime() {
        checkForLife();
        paintCanvas();

        setTimeout(startTime, gameTickSpeed);
    }

    setCanvasSize();
    createCells();
    startTime();
})();