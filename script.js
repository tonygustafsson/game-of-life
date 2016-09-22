(function video() {
    "use strict";

    var gameBoard = document.getElementById('game-board'),
        cells = [],
        numberOfRows = 60,
        numberOfColumns = 100,
        percentageAlive = 10,
        gameTickSpeed = 500,
        iterations = 20;

    function checkForLife(cell) {
        if (typeof cell === "undefined") return false;

        return cell.alive;
    }

    function checkNumberOfLivingNeighbors(cell) {
        if (typeof cell === "undefined") return 0;

        var row = cell.row,
            column = cell.column,
            numberOfLivingNeighbors = 0,
            top = cells['row-' + (row + 1) + '-column-' + column],
            topRight = cells['row-' + (row + 1) + '-column-' + (column + 1)],
            topLeft = cells['row-' + (row + 1) + '-column-' + (column - 1)],
            right = cells['row-' + row + '-column-' + (column + 1)],
            left = cells['row-' + row + '-column-' + (column - 1)],
            bottom = cells['row-' + (row - 1) + '-column-' + column],
            bottomRight = cells['row-' + (row - 1) + '-column-' + (column + 1)],
            bottomLeft = cells['row-' + (row - 1) + '-column-' + (column - 1)];

        if (checkForLife(top)) numberOfLivingNeighbors++;
        if (checkForLife(topLeft)) numberOfLivingNeighbors++;
        if (checkForLife(topRight)) numberOfLivingNeighbors++;
        if (checkForLife(right)) numberOfLivingNeighbors++;
        if (checkForLife(left)) numberOfLivingNeighbors++;
        if (checkForLife(bottom)) numberOfLivingNeighbors++;
        if (checkForLife(bottomRight)) numberOfLivingNeighbors++;
        if (checkForLife(bottomLeft)) numberOfLivingNeighbors++;

        return numberOfLivingNeighbors;
    }

    function startCellLife(cell) {
        if (cell.iteration > iterations) return;

        var numberOfLivingNeighbors = checkNumberOfLivingNeighbors(cell);

        cell.iteration++;

        if (typeof cell.element === "undefined") {
            cell.element = document.getElementById(cell.id);
        }

        if (numberOfLivingNeighbors < 2) {
            // Dies of lonelyness
            cell.element.classList.remove("alive");
            cell.alive = false;
        }
        else if (numberOfLivingNeighbors > 3) {
            // Dies of overpopulation
            cell.element.classList.remove("alive");
            cell.alive = false;
        }
        else {
            cell.element.classList.add("alive");

            if (numberOfLivingNeighbors === 3) {
                cell.element.classList.add("popular");
            }
            else {
                cell.element.classList.remove("popular");
            }

            cell.alive = true;
        }

        setTimeout(function () {
            startCellLife(cell);
        }, gameTickSpeed + (Math.random() * gameTickSpeed / 2));
    }

    (function createBoard() {
        for (var rowId = 0; rowId < numberOfRows; rowId = rowId + 1) {
            var currentRow = document.createElement("tr");
            currentRow.id = "row-" + rowId;

            for (var columnId = 0; columnId < numberOfColumns; columnId = columnId + 1) {
                var currentColumn = document.createElement("td"),
                    alive = Math.random() < (percentageAlive / 100),
                    id = "row-" + rowId + "-column-" + columnId;

                currentColumn.id = id;

                if (alive) {
                    currentColumn.classList.add("alive");
                }

                currentRow.appendChild(currentColumn);

                var cell = {
                    'id': id,
                    'row': rowId,
                    'column': columnId,
                    'iteration': 0,
                    'alive': alive
                }

                cells[cell.id] = cell;

                setTimeout(function (thisCell) {
                    return function () {
                        startCellLife(thisCell);
                    }
                }(cell), gameTickSpeed + (Math.random() * gameTickSpeed / 2));
            }

            gameBoard.appendChild(currentRow);
        }
    })();
})();