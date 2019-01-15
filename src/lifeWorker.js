// @flow

let numberOfColumns = 0;
let numberOfRows = 0;

let generation: number = 0;
let cells: Array<CellType> = [];

let predictionMode: boolean = false;
let percentageAlive: number = 15;

const changePercentageAlive = (newPercentageAlive: number) => {
    percentageAlive = newPercentageAlive;
};

const initLife = () => {
    generation = 0;
    createCells();
};

const evolve = () => {
    /* Calculates which cells will be alive or dead */
    let statistics = null;

    if (predictionMode) {
        // Only predict the changes, so we can mark cells as new or dying
        statistics = predictCellStates();
    } else {
        // Actually move cells in memory
        changeCellStates();
    }

    // Every other evolution, it will first predict, then make cell changes
    predictionMode = !predictionMode;

    // Write to statistics which generation we are on now
    generation++;
};

const createCell = (rowId: number, columnId: number, alive: boolean) => {
    /* Will create a specific cell which will end up in an array */
    let cell = {
        row: rowId,
        column: columnId,
        alive: alive,
        willBeAlive: alive,
        neighbors: 0
    };

    return cell;
};

const getNeighbors = (cell: CellType) => {
    /* Check how many neighbors are alive for this cell */
    let neighbors = 0,
        position = cell.row * numberOfColumns + cell.column,
        top = cells[position - numberOfColumns],
        topRight = cells[position - (numberOfColumns - 1)],
        topLeft = cells[position - (numberOfColumns + 1)],
        right = cells[position + 1],
        left = cells[position - 1],
        bottom = cells[position + numberOfColumns],
        bottomRight = cells[position + (numberOfColumns + 1)],
        bottomLeft = cells[position + (numberOfColumns - 1)];

    if (typeof top !== 'undefined' && top.alive) neighbors++;
    if (typeof topLeft !== 'undefined' && topLeft.alive) neighbors++;
    if (typeof topRight !== 'undefined' && topRight.alive) neighbors++;
    if (typeof right !== 'undefined' && right.alive) neighbors++;
    if (typeof left !== 'undefined' && left.alive) neighbors++;
    if (typeof bottom !== 'undefined' && bottom.alive) neighbors++;
    if (typeof bottomRight !== 'undefined' && bottomRight.alive) neighbors++;
    if (typeof bottomLeft !== 'undefined' && bottomLeft.alive) neighbors++;

    return neighbors;
};

const createCells = () => {
    /* Will create all cells. It will add them to an array, and keep track
           of imaginary rows and columns too keep track of neighbors  */

    cells = [];

    for (let rowId = 0; rowId < numberOfRows; rowId++) {
        for (let columnId = 0; columnId < numberOfColumns; columnId++) {
            // Check if it's initially dead or alive
            let alive = Math.random() < percentageAlive / 100;

            // Create the cell and add it to an array
            let cell = createCell(rowId, columnId, alive);
            cells.push(cell);
        }
    }
};

const giveLifeToCell = (cellId: number) => {
    /* Turn on life for specific cell */
    if (typeof cells[cellId] === 'undefined') return;

    cells[cellId].alive = true;
    cells[cellId].willBeAlive = true;
};

const predictCellStates = () => {
    /*  Only predict the changes, so we can mark cells as new or dying without
            actually killing or creating something new. If we would kill cells every run
            the surrounding cells would response to this death directly, the game needs the
            all cells to change in response to the last cell move */

    let livingCells = 0;

    // Keep track of how long this execution takes
    let performanceStart = performance.now();

    cells.forEach(cell => {
        // Get the number of neighbors for each cell
        cell.neighbors = getNeighbors(cell);

        if (cell.alive && cell.neighbors < 2) {
            // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
            cell.willBeAlive = false;
        } else if (cell.alive && (cell.neighbors === 2 || cell.neighbors === 3)) {
            // Any live cell with two or three live neighbors lives on to the next generation.
            livingCells++;
        } else if (cell.alive && cell.neighbors > 3) {
            // Any live cell with more than three live neighbors dies, as if by overpopulation.
            cell.willBeAlive = false;
        } else if (!cell.alive && cell.neighbors === 3) {
            // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            cell.willBeAlive = true;
        }
    });

    return {
        livingCells: livingCells,
        generation: generation,
        totalCells: cells.length,
        calcTime: performance.now() - performanceStart,
        paintTime: 0 /* Will be populated later on by canvas.js */
    };
};

const changeCellStates = () => {
    /* Will execute the cell states depending of what predictCellStates() said */

    cells.forEach(cell => {
        cell.alive = cell.willBeAlive;
    });
};

type CellType = {
    row: number,
    column: number,
    alive: boolean,
    willBeAlive: boolean,
    neighbors: number
};

self.addEventListener('install', e => {
    console.log('[SW] Life Worker is installed.');
});

self.addEventListener('message', e => {
    console.log('[SW] Recieved a message in lifeWorker', e);

    if (e.data && e.data.task && e.data.task === 'createCells') {
        numberOfColumns = e.data.numberOfColumns;
        numberOfRows = e.data.numberOfRows;
        console.log('[SW] Client wanted to create cells.');

        createCells();
        sendCells(e.ports[0]);
    }

    if (e.data && e.data.task && e.data.task === 'getCells') {
        console.log('[SW] Client asked for cells');

        sendCells(e.ports[0]);
    }
});

const sendCells = port => {
    port.postMessage({
        cells: cells
    });
};