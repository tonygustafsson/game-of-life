/* -------- GAME OF LIFE ---------- 
    Created by Tony Gustafsson
    More info: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
*/

(function gameOfLife() {
    "use strict";

    var game = {
        cellSize: 6,
        cells: [],
        numberOfRows: null,
        numberOfColumns: null,
        percentageAlive: 15,
        generationSpeed: 35,
        predictionMode: false,
        generation: 0,
        lifeTimer: null,
        init: function init() {
            /* Initializes the game, resets everything */
            var game = this;

            // Get the number of rows and columns of cells by deviding screen size with cell size
            game.numberOfRows = Math.floor(game.canvas.height / game.cellSize);
            game.numberOfColumns = Math.floor(game.canvas.width / game.cellSize);

            game.controls.init();
            game.statistics.init();
            game.cells = game.createCells();
            game.canvas.init();

            // Reset some stuff if the game is restarted
            game.generation = 0;
            
            if (game.lifeTimer !== null) {
                clearTimeout(game.lifeTimer);
                game.lifeTimer = null;
            }

            // Let's start the timer and get some life going
            game.runLife();
        },
        runLife: function runLife() {
            /* Keeps track of timer, makes the cells evolve automatically */

            game.evolve();
            game.lifeTimer = setTimeout(game.runLife, game.generationSpeed);
        },
        evolve: function evolve () {
            /* Calculates which cells will be alive or dead */

            if (game.predictionMode) {
                // Only predict the changes, so we can mark cells as new or dying
                game.predictCellStates();
            }
            else {
                // Actually move cells in memory
                game.changeCellStates();
            }

            // Every other evolution, it will first predict, then make cell changes
            game.predictionMode = !game.predictionMode;

            // Now we can paint these new positions and cells to the canvas
            game.canvas.paint();

            // Write to statistics which generation we are on now
            game.statistics.changeGeneration(game.generation);
            game.generation++;
        },
        createCell: function createCell(rowId, columnId, alive) {
            /* Will create a specific cell which will end up in an array */

            var cell = {
                row: rowId,
                column: columnId,
                alive: alive,
                willBeAlive: alive,
                getNeighbors: function getNeighbors() {
                    /* Check how many neighbors are alive for this cell */
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
                getCellColor: function getColor() {
                    /* Get the cell color depending of cell state */

                    var cell = this;

                    if (cell.alive && !cell.willBeAlive) return "#b6542c"; // Dying cell
                    else if (cell.alive && cell.getNeighbors() === 3) return "#006040"; // Popular cell
                    else if (cell.alive) return "#008000"; // Alive
                    else if (!cell.alive && cell.willBeAlive) return "#0057aa"; // New cell
                    else return false; // Dead, do not paint
                }
            };

            return cell;
        },
        createCells: function createCells() {
            /* Will create all cells. It will add them to an array, and keep track
               of imaginary rows and columns too keep track of neighbors  */

            var cells = [];

            for (var rowId = 0; rowId < game.numberOfRows; rowId++) {
                for (var columnId = 0; columnId < game.numberOfColumns; columnId++) {
                    // Check if it's initially dead or alive
                    var alive = Math.random() < (game.percentageAlive / 100);

                    // Create the cell and add it to an array
                    var cell = game.createCell(rowId, columnId, alive);
                    cells.push(cell);
                }
            }

            // Change cell count in statistics
            game.statistics.changeCellsCount(cells.length);

            return cells;
        },
        predictCellStates: function predictCellStates() {
            /*  Only predict the changes, so we can mark cells as new or dying without
                actually killing or creating something new. If we would kill cells every run
                the surrounding cells would response to this death directly, the game needs the
                all cells to change in response to the last cell move */

            var livingCells = 0;

            // Keep track of how long this execution takes
            var performanceStart = performance.now();

            for (var cellId in game.cells) {
                if (!game.cells.hasOwnProperty(cellId)) {
                    continue;
                }

                // Get the number of neighbors for each cell
                var cell = game.cells[cellId],
                    neighbors = cell.getNeighbors();

                if (cell.alive) {
                    // Only survive if it got 2-3 neighbors
                    cell.willBeAlive = neighbors === 2 || neighbors === 3;
                    livingCells++;
                }
                else {
                    // Create new cell if 3 neighbors
                    cell.willBeAlive = neighbors === 3;
                }
            }

            // Add performance and living cell count to statistics
            game.statistics.changeLivingCellsCount(livingCells);
            game.statistics.changeLifeCalcSpeed(performance.now() - performanceStart);
        },
        changeCellStates: function changeCellStates() {
            /* Will execute the cell states depending of what predictCellStates() said */

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
                /* Initialize the canvas, set the width and height */

                var canvas = this;

                game.canvas.context.canvas.width  = canvas.width;
                game.canvas.context.canvas.height = canvas.height;
            },
            paint: function paintCanvas() {
                /* Will paint each generation to the canvas */

                var canvas = this;

                // Keep track of performance
                var performanceStart = performance.now();

                // Clear all cells so we won't have to paint out dead cells (performance hog)
                canvas.context.clearRect(0, 0, canvas.width, canvas.height);

                for (var cellId in game.cells) {
                    if (!game.cells.hasOwnProperty(cellId)) {
                        continue;
                    }

                    // Get the X and Y position from the cell position and size
                    var cell = game.cells[cellId],
                        posX = Math.floor(cell.column * game.cellSize) + 1,
                        posY = Math.floor(cell.row * game.cellSize) + 1;

                    // Get the cell color depending on cell state
                    var cellColor = cell.getCellColor();

                    if (cellColor) {
                        // Do not paint if dead cell
                        canvas.context.beginPath();
                        // Leave a pixel to create a border (actual borders on rectangle did slow it down for some reason)
                        canvas.context.rect(posX, posY, game.cellSize - 1, game.cellSize - 1);
                        canvas.context.fillStyle = cellColor;
                        canvas.context.fill();
                    }
                }

                // Write the paint speed to the statistics
                game.statistics.changePaintSpeed(performance.now() - performanceStart);
            }
        },
        controls: {
            init: function init () {
                /* Add event handlers for the controls */

                var controls = this;

                document.getElementById('toggleLife').addEventListener('click', controls.toggleLife);
                document.getElementById('createGeneration').addEventListener('click', controls.createGeneration);
                document.getElementById('reset').addEventListener('click', controls.reset);
                document.getElementById('generationSpeedSelector').addEventListener('change', controls.changeGenerationSpeed);
                document.getElementById('gameCellSizeSelector').addEventListener('change', controls.changeCellSize);
                document.getElementById('gamePercentageAliveSelector').addEventListener('change', controls.changePercentageAlive);

                document.getElementById('toggleLife').innerText = "Pause";
            },
            start: function start () {
                /* Start life again if it's paused */

                game.runLife();

                document.getElementById('toggleLife').innerText = "Pause";
            },
            pause: function pause () {
                /* Pause game, kill timer */

                clearTimeout(game.lifeTimer);
                game.lifeTimer = null;

                document.getElementById('toggleLife').innerText = "Start";
            },
            reset: function reset () {
                /* Restarts the game */

                game.init();
            },
            toggleLife: function toggleLife () {
                /* Toggle between start and pause */

                if (game.lifeTimer === null) {
                    game.controls.start();
                }
                else {
                    game.controls.pause();
                }
            },
            createGeneration: function createGeneration () {
                /* Manually change to next generation when paused */

                game.controls.pause();

                game.evolve();
            },
            changeGenerationSpeed: function changeGenerationSpeed () {
                /* Changes the generation speed in ms */

                var generationSpeedSelector = this,
                    generationSpeed = parseInt(generationSpeedSelector.options[generationSpeedSelector.selectedIndex].value, 10);

                game.generationSpeed = generationSpeed;
            },
            changeCellSize: function changeCellSize () {
                /* Changes cell size in px */

                var gameCellSizeSelector = this,
                    cellSize = parseInt(gameCellSizeSelector.options[gameCellSizeSelector.selectedIndex].value, 10);

                game.cellSize = cellSize;
                game.init();
            },
            changePercentageAlive: function changePercentageAlive () {
                /* Changes percentage of cells that is alive and resets the game */

                var gamePercentageAliveSelector = this,
                    percentageAlive = parseInt(gamePercentageAliveSelector.options[gamePercentageAliveSelector.selectedIndex].value, 10);

                game.percentageAlive = percentageAlive;
                game.init();
            }
        },
        statistics: {
            numberOfCellsElement: null,
            numberOfLivingCellsElement: null,
            generationElement: null,
            paintSpeedElement: null,
            lifeCalcSpeedElement: null,
            paintSpeeds: [],
            lifeCalcSpeeds: [],
            init: function init () {
                /* Create event handlers for statistics */

                var statistics = this;

                statistics.numberOfCellsElement = document.getElementById('numberOfCells');
                statistics.numberOfLivingCellsElement = document.getElementById('numberOfLivingCells');
                statistics.generationElement = document.getElementById('generation');
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
            changeGeneration: function changeGeneration (generation) {
                var statistics = this;
                statistics.generationElement.innerText = generation;
            },
            changePaintSpeed: function changePaintSpeed (paintSpeed) {
                /* Add to the paint speed statistics, keep 20 in memory and
                   get the average of these */

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
                /* Add to the life calculation speed statistics, keep 20 in memory and
                   get the average of these */

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

    // Let's roll
    game.init();
})();