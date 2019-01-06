// @flow

export const Controls: ControlType = {
    runLife: null,
    lifeTimerId: null,
    gameInit: null,
    evolve: null,
    generationSpeed: null,
    toggleLifeElement: null,
    createGenerationElement: null,
    resetElement: null,
    cellSize: 0,
    percentageAlive: 0,
    init: function init(runLife, lifeTimerId, gameInit, evolve, generationSpeed, cellSize, percentageAlive) {
        this.runLife = runLife;
        this.lifeTimerId = lifeTimerId;
        this.gameInit = gameInit;
        this.evolve = evolve;
        this.generationSpeed = generationSpeed;
        this.cellSize = cellSize;
        this.percentageAlive = percentageAlive;
        this.toggleLifeElement = document.getElementById('toggleLife');
        this.createGenerationElement = document.getElementById('createGeneration');
        this.resetElement = document.getElementById('reset');

        /* Add event handlers for the controls */
        if (this.toggleLifeElement) {
            this.toggleLifeElement.addEventListener('click', this.toggleLife);
            this.toggleLifeElement.innerText = 'Pause';
        }

        if (this.createGenerationElement) this.createGenerationElement.addEventListener('click', this.createGeneration);
        if (this.resetElement) this.resetElement.addEventListener('click', this.reset);

        var generationSpeedSelectorElement = document.getElementById('generationSpeedSelector');
        if (generationSpeedSelectorElement) {
            generationSpeedSelectorElement.addEventListener('change', this.changeGenerationSpeed);
            generationSpeedSelectorElement.addEventListener('change', this.changeCellSize);
        }

        var gamePercentageAliveSelector = document.getElementById('gamePercentageAliveSelector');
        if (gamePercentageAliveSelector) gamePercentageAliveSelector.addEventListener('change', this.changePercentageAlive);
    },
    reset: function reset() {
        /* Restarts the game */

        Controls.gameInit();
    },
    toggleLife: function toggleLife() {
        /* Toggle between start and pause */

        if (Controls.lifeTimerId === null) {
            Controls.runLife();
            if (Controls.toggleLifeElement) Controls.toggleLifeElement.innerText = 'Pause';
        } else {
            clearInterval(Controls.lifeTimerId);
            Controls.lifeTimerId = null;
            if (Controls.toggleLifeElement) Controls.toggleLifeElement.innerText = 'Start';
        }
    },
    createGeneration: function createGeneration() {
        /* Manually change to next generation when paused */

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

        this.cellSize = cellSize;
        this.gameInit();
    },
    changePercentageAlive: function changePercentageAlive() {
        /* Changes percentage of cells that is alive and resets the game */

        var gamePercentageAliveSelector = this,
            percentageAlive = parseInt(gamePercentageAliveSelector.options[gamePercentageAliveSelector.selectedIndex].value, 10);

        this.percentageAlive = percentageAlive;
        this.gameInit();
    }
};

type ControlType = {
    evolve: function,
    cellSize: number,
    percentageAlive: number;
    toggleLife: function,
    toggleLifeElement: ?HTMLElement,
    resetElement: ?HTMLElement,
    gameInit: function,
    runLife: function,
    lifeTimerId: ?IntervalID,
    percentageAlive: number
};
