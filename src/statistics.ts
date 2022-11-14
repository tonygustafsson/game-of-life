let statisticsElement: HTMLElement | null = null;
let paintTimes: Array<number> = [];
let calcTimes: Array<number> = [];

const statisticsElementId = 'statistics';
const calcSpeedsToRemember = 20;
const paintSpeedsToRemember = 20;

export const initStatistics = () => {
    /* Create event handlers for statistics */
    statisticsElement = document.getElementById(statisticsElementId);
};

type StatisticsObjType = {
    totalCells: number;
    livingCells: number;
    generation: number;
    calcTime: number;
    paintTime: number;
};

export const updateStatistics = (statistics: StatisticsObjType) => {
    let statisticsHtml = `
        <span class="statistics__item">Cell spaces: ${statistics.totalCells}</span>
        <span class="statistics__item">Living: ${statistics.livingCells} (${Math.floor(
        (statistics.livingCells / statistics.totalCells) * 100
    )}%)</span>
        <span class="statistics__item">Generation: ${statistics.generation}</span>
        <span class="statistics__item">Paint speed: ${getAvgTime(
            paintTimes,
            paintSpeedsToRemember,
            statistics.paintTime
        )} ms</span>
        <span class="statistics__item">Calculation speed: ${getAvgTime(
            calcTimes,
            calcSpeedsToRemember,
            statistics.calcTime
        )} ms</span>
    `;

    if (statisticsElement) {
        statisticsElement.innerHTML = statisticsHtml;
    }
};

const getAvgTime = (array: Array<number>, itemsToRemember: number, time: number) => {
    if (array.length > itemsToRemember - 1) {
        // Remove old calc times
        array.shift();
    }

    array.push(time);

    let avgTime = array.reduce((a, b) => a + b, 0) / array.length;

    return avgTime.toFixed(4);
};
