// @flow

/* -------- GAME OF LIFE ---------- 
    Created by Tony Gustafsson
    More info: https://github.com/tonygustafsson/game-of-life/
*/

import { initCanvas } from './canvas';
import { initControls, generationSpeed } from './controls';
import { initStatistics } from './statistics';
import { initLife, evolve, cells, cellSize } from './life';

export let lifeTimerId: ?IntervalID = null;

export const initGame = () => {
    /* Initializes the game, resets everything */
    initCanvas();
    initLife();
    initStatistics();
    initControls();

    // Let's start the timer and get some life going
    startLife(generationSpeed);
};

export const pauseLife = () => {
    if (lifeTimerId !== null) {
        clearInterval(lifeTimerId);
        lifeTimerId = null;
    }
};

export const startLife = (generationSpeed: number) => {
    lifeTimerId = setInterval(evolve, generationSpeed);
};

(function gameOfLife() {
    // Run the application
    initGame();
})();
