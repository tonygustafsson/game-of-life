// @flow

var numberOfCellsElement = null;
var numberOfLivingCellsElement = null;
var generationElement = null;
var paintSpeedElement = null;
var lifeCalcSpeedElement = null;
var paintSpeeds = [];
var lifeCalcSpeeds = [];

export const initStatistics = function initStatistics() {
    /* Create event handlers for statistics */

    numberOfCellsElement = document.getElementById('numberOfCells');
    numberOfLivingCellsElement = document.getElementById('numberOfLivingCells');
    generationElement = document.getElementById('generation');
    paintSpeedElement = document.getElementById('paintSpeed');
    lifeCalcSpeedElement = document.getElementById('lifeCalcSpeed');
};

export const changeCellsCount = function changeCellsCount(numberOfCells: number) {
    if (numberOfCellsElement) {
        numberOfCellsElement.innerText = numberOfCells.toString();
    }
};

export const changeLivingCellsCount = function changeLivingCellsCount(numberOfLivingCells: number) {
    if (numberOfLivingCellsElement) numberOfLivingCellsElement.innerText = numberOfLivingCells.toString();
};

const changeGeneration = function changeGeneration(generation) {
    if (generationElement) {
        generationElement.innerText = generation.toString();
    }
};

export const changePaintSpeed = function changePaintSpeed(paintSpeed: number) {
    /* Add to the paint speed statistics, keep 20 in memory and
           get the average of these */

    var totalPaintSpeed = 0,
        maxNumberOfPaintSpeeds = 20;

    if (paintSpeeds.length > maxNumberOfPaintSpeeds - 1) {
        paintSpeeds.shift();
    }

    paintSpeeds.push(paintSpeed);

    for (var i = 0; i < paintSpeeds.length; i++) {
        totalPaintSpeed = totalPaintSpeed + paintSpeeds[i];
    }

    if (paintSpeedElement) {
        paintSpeedElement.innerText = Math.floor(totalPaintSpeed / paintSpeeds.length).toString();
    }
};

export const changeLifeCalcSpeed = function changeLifeCalcSpeed(lifeCalcSpeed: number) {
    /* Add to the life calculation speed statistics, keep 20 in memory and
           get the average of these */

    var totalLifeCalcSpeed = 0,
        maxNumberOfLifeCalcSpeeds = 20;

    if (lifeCalcSpeeds.length > maxNumberOfLifeCalcSpeeds - 1) {
        lifeCalcSpeeds.shift();
    }

    lifeCalcSpeeds.push(lifeCalcSpeed);

    for (var i = 0; i < lifeCalcSpeeds.length; i++) {
        totalLifeCalcSpeed = totalLifeCalcSpeed + lifeCalcSpeeds[i];
    }

    if (lifeCalcSpeedElement) {
        lifeCalcSpeedElement.innerText = Math.floor(totalLifeCalcSpeed / lifeCalcSpeeds.length).toString();
    }
};

type StatisticsType = {
    init: Function,
    changeGeneration: Function,
    changeCellsCount: Function,
    changeLifeCalcSpeed: Function,
    changeLivingCellsCount: Function,
    changePaintSpeed: Function
};
