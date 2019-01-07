// @flow

let numberOfCellsElement: ?HTMLElement = null;
let numberOfLivingCellsElement: ?HTMLElement = null;
let generationElement: ?HTMLElement = null;
let paintSpeedElement: ?HTMLElement = null;
let lifeCalcSpeedElement: ?HTMLElement = null;
let paintSpeeds: Array<number> = [];
let lifeCalcSpeeds: Array<number> = [];

export const initStatistics = () => {
    /* Create event handlers for statistics */

    numberOfCellsElement = document.getElementById('numberOfCells');
    numberOfLivingCellsElement = document.getElementById('numberOfLivingCells');
    generationElement = document.getElementById('generation');
    paintSpeedElement = document.getElementById('paintSpeed');
    lifeCalcSpeedElement = document.getElementById('lifeCalcSpeed');
};

export const changeCellsCount = (numberOfCells: number) => {
    if (numberOfCellsElement) {
        numberOfCellsElement.innerText = numberOfCells.toString();
    }
};

export const changeLivingCellsCount = (numberOfLivingCells: number) => {
    if (numberOfLivingCellsElement) numberOfLivingCellsElement.innerText = numberOfLivingCells.toString();
};

export const changePaintSpeed = (paintSpeed: number) => {
    /* Add to the paint speed statistics, keep 20 in memory and
           get the average of these */

    let totalPaintSpeed = 0,
        maxNumberOfPaintSpeeds = 20;

    if (paintSpeeds.length > maxNumberOfPaintSpeeds - 1) {
        paintSpeeds.shift();
    }

    paintSpeeds.push(paintSpeed);

    for (let i = 0; i < paintSpeeds.length; i++) {
        totalPaintSpeed = totalPaintSpeed + paintSpeeds[i];
    }

    if (paintSpeedElement) {
        paintSpeedElement.innerText = Math.floor(totalPaintSpeed / paintSpeeds.length).toString();
    }
};

export const changeLifeCalcSpeed = (lifeCalcSpeed: number) => {
    /* Add to the life calculation speed statistics, keep 20 in memory and
           get the average of these */

    let totalLifeCalcSpeed = 0,
        maxNumberOfLifeCalcSpeeds = 20;

    if (lifeCalcSpeeds.length > maxNumberOfLifeCalcSpeeds - 1) {
        lifeCalcSpeeds.shift();
    }

    lifeCalcSpeeds.push(lifeCalcSpeed);

    for (let i = 0; i < lifeCalcSpeeds.length; i++) {
        totalLifeCalcSpeed = totalLifeCalcSpeed + lifeCalcSpeeds[i];
    }

    if (lifeCalcSpeedElement) {
        lifeCalcSpeedElement.innerText = Math.floor(totalLifeCalcSpeed / lifeCalcSpeeds.length).toString();
    }
};

const changeGeneration = (generation: number) => {
    if (generationElement) {
        generationElement.innerText = generation.toString();
    }
};
