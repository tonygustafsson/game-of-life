// @flow

/* -------- GAME OF LIFE ---------- 
    Created by Tony Gustafsson
    More info: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
*/

import type { GameType } from './types';
import { Statistics } from './statistics';
import { initCanvas } from './canvas';
import { Controls } from './controls';
import { initLife, evolve, cells, cellSize, generation } from './life';

var game: GameType = {
    cellSize: 6,
    cells: [],
    numberOfRows: null,
    numberOfColumns: null,
    percentageAlive: 15,
    generationSpeed: 35,
    predictionMode: false,
    generation: 0,
    lifeTimerId: null,
    init: function init() {
        /* Initializes the game, resets everything */
        var game = this;

        initCanvas();
        initLife();
        Statistics.init();
        initCanvas();

        // Reset some stuff if the game is restarted
        //generation = 0;

        if (game.lifeTimerId !== null) {
            clearInterval(game.lifeTimerId);
            game.lifeTimerId = null;
        }

        // Let's start the timer and get some life going
        game.runLife();
    },
    runLife: function runLife() {
        /* Keeps track of timer, makes the cells evolve automatically */

        evolve();

        game.lifeTimerId = setInterval(evolve, game.generationSpeed);
        game.controls.init(game.runLife, game.lifeTimerId, game.init, evolve, game.generationSpeed, game.cellSize, game.percentageAlive);
    },
    controls: Controls,
    statistics: Statistics
};

(function gameOfLife() {
    'use strict';

    // Let's roll
    game.init();
})();
