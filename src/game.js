// @flow

/* -------- GAME OF LIFE ---------- 
    Created by Tony Gustafsson
    More info: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
*/

import type { GameType } from './types';
import { initCanvas } from './canvas';
import { initControls, generationSpeed } from './controls';
import { initStatistics } from './statistics';
import { initLife, evolve, cells, cellSize } from './life';

export var lifeTimerId = null;

const initGame = function init() {
    /* Initializes the game, resets everything */
    var game = this;

    initCanvas();
    initLife();
    initStatistics();
    initControls();

    if (lifeTimerId !== null) {
        clearInterval(lifeTimerId);
        lifeTimerId = null;
    }

    // Let's start the timer and get some life going
    runLife();
};

export const runLife = function runLife() {
    /* Keeps track of timer, makes the cells evolve automatically */

    evolve();

    lifeTimerId = setInterval(evolve, generationSpeed);
};

export const changeLifeTimerId = (id: ?IntervalID) => {
    lifeTimerId = id;
};

(function gameOfLife() {
    'use strict';

    // Let's roll
    initGame();
})();
