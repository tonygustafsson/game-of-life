// @flow

import { initCanvas } from './canvas';
import { initLife, evolve } from './life';
import { runLife, lifeTimerId, changeLifeTimerId } from './game';

export var generationSpeed = null;
var toggleLifeElement = null;
var createGenerationElement = null;
var resetElement = null;

export const initControls = function() {
    toggleLifeElement = document.getElementById('toggleLife');
    createGenerationElement = document.getElementById('createGeneration');
    resetElement = document.getElementById('reset');

    /* Add event handlers for the controls */
    if (toggleLifeElement) {
        toggleLifeElement.addEventListener('click', toggleLife);
        toggleLifeElement.innerText = 'Pause';
    }

    if (createGenerationElement) createGenerationElement.addEventListener('click', createGeneration);
    if (resetElement) resetElement.addEventListener('click', reset);

    var generationSpeedSelectorElement = document.getElementById('generationSpeedSelector');
    if (generationSpeedSelectorElement) {
        generationSpeedSelectorElement.addEventListener('change', changeGenerationSpeed);
        generationSpeedSelectorElement.addEventListener('change', changeCellSize);
    }

    var gamePercentageAliveSelector = document.getElementById('gamePercentageAliveSelector');
    if (gamePercentageAliveSelector) gamePercentageAliveSelector.addEventListener('change', changePercentageAlive);
};

const reset = function reset() {
    /* Restarts the game */

    initCanvas();
    initLife();
};

const toggleLife = function toggleLife() {
    /* Toggle between start and pause */

    if (lifeTimerId === null) {
        runLife();
        if (toggleLifeElement) toggleLifeElement.innerText = 'Pause';
    } else {
        clearInterval(lifeTimerId);
        changeLifeTimerId(null);
        if (toggleLifeElement) toggleLifeElement.innerText = 'Start';
    }
};

const createGeneration = function createGeneration() {
    /* Manually change to next generation when paused */

    evolve();
};

const changeGenerationSpeed = function changeGenerationSpeed() {
    /* Changes the generation speed in ms */

    var generationSpeedSelector = this,
        generationSpeed = parseInt(generationSpeedSelector.options[generationSpeedSelector.selectedIndex].value, 10);

    this.generationSpeed = generationSpeed;
};

const changeCellSize = function changeCellSize() {
    /* Changes cell size in px */

    var gameCellSizeSelector = this,
        cellSize = parseInt(gameCellSizeSelector.options[gameCellSizeSelector.selectedIndex].value, 10);

    this.cellSize = cellSize;
    this.gameInit();
};

const changePercentageAlive = function changePercentageAlive() {
    /* Changes percentage of cells that is alive and resets the game */

    var gamePercentageAliveSelector = this,
        percentageAlive = parseInt(gamePercentageAliveSelector.options[gamePercentageAliveSelector.selectedIndex].value, 10);

    this.percentageAlive = percentageAlive;
    this.gameInit();
};

type ControlType = {
    evolve: Function,
    cellSize: number,
    percentageAlive: number,
    toggleLife: Function,
    toggleLifeElement: ?HTMLElement,
    resetElement: ?HTMLElement,
    gameInit: Function,
    runLife: Function,
    lifeTimerId: ?IntervalID,
    percentageAlive: number
};
