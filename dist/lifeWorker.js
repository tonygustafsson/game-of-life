/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lifeWorker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lifeWorker.js":
/*!***************************!*\
  !*** ./src/lifeWorker.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var numberOfColumns = 0;\nvar numberOfRows = 0;\nvar generation = 0;\nvar cells = [];\nvar predictionMode = false;\nvar percentageAlive = 15;\n\nvar changePercentageAlive = function changePercentageAlive(newPercentageAlive) {\n  percentageAlive = newPercentageAlive;\n};\n\nvar initLife = function initLife() {\n  generation = 0;\n  createCells();\n};\n\nvar evolve = function evolve() {\n  /* Calculates which cells will be alive or dead */\n  var statistics = null;\n\n  if (predictionMode) {\n    // Only predict the changes, so we can mark cells as new or dying\n    statistics = predictCellStates();\n  } else {\n    // Actually move cells in memory\n    changeCellStates();\n  } // Every other evolution, it will first predict, then make cell changes\n\n\n  predictionMode = !predictionMode; // Write to statistics which generation we are on now\n\n  generation++;\n};\n\nvar createCell = function createCell(rowId, columnId, alive) {\n  /* Will create a specific cell which will end up in an array */\n  var cell = {\n    row: rowId,\n    column: columnId,\n    alive: alive,\n    willBeAlive: alive,\n    neighbors: 0\n  };\n  return cell;\n};\n\nvar getNeighbors = function getNeighbors(cell) {\n  /* Check how many neighbors are alive for this cell */\n  var neighbors = 0,\n      position = cell.row * numberOfColumns + cell.column,\n      top = cells[position - numberOfColumns],\n      topRight = cells[position - (numberOfColumns - 1)],\n      topLeft = cells[position - (numberOfColumns + 1)],\n      right = cells[position + 1],\n      left = cells[position - 1],\n      bottom = cells[position + numberOfColumns],\n      bottomRight = cells[position + (numberOfColumns + 1)],\n      bottomLeft = cells[position + (numberOfColumns - 1)];\n  if (typeof top !== 'undefined' && top.alive) neighbors++;\n  if (typeof topLeft !== 'undefined' && topLeft.alive) neighbors++;\n  if (typeof topRight !== 'undefined' && topRight.alive) neighbors++;\n  if (typeof right !== 'undefined' && right.alive) neighbors++;\n  if (typeof left !== 'undefined' && left.alive) neighbors++;\n  if (typeof bottom !== 'undefined' && bottom.alive) neighbors++;\n  if (typeof bottomRight !== 'undefined' && bottomRight.alive) neighbors++;\n  if (typeof bottomLeft !== 'undefined' && bottomLeft.alive) neighbors++;\n  return neighbors;\n};\n\nvar createCells = function createCells() {\n  /* Will create all cells. It will add them to an array, and keep track\n         of imaginary rows and columns too keep track of neighbors  */\n  cells = [];\n\n  for (var rowId = 0; rowId < numberOfRows; rowId++) {\n    for (var columnId = 0; columnId < numberOfColumns; columnId++) {\n      // Check if it's initially dead or alive\n      var alive = Math.random() < percentageAlive / 100; // Create the cell and add it to an array\n\n      var cell = createCell(rowId, columnId, alive);\n      cells.push(cell);\n    }\n  }\n};\n\nvar giveLifeToCell = function giveLifeToCell(cellId) {\n  /* Turn on life for specific cell */\n  if (typeof cells[cellId] === 'undefined') return;\n  cells[cellId].alive = true;\n  cells[cellId].willBeAlive = true;\n};\n\nvar predictCellStates = function predictCellStates() {\n  /*  Only predict the changes, so we can mark cells as new or dying without\n          actually killing or creating something new. If we would kill cells every run\n          the surrounding cells would response to this death directly, the game needs the\n          all cells to change in response to the last cell move */\n  var livingCells = 0; // Keep track of how long this execution takes\n\n  var performanceStart = performance.now();\n  cells.forEach(function (cell) {\n    // Get the number of neighbors for each cell\n    cell.neighbors = getNeighbors(cell);\n\n    if (cell.alive && cell.neighbors < 2) {\n      // Any live cell with fewer than two live neighbors dies, as if by underpopulation.\n      cell.willBeAlive = false;\n    } else if (cell.alive && (cell.neighbors === 2 || cell.neighbors === 3)) {\n      // Any live cell with two or three live neighbors lives on to the next generation.\n      livingCells++;\n    } else if (cell.alive && cell.neighbors > 3) {\n      // Any live cell with more than three live neighbors dies, as if by overpopulation.\n      cell.willBeAlive = false;\n    } else if (!cell.alive && cell.neighbors === 3) {\n      // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.\n      cell.willBeAlive = true;\n    }\n  });\n  return {\n    livingCells: livingCells,\n    generation: generation,\n    totalCells: cells.length,\n    calcTime: performance.now() - performanceStart,\n    paintTime: 0\n    /* Will be populated later on by canvas.js */\n\n  };\n};\n\nvar changeCellStates = function changeCellStates() {\n  /* Will execute the cell states depending of what predictCellStates() said */\n  cells.forEach(function (cell) {\n    cell.alive = cell.willBeAlive;\n  });\n};\n\nself.addEventListener('install', function (e) {\n  console.log('[SW] Life Worker is installed.');\n});\nself.addEventListener('message', function (e) {\n  console.log('[SW] Recieved a message in lifeWorker', e);\n\n  if (e.data && e.data.task && e.data.task === 'createCells') {\n    numberOfColumns = e.data.numberOfColumns;\n    numberOfRows = e.data.numberOfRows;\n    console.log('[SW] Client wanted to create cells.');\n    createCells();\n    sendCells(e.ports[0]);\n  }\n\n  if (e.data && e.data.task && e.data.task === 'getCells') {\n    console.log('[SW] Client asked for cells');\n    sendCells(e.ports[0]);\n  }\n});\n\nvar sendCells = function sendCells(port) {\n  port.postMessage({\n    cells: cells\n  });\n};\n\n//# sourceURL=webpack:///./src/lifeWorker.js?");

/***/ })

/******/ });