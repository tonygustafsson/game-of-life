// @flow

export const Statistics: StatisticsType = {
    numberOfCellsElement: null,
    numberOfLivingCellsElement: null,
    generationElement: null,
    paintSpeedElement: null,
    lifeCalcSpeedElement: null,
    paintSpeeds: [],
    lifeCalcSpeeds: [],
    init: function init() {
        /* Create event handlers for statistics */

        var statistics = this;

        statistics.numberOfCellsElement = document.getElementById('numberOfCells');
        statistics.numberOfLivingCellsElement = document.getElementById('numberOfLivingCells');
        statistics.generationElement = document.getElementById('generation');
        statistics.paintSpeedElement = document.getElementById('paintSpeed');
        statistics.lifeCalcSpeedElement = document.getElementById('lifeCalcSpeed');
    },
    changeCellsCount: function changeCellsCount(numberOfCells) {
        var statistics = this;
        if (statistics.numberOfCellsElement) {
            statistics.numberOfCellsElement.innerText = numberOfCells.toString();
        }
    },
    changeLivingCellsCount: function changeLivingCellsCount(numberOfLivingCells) {
        var statistics = this;
        if (statistics.numberOfLivingCellsElement) statistics.numberOfLivingCellsElement.innerText = numberOfLivingCells.toString();
    },
    changeGeneration: function changeGeneration(generation) {
        var statistics = this;
        statistics.generationElement.innerText = generation.toString();
    },
    changePaintSpeed: function changePaintSpeed(paintSpeed) {
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
    changeLifeCalcSpeed: function changeLifeCalcSpeed(lifeCalcSpeed) {
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
};

type StatisticsType = {
    init: Function,
    changeGeneration: Function,
    changeCellsCount: Function,
    changeLifeCalcSpeed: Function,
    changeLivingCellsCount: Function,
    changePaintSpeed: Function
};
