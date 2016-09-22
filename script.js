(function video() {
    "use strict";
    
    var gameBoard = document.getElementById('game-board'),
        numberOfRows = 60,
        numberOfColumns = 100,
        percentageAlive = 10,
        gameTickSpeed = 500,
        iterations = 20;

    function checkForLife(cell) {
        var alive = cell !== null && typeof cell.getAttribute("data-alive") !== "undefined" && cell.getAttribute("data-alive") === "true";

        return alive;
    }

    function checkNumberOfLivingNeighbors(cell) {
        if (typeof cell === "undefined") return 0;

        var row = parseInt(cell.getAttribute('data-row'), 10),
            column = parseInt(cell.getAttribute('data-column'), 10),
            numberOfLivingNeighbors = 0,
            top = document.getElementById('row-' + (row + 1) + '-column-' + column),
            topRight = document.getElementById('row-' + (row + 1) + '-column-' + (column + 1)),
            topLeft = document.getElementById('row-' + (row + 1) + '-column-' + (column - 1)),
            right = document.getElementById('row-' + row + '-column-' + (column + 1)),
            left = document.getElementById('row-' + row + '-column-' + (column - 1)),
            bottom = document.getElementById('row-' + (row - 1) + '-column-' + column),
            bottomRight = document.getElementById('row-' + (row - 1) + '-column-' + (column + 1)),
            bottomLeft = document.getElementById('row-' + (row - 1) + '-column-' + (column - 1));

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
        var iteration = parseInt(cell.getAttribute("data-iteration"), 10);

        if (iteration > iterations) return;

        var numberOfLivingNeighbors = checkNumberOfLivingNeighbors(cell);

        cell.setAttribute('data-iteration', iteration + 1);

        if (numberOfLivingNeighbors < 2) {
            // Dies of lonelyness
            cell.classList.remove("alive");
            cell.setAttribute("data-alive", false);
        }
        else if (numberOfLivingNeighbors > 3) {
            // Dies of overpopulation
            cell.classList.remove("alive");
            cell.setAttribute("data-alive", false);
        }
        else {
            cell.classList.add("alive");
            cell.setAttribute("data-alive", true);
        }

        setTimeout(function () {
            startCellLife(cell);   
        }, gameTickSpeed);
    }

    (function createBoard() {
        for (var rowId = 0; rowId < numberOfRows; rowId = rowId + 1) {
            var currentRow = document.createElement("tr");
            currentRow.id = "row-" + rowId;

            for (var columnId = 0; columnId < numberOfColumns; columnId = columnId + 1) {
                var currentColumn = document.createElement("td"),
                    alive = Math.random() < (percentageAlive / 100);

                currentColumn.id = "row-" + rowId + "-column-" + columnId;
                currentColumn.setAttribute('data-row', rowId);
                currentColumn.setAttribute('data-column', columnId);
                currentColumn.setAttribute('data-iteration', 0);

                if (alive) {
                    currentColumn.classList.add("alive");
                    currentColumn.setAttribute("data-alive", true);
                }

                currentRow.appendChild(currentColumn);

                setTimeout(function (thisColumn) {
                    return function () {
                        startCellLife(thisColumn);   
                    }
                }(currentColumn), gameTickSpeed); 
            }

            gameBoard.appendChild(currentRow);
        }
    })();
})();