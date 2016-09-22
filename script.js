(function video() {
    "use strict";

    var gameCanvas = document.getElementById('game-canvas'),
        ctx = gameCanvas.getContext("2d"),
        canvasWidth = Math.floor(window.innerWidth * 0.8),
        canvasHeight = Math.floor(window.innerHeight * 0.8),
        cellSize = 10,
        cells = [],
        numberOfRows = Math.floor(canvasHeight / cellSize),
        numberOfColumns = Math.floor(canvasWidth / cellSize),
        percentageAlive = 5,
        gameTickSpeed = 2500,
        iterations = 20;

    function checkForLife(cell) {
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

        if (checkForLife(top)) neighbors++;
        if (checkForLife(topLeft)) neighbors++;
        if (checkForLife(topRight)) neighbors++;
        if (checkForLife(right)) neighbors++;
        if (checkForLife(left)) neighbors++;
        if (checkForLife(bottom)) neighbors++;
        if (checkForLife(bottomRight)) neighbors++;
        if (checkForLife(bottomLeft)) neighbors++;

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
                    'iteration': 0,
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

    function createMoment() {
        for (var cellId in cells) {
            var cell = cells[cellId];

            cell.neighbors = getLivingNeighbors(cell);
            cell.alive = cell.neighbors === 2 || cell.neighbors === 3;
        }
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

    function paintCanvas() {
        for (var cellId in cells) {
            var cell = cells[cellId],
                posX = Math.floor(cell.column * cellSize),
                posY = Math.floor(cell.row * cellSize);

            ctx.beginPath();
            ctx.rect(posX, posY, cellSize, cellSize);
            ctx.fillStyle = getCellColor(cell);
            ctx.fill();
        }
    }

    function startTime() {
        createMoment();
        paintCanvas();

        setTimeout(startTime, gameTickSpeed);
    }

    document.getElementById('manual-tick').addEventListener('click', function () {
        createMoment();
        paintCanvas();
    });

    setCanvasSize();
    createCells();
    //startTime();
    paintCanvas();
})();