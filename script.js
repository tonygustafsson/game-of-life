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
        iterations: 0,
        lifeTimer: null,
        init: function init() {
            var game = this;

            game.numberOfRows = Math.floor(game.canvas.height / game.cellSize);
            game.numberOfColumns = Math.floor(game.canvas.width / game.cellSize);

            game.controls.init();
            game.statistics.init();
            game.cells = game.createCells();
            game.canvas.init();

            game.runLife();
        },
        createLifeTick: function createLifeTick () {
            if (game.predictionMode) {
                game.predictCellStates();
            }
            else {
                game.changeCellStates();
            }

            game.predictionMode = !game.predictionMode;

            game.canvas.paint();

            game.statistics.changeIterationsCount(game.iterations);
            game.iterations++;
        },
        runLife: function runLife() {
            game.createLifeTick();
            game.lifeTimer = setTimeout(game.runLife, game.gameTickSpeed);
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
                        bottomRight = game.cells[position + (game.numberOfColumns + 1)],
                        bottomLeft = game.cells[position + (game.numberOfColumns - 1)];

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

                    if (cell.alive) {
                        // Living
                        if (!cell.willBeAlive) {
                            // Dying
                            return { color: "rgb(182,84,44)" };
                        }
                        else if (cell.getNeighbors() === 3) {
                            // Popular
                            return { color: "#006040" };
                        }

                        return { color: "green" };
                    }
                    else {
                        // Dead
                        if (cell.willBeAlive) {
                            // New cell
                            return { color: "rgb(0,171,133)" };
                        }

                        return false;
                    }
                }
            };

            return cell;
        },
        createCells: function createCells() {
            var cells = [];

            for (var rowId = 0; rowId < game.numberOfRows; rowId++) {
                for (var columnId = 0; columnId < game.numberOfColumns; columnId++) {
                    var alive = Math.random() < (game.percentageAlive / 100);

                    var cell = game.createCell(rowId, columnId, alive);
                    cells.push(cell);
                }
            }

            game.statistics.changeCellsCount(cells.length);

            return cells;
        },
        predictCellStates: function predictCellStates() {
            var livingCells = 0;

            var performanceStart = performance.now();

            for (var cellId in game.cells) {
                if (!game.cells.hasOwnProperty(cellId)) {
                    continue;
                }

                var cell = game.cells[cellId],
                    neighbors = cell.getNeighbors();

                if (cell.alive) {
                    // Only survive if it got 2-3 neighbors
                    cell.willBeAlive = neighbors === 2 || neighbors === 3;
                    livingCells++;
                }
                else {
                    // Start life if 3 neighbors
                    cell.willBeAlive = neighbors === 3;
                }
            }

            game.statistics.changeLivingCellsCount(livingCells);
            game.statistics.changeLifeCalcSpeed(performance.now() - performanceStart);
        },
        changeCellStates: function changeCellStates() {
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

                var performanceStart = performance.now();

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

                game.statistics.changePaintSpeed(performance.now() - performanceStart);
            }
        },
        controls: {
            init: function init () {
                var controls = this;

                document.getElementById('toggleLife').addEventListener('click', controls.toggleLife);
                document.getElementById('nextLifeTick').addEventListener('click', controls.nextLifeTick);
                document.getElementById('gameTickSpeedSelector').addEventListener('change', controls.changeTickSpeed);
                document.getElementById('gameCellSizeSelector').addEventListener('change', controls.changeCellSize);
                document.getElementById('gamePercentageAliveSelector').addEventListener('change', controls.changePercentageAlive);
            },
            start: function start () {
                game.runLife();

                document.getElementById('toggleLife').innerText = "Pause";
            },
            pause: function pause () {
                clearTimeout(game.lifeTimer);
                game.lifeTimer = null;

                document.getElementById('toggleLife').innerText = "Start";
            },
            toggleLife: function toggleLife () {
                if (game.lifeTimer === null) {
                    game.controls.start();
                }
                else {
                    game.controls.pause();
                }
            },
            nextLifeTick: function nextLifeTick () {
                game.controls.pause();

                game.createLifeTick();
            },
            changeTickSpeed: function changeTickSpeed () {
                var gameTickSpeedSelector = this,
                    tickSpeed = parseInt(gameTickSpeedSelector.options[gameTickSpeedSelector.selectedIndex].value, 10);

                game.gameTickSpeed = tickSpeed;
            },
            changeCellSize: function changeCellSize () {
                var gameCellSizeSelector = this,
                    cellSize = parseInt(gameCellSizeSelector.options[gameCellSizeSelector.selectedIndex].value, 10);

                game.cellSize = cellSize;
                game.init();
            },
            changePercentageAlive: function changePercentageAlive () {
                var gamePercentageAliveSelector = this,
                    percentageAlive = parseInt(gamePercentageAliveSelector.options[gamePercentageAliveSelector.selectedIndex].value, 10);

                game.percentageAlive = percentageAlive;
                game.init();
            }
        },
        statistics: {
            numberOfCellsElement: null,
            numberOfLivingCellsElement: null,
            numberOfIterationsElement: null,
            paintSpeedElement: null,
            lifeCalcSpeedElement: null,
            paintSpeeds: [],
            lifeCalcSpeeds: [],
            init: function init () {
                var statistics = this;

                statistics.numberOfCellsElement = document.getElementById('numberOfCells');
                statistics.numberOfLivingCellsElement = document.getElementById('numberOfLivingCells');
                statistics.numberOfIterationsElement = document.getElementById('numberOfIterations');
                statistics.paintSpeedElement = document.getElementById('paintSpeed');
                statistics.lifeCalcSpeedElement = document.getElementById('lifeCalcSpeed');
            },
            changeCellsCount: function changeCellsCount (numberOfCells) {
                var statistics = this;
                statistics.numberOfCellsElement.innerText = numberOfCells;
            },
            changeLivingCellsCount: function changeLivingCellsCount (numberOfLivingCells) {
                var statistics = this;
                statistics.numberOfLivingCellsElement.innerText = numberOfLivingCells;
            },
            changeIterationsCount: function changeIterationsCount (numberOfIterations) {
                var statistics = this;
                statistics.numberOfIterationsElement.innerText = numberOfIterations;
            },
            changePaintSpeed: function changePaintSpeed (paintSpeed) {
                var statistics = this,
                    totalPaintSpeed = 0,
                    maxNumberOfPaintSpeeds = 20;

                if (statistics.paintSpeeds.length > maxNumberOfPaintSpeeds - 1) {
                    statistics.paintSpeeds.shift();
                }

                statistics.paintSpeeds.push(paintSpeed);

                for (var i = 0; i < statistics.paintSpeeds.length; i++) {
                    totalPaintSpeed = totalPaintSpeed + statistics.paintSpeeds[i];
                }

                statistics.paintSpeedElement.innerText = Math.floor(totalPaintSpeed / statistics.paintSpeeds.length);
            },
           changeLifeCalcSpeed: function changeLifeCalcSpeed (lifeCalcSpeed) {
                var statistics = this,
                    totalLifeCalcSpeed = 0,
                    maxNumberOfLifeCalcSpeeds = 20;

                if (statistics.lifeCalcSpeeds.length > maxNumberOfLifeCalcSpeeds - 1) {
                    statistics.lifeCalcSpeeds.shift();
                }

                statistics.lifeCalcSpeeds.push(lifeCalcSpeed);

                for (var i = 0; i < statistics.lifeCalcSpeeds.length; i++) {
                    totalLifeCalcSpeed = totalLifeCalcSpeed + statistics.lifeCalcSpeeds[i];
                }

                statistics.lifeCalcSpeedElement.innerText = Math.floor(totalLifeCalcSpeed / statistics.lifeCalcSpeeds.length);
            }
        }
    };

    game.init();
})();