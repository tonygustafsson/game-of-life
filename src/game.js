// @flow

/* -------- GAME OF LIFE ---------- 
    Created by Tony Gustafsson
    More info: https://github.com/tonygustafsson/game-of-life/
*/

import { initCanvas } from './canvas';
import { initControls, generationSpeed } from './controls';
import { initStatistics } from './statistics';
import { initLife, evolve, cells, cellSize } from './life';

export let lifeTimerId = null;

export const initGame = () => {
    /* Initializes the game, resets everything */
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
    // Run the application
    initGame();
})();
