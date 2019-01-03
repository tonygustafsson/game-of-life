// @flow

export const Controls: ControlType = {
    runLife: null,
    lifeTimer: null,
    gameInit: null,
    evolve: null,
    generationSpeed: null,
    cellSize: 0,
    percentageAlive: 0,
    init: function init(runLife, lifeTimer, gameInit, evolve, generationSpeed, cellSize, percentageAlive) {
        this.runLife = runLife;
        this.lifeTimer = lifeTimer;
        this.gameInit = gameInit;
        this.evolve = evolve;
        this.generationSpeed = generationSpeed;
        this.cellSize = cellSize;
        this.percentageAlive = percentageAlive;

        /* Add event handlers for the controls */

        var controls = this;

        var toggleLifeElement = document.getElementById('toggleLife');
        if (toggleLifeElement) {
            toggleLifeElement.addEventListener('click', controls.toggleLife);
            toggleLifeElement.innerText = 'Pause';
        }

        var createGenerationElement = document.getElementById('toggleLife');
        if (createGenerationElement) createGenerationElement.addEventListener('click', controls.createGeneration);

        var resetElement = document.getElementById('reset');
        if (resetElement) resetElement.addEventListener('click', controls.reset);

        var generationSpeedSelectorElement = document.getElementById('generationSpeedSelector');
        if (generationSpeedSelectorElement) {
            generationSpeedSelectorElement.addEventListener('change', controls.changeGenerationSpeed);
            generationSpeedSelectorElement.addEventListener('change', controls.changeCellSize);
        }

        var gamePercentageAliveSelector = document.getElementById('gamePercentageAliveSelector');
        if (gamePercentageAliveSelector) gamePercentageAliveSelector.addEventListener('change', controls.changePercentageAlive);
    },
    start: function start() {
        /* Start life again if it's paused */

        this.runLife();

        var createGenerationElement = document.getElementById('toggleLife');
        if (createGenerationElement) createGenerationElement.innerText = 'Pause';
    },
    pause: function pause() {
        /* Pause game, kill timer */

        if (this.lifeTimer !== null) {
            clearTimeout(this.lifeTimer);
        }
        Controls.lifeTimer = null;

        var toggleLifeElement = document.getElementById('toggleLife');
        if (toggleLifeElement) toggleLifeElement.innerText = 'Start';
    },
    reset: function reset() {
        /* Restarts the game */

        Controls.gameInit();
    },
    toggleLife: function toggleLife() {
        /* Toggle between start and pause */

        if (this.lifeTimer === null) {
            Controls.start();
        } else {
            Controls.pause();
        }
    },
    createGeneration: function createGeneration() {
        /* Manually change to next generation when paused */

        Controls.pause();

        Controls.evolve();
    },
    changeGenerationSpeed: function changeGenerationSpeed() {
        /* Changes the generation speed in ms */

        var generationSpeedSelector = this,
            generationSpeed = parseInt(generationSpeedSelector.options[generationSpeedSelector.selectedIndex].value, 10);

        this.generationSpeed = generationSpeed;
    },
    changeCellSize: function changeCellSize() {
        /* Changes cell size in px */

        var gameCellSizeSelector = this,
            cellSize = parseInt(gameCellSizeSelector.options[gameCellSizeSelector.selectedIndex].value, 10);

        Controls.cellSize = cellSize;
        Controls.gameInit();
    },
    changePercentageAlive: function changePercentageAlive() {
        /* Changes percentage of cells that is alive and resets the game */

        var gamePercentageAliveSelector = this,
            percentageAlive = parseInt(gamePercentageAliveSelector.options[gamePercentageAliveSelector.selectedIndex].value, 10);

            Controls.percentageAlive = percentageAlive;
            Controls.gameInit();
    }
};

type ControlType = {
    start: Function,
    pause: Function,
    evolve: function,
    cellSize: number,
    gameInit: function,
    lifeTimer: function,
    percentageAlive: number
};
