export type GameType = {
    cellSize: number,
    cells: Array<CellType>,
    numberOfRows: number,
    numberOfColumns: number,
    percentageAlive: number,
    generationSpeed: number,
    predictionMode: boolean,
    generation: number,
    lifeTimer: any,
    init: Function,
    runLife: Function,
    evolve: Function,
    createCell: Function,
    createCells: Function,
    predictCellStates: Function,
    changeCellStates: Function
};

type CellType = {
    row: number,
    column: number,
    alive: boolean,
    willBeAlive: boolean,
    getNeighbors: Function,
    getCellColor: Function
};
