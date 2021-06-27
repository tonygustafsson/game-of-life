import { changeCellSize, giveLifeToCellByCoordinates } from './canvas';
import { evolve, changePercentageAlive, generation } from './life';
import { initGame, isItAlive, pauseLife, startLife } from './index';

export let generationSpeed: number = 35;

let toggleLifeElement: HTMLElement | null = null;
let createGenerationElement: HTMLElement | null = null;
let resetElement: HTMLElement | null = null;
let generationSpeedSelectorElement: HTMLElement | null = null;
let cellSizeSelectorElement: HTMLElement | null = null;
let percentageAliveSelectorElement: HTMLElement | null = null;
let canvasElement: HTMLElement | null = null;
let isPaintActive: boolean = false;

const toggleLifeElementId = 'toggleLife';
const createGenerationElementId = 'createGeneration';
const resetElementId = 'reset';
const generationSpeedSelectorId = 'generationSpeedSelector';
const cellSizeSelectorId = 'gameCellSizeSelector';
const percentageAliveSelectorId = 'gamePercentageAliveSelector';
const canvasElementId = 'game-canvas';

export const initControls = () => {
    toggleLifeElement = document.getElementById(toggleLifeElementId);
    createGenerationElement = document.getElementById(createGenerationElementId);
    resetElement = document.getElementById(resetElementId);
    generationSpeedSelectorElement = document.getElementById(generationSpeedSelectorId);
    cellSizeSelectorElement = document.getElementById(cellSizeSelectorId);
    percentageAliveSelectorElement = document.getElementById(percentageAliveSelectorId);
    canvasElement = document.getElementById(canvasElementId);

    /* Add event handlers for the controls */
    if (toggleLifeElement) {
        toggleLifeElement.addEventListener('click', toggleLife);
        toggleLifeElement.innerText = 'Pause';
    }

    if (createGenerationElement) createGenerationElement.addEventListener('click', evolve);
    if (resetElement) resetElement.addEventListener('click', reset);
    if (generationSpeedSelectorElement)
        generationSpeedSelectorElement.addEventListener('change', changeGenerationSpeed);
    if (cellSizeSelectorElement) cellSizeSelectorElement.addEventListener('change', changeCurrentCellSize);
    if (percentageAliveSelectorElement)
        percentageAliveSelectorElement.addEventListener('change', changeCurrentPercentageAlive);

    if (canvasElement) {
        /* Events for painting life on canvas */
        canvasElement.addEventListener('mousedown', activatePaint);
        canvasElement.addEventListener('touchstart', activatePaint);
        canvasElement.addEventListener('mouseup', deActivatePaint);
        canvasElement.addEventListener('touchend', deActivatePaint);
        canvasElement.addEventListener('mousemove', createNewCellByPress);
        canvasElement.addEventListener('touchmove', createNewCellByPress);
    }
};

const reset = () => {
    /* Restarts the game */
    initGame();
};

const toggleLife = () => {
    /* Toggle between start and pause */
    if (isItAlive()) {
        pauseLife();
        if (toggleLifeElement) toggleLifeElement.innerText = 'Start';
    } else {
        startLife(generationSpeed);
        if (toggleLifeElement) toggleLifeElement.innerText = 'Pause';
    }
};

const changeGenerationSpeed = () => {
    /* Changes the generation speed in ms */
    if (generationSpeedSelectorElement instanceof HTMLSelectElement) {
        let newGenerationSpeed = parseInt(
            generationSpeedSelectorElement.options[generationSpeedSelectorElement.selectedIndex].value,
            10
        );

        generationSpeed = newGenerationSpeed;
        pauseLife();
        startLife(generationSpeed);
    }
};

const changeCurrentCellSize = () => {
    /* Changes cell size in px */
    if (cellSizeSelectorElement instanceof HTMLSelectElement) {
        let newCellSize = parseInt(cellSizeSelectorElement.options[cellSizeSelectorElement.selectedIndex].value, 10);

        changeCellSize(newCellSize);
        initGame();
    }
};

const changeCurrentPercentageAlive = () => {
    /* Changes percentage of cells that is alive and resets the game */
    if (percentageAliveSelectorElement instanceof HTMLSelectElement) {
        let newPercentageAlive = parseInt(
            percentageAliveSelectorElement.options[percentageAliveSelectorElement.selectedIndex].value,
            10
        );

        changePercentageAlive(newPercentageAlive);
        initGame();
    }
};

const activatePaint = () => {
    isPaintActive = true;
};

const deActivatePaint = () => {
    isPaintActive = false;
};

const createNewCellByPress = (e: MouseEvent | TouchEvent) => {
    if (!isPaintActive) return;

    e.preventDefault();

    if (e.target instanceof HTMLElement) {
        let canvasPos = e.target.getBoundingClientRect(),
            pointerX = 0,
            pointerY = 0;

        if (e instanceof MouseEvent) {
            pointerX = e.clientX;
            pointerY = e.clientY;
        } else {
            pointerX = e.touches[0].clientX;
            pointerY = e.touches[0].clientY;
        }

        let x = Math.floor(pointerX - canvasPos.left);
        let y = Math.floor(pointerY - canvasPos.top);

        giveLifeToCellByCoordinates(x, y);
    }
};
