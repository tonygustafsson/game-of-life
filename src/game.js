// @flow

/* -------- GAME OF LIFE ---------- 
    Created by Tony Gustafsson
    More info: https://github.com/tonygustafsson/game-of-life/
*/

import { initCanvas } from './canvas';
import { initControls, generationSpeed } from './controls';
import { initStatistics } from './statistics';
import { initLife, evolve } from './life';

let lifeTimerId: ?IntervalID = null;

export const initGame = () => {
    pauseLife();

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
        console.log('Pause life');

        clearInterval(lifeTimerId);
        lifeTimerId = null;
    }
};

export const startLife = (generationSpeed: number) => {
    console.log('Start life');
    lifeTimerId = setInterval(evolve, generationSpeed);
};

export const isItAlive = () => {
    return lifeTimerId !== null;
};

(function gameOfLife() {
    // Run the application
    initGame();
})();
