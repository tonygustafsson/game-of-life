// @flow

import { initCanvas } from './canvas';
import { evolve, changeCellSize, changePercentageAlive, generation } from './life';
import { initGame, lifeTimerId, pauseLife, startLife } from './game';

export let generationSpeed: number = 35;

let toggleLifeElement: ?HTMLElement = null;
let createGenerationElement: ?HTMLElement = null;
let resetElement: ?HTMLElement = null;
let generationSpeedSelectorElement: ?HTMLElement = null;
let gameCellSizeSelectorElement: ?HTMLElement = null;
let percentageAliveSelectorElement: ?HTMLElement = null;

const toggleLifeElementId = 'toggleLife';
const createGenerationElementId = 'createGeneration';
const resetElementId = 'reset';
const generationSpeedSelectorId = 'generationSpeedSelector';
const gameCellSizeSelectorId = 'gameCellSizeSelector';
const percentageAliveSelectorId = 'gamePercentageAliveSelector';

export const initControls = () => {
    toggleLifeElement = document.getElementById(toggleLifeElementId);
    createGenerationElement = document.getElementById(createGenerationElementId);
    resetElement = document.getElementById(resetElementId);
    generationSpeedSelectorElement = document.getElementById(generationSpeedSelectorId);
    gameCellSizeSelectorElement = document.getElementById(gameCellSizeSelectorId);
    percentageAliveSelectorElement = document.getElementById(percentageAliveSelectorId);

    /* Add event handlers for the controls */
    if (toggleLifeElement) {
        toggleLifeElement.addEventListener('click', toggleLife);
        toggleLifeElement.innerText = 'Pause';
    }

    if (createGenerationElement) createGenerationElement.addEventListener('click', evolve);
    if (resetElement) resetElement.addEventListener('click', reset);
    if (generationSpeedSelectorElement) generationSpeedSelectorElement.addEventListener('change', changeGenerationSpeed);
    if (gameCellSizeSelectorElement) gameCellSizeSelectorElement.addEventListener('change', changeCurrentCellSize);
    if (percentageAliveSelectorElement) percentageAliveSelectorElement.addEventListener('change', changeCurrentPercentageAlive);
};

const reset = () => {
    /* Restarts the game */
    initGame();
};

const toggleLife = () => {
    /* Toggle between start and pause */
    if (lifeTimerId === null) {
        startLife(generationSpeed);
        if (toggleLifeElement) toggleLifeElement.innerText = 'Pause';
    } else {
        pauseLife();
        if (toggleLifeElement) toggleLifeElement.innerText = 'Start';
    }
};

const changeGenerationSpeed = () => {
    /* Changes the generation speed in ms */
    if (generationSpeedSelectorElement instanceof HTMLSelectElement) {
        let newGenerationSpeed = parseInt(generationSpeedSelectorElement.options[generationSpeedSelectorElement.selectedIndex].value, 10);

        generationSpeed = newGenerationSpeed;
        pauseLife();
        startLife(generationSpeed);
    }
};

const changeCurrentCellSize = () => {
    /* Changes cell size in px */
    if (gameCellSizeSelectorElement instanceof HTMLSelectElement) {
        let newCellSize = parseInt(gameCellSizeSelectorElement.options[gameCellSizeSelectorElement.selectedIndex].value, 10);

        changeCellSize(newCellSize);
        pauseLife();
        initGame();
    }
};

const changeCurrentPercentageAlive = () => {
    /* Changes percentage of cells that is alive and resets the game */
    if (percentageAliveSelectorElement instanceof HTMLSelectElement) {
        let newPercentageAlive = parseInt(percentageAliveSelectorElement.options[percentageAliveSelectorElement.selectedIndex].value, 10);

        changePercentageAlive(newPercentageAlive);
        initGame();
    }
};
