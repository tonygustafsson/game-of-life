export type Cell = {
    row: number;
    column: number;
    alive: boolean;
    willBeAlive: boolean;
    neighbors: number;
};
