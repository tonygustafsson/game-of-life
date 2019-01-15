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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: numberOfRows, numberOfColumns, cellSize, initCanvas, changeCellSize, paint, giveLifeToCellByCoordinates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"numberOfRows\", function() { return numberOfRows; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"numberOfColumns\", function() { return numberOfColumns; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cellSize\", function() { return cellSize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initCanvas\", function() { return initCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeCellSize\", function() { return changeCellSize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"paint\", function() { return paint; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"giveLifeToCellByCoordinates\", function() { return giveLifeToCellByCoordinates; });\n/* harmony import */ var _life__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./life */ \"./src/life.js\");\n\nvar contextElementId = 'game-canvas';\nvar canvasWidthPercentage = 0.95;\nvar canvasHeightPercentage = 0.8;\nvar red = '#b6542c';\nvar darkgreen = '#006040';\nvar green = '#008000';\nvar blue = '#0057aa';\nvar numberOfRows = 0;\nvar numberOfColumns = 0;\nvar cellSize = 6;\nvar width = 0;\nvar height = 0;\nvar contextElement = null;\nvar context = null;\nvar initCanvas = function initCanvas() {\n  contextElement = document.getElementById(contextElementId);\n  if (contextElement instanceof HTMLCanvasElement) context = contextElement.getContext('2d', {\n    alpha: false\n  });\n  width = Math.floor(window.innerWidth * canvasWidthPercentage);\n  height = Math.floor(window.innerHeight * canvasHeightPercentage);\n  context.canvas.width = width;\n  context.canvas.height = height;\n  numberOfRows = Math.floor(height / cellSize);\n  numberOfColumns = Math.floor(width / cellSize);\n};\nvar changeCellSize = function changeCellSize(newCellSize) {\n  cellSize = newCellSize;\n};\nvar paint = function paint() {\n  /* Will paint each generation to the canvas */\n  // Keep track of performance\n  var performanceStart = performance.now(); // Clear all cells so we won't have to paint out dead cells (performance hog)\n\n  if (context !== undefined) {\n    context.clearRect(0, 0, width, height);\n  }\n\n  _life__WEBPACK_IMPORTED_MODULE_0__[\"cells\"].forEach(function (cell) {\n    var borderWidth = cellSize < 4 ? 0 : 1; // Get the X and Y position from the cell position and size\n\n    var posX = Math.floor(cell.column * cellSize) + borderWidth,\n        posY = Math.floor(cell.row * cellSize) + borderWidth; // Get the cell color depending on cell state\n\n    var cellColor = getCellColor(cell);\n\n    if (cellColor) {\n      // Do not paint if dead cell\n      // Leave a pixel to create a border (actual borders on rectangle did slow it down for some reason)\n      context.fillStyle = cellColor;\n      context.fillRect(posX, posY, cellSize - borderWidth, cellSize - borderWidth);\n    }\n  });\n  return performance.now() - performanceStart;\n};\nvar giveLifeToCellByCoordinates = function giveLifeToCellByCoordinates(x, y) {\n  /* Give life when drawing on canvas, get cellId by coordinates */\n  var row = Math.floor(y / cellSize),\n      column = Math.floor(x / cellSize),\n      cellsBeforeLastRow = (row + 1) * numberOfColumns,\n      cellId = cellsBeforeLastRow - numberOfColumns * 2 + column - 1;\n  Object(_life__WEBPACK_IMPORTED_MODULE_0__[\"giveLifeToCell\"])(cellId);\n};\n\nvar getCellColor = function getCellColor(cell) {\n  /* Get the cell color depending of cell state */\n  // Dying cell\n  if (cell.alive && !cell.willBeAlive) return red; // Popular cell\n  else if (cell.alive && cell.neighbors === 3) return darkgreen; // Alive\n    else if (cell.alive) return green; // New cell\n      else if (!cell.alive && cell.willBeAlive) return blue; // Dead, do not paint\n        else return false;\n};\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/controls.js":
/*!*************************!*\
  !*** ./src/controls.js ***!
  \*************************/
/*! exports provided: generationSpeed, initControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generationSpeed\", function() { return generationSpeed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initControls\", function() { return initControls; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _life__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./life */ \"./src/life.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\nvar generationSpeed = 35;\nvar toggleLifeElement = null;\nvar createGenerationElement = null;\nvar resetElement = null;\nvar generationSpeedSelectorElement = null;\nvar cellSizeSelectorElement = null;\nvar percentageAliveSelectorElement = null;\nvar canvasElement = null;\nvar isPaintActive = false;\nvar toggleLifeElementId = 'toggleLife';\nvar createGenerationElementId = 'createGeneration';\nvar resetElementId = 'reset';\nvar generationSpeedSelectorId = 'generationSpeedSelector';\nvar cellSizeSelectorId = 'gameCellSizeSelector';\nvar percentageAliveSelectorId = 'gamePercentageAliveSelector';\nvar canvasElementId = 'game-canvas';\nvar initControls = function initControls() {\n  toggleLifeElement = document.getElementById(toggleLifeElementId);\n  createGenerationElement = document.getElementById(createGenerationElementId);\n  resetElement = document.getElementById(resetElementId);\n  generationSpeedSelectorElement = document.getElementById(generationSpeedSelectorId);\n  cellSizeSelectorElement = document.getElementById(cellSizeSelectorId);\n  percentageAliveSelectorElement = document.getElementById(percentageAliveSelectorId);\n  canvasElement = document.getElementById(canvasElementId);\n  /* Add event handlers for the controls */\n\n  if (toggleLifeElement) {\n    toggleLifeElement.addEventListener('click', toggleLife);\n    toggleLifeElement.innerText = 'Pause';\n  }\n\n  if (createGenerationElement) createGenerationElement.addEventListener('click', _life__WEBPACK_IMPORTED_MODULE_1__[\"evolve\"]);\n  if (resetElement) resetElement.addEventListener('click', reset);\n  if (generationSpeedSelectorElement) generationSpeedSelectorElement.addEventListener('change', changeGenerationSpeed);\n  if (cellSizeSelectorElement) cellSizeSelectorElement.addEventListener('change', changeCurrentCellSize);\n  if (percentageAliveSelectorElement) percentageAliveSelectorElement.addEventListener('change', changeCurrentPercentageAlive);\n\n  if (canvasElement) {\n    /* Events for painting life on canvas */\n    canvasElement.addEventListener('mousedown', activatePaint);\n    canvasElement.addEventListener('touchstart', activatePaint);\n    canvasElement.addEventListener('mouseup', deActivatePaint);\n    canvasElement.addEventListener('touchend', deActivatePaint);\n    canvasElement.addEventListener('mousemove', createNewCellByPress);\n    canvasElement.addEventListener('touchmove', createNewCellByPress);\n  }\n};\n\nvar reset = function reset() {\n  /* Restarts the game */\n  Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"initGame\"])();\n};\n\nvar toggleLife = function toggleLife() {\n  /* Toggle between start and pause */\n  if (Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"isItAlive\"])()) {\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"pauseLife\"])();\n    if (toggleLifeElement) toggleLifeElement.innerText = 'Start';\n  } else {\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"startLife\"])(generationSpeed);\n    if (toggleLifeElement) toggleLifeElement.innerText = 'Pause';\n  }\n};\n\nvar changeGenerationSpeed = function changeGenerationSpeed() {\n  /* Changes the generation speed in ms */\n  if (generationSpeedSelectorElement instanceof HTMLSelectElement) {\n    var newGenerationSpeed = parseInt(generationSpeedSelectorElement.options[generationSpeedSelectorElement.selectedIndex].value, 10);\n    generationSpeed = newGenerationSpeed;\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"pauseLife\"])();\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"startLife\"])(generationSpeed);\n  }\n};\n\nvar changeCurrentCellSize = function changeCurrentCellSize() {\n  /* Changes cell size in px */\n  if (cellSizeSelectorElement instanceof HTMLSelectElement) {\n    var newCellSize = parseInt(cellSizeSelectorElement.options[cellSizeSelectorElement.selectedIndex].value, 10);\n    Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"changeCellSize\"])(newCellSize);\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"initGame\"])();\n  }\n};\n\nvar changeCurrentPercentageAlive = function changeCurrentPercentageAlive() {\n  /* Changes percentage of cells that is alive and resets the game */\n  if (percentageAliveSelectorElement instanceof HTMLSelectElement) {\n    var newPercentageAlive = parseInt(percentageAliveSelectorElement.options[percentageAliveSelectorElement.selectedIndex].value, 10);\n    Object(_life__WEBPACK_IMPORTED_MODULE_1__[\"changePercentageAlive\"])(newPercentageAlive);\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"initGame\"])();\n  }\n};\n\nvar activatePaint = function activatePaint() {\n  isPaintActive = true;\n};\n\nvar deActivatePaint = function deActivatePaint() {\n  isPaintActive = false;\n};\n\nvar createNewCellByPress = function createNewCellByPress(e) {\n  if (!isPaintActive) return;\n  e.preventDefault();\n\n  if (e.target instanceof HTMLElement) {\n    var canvasPos = e.target.getBoundingClientRect(),\n        pointerX = 0,\n        pointerY = 0;\n\n    if (e instanceof MouseEvent) {\n      pointerX = e.clientX;\n      pointerY = e.clientY;\n    } else {\n      pointerX = e.touches[0].clientX;\n      pointerY = e.touches[0].clientY;\n    }\n\n    var x = Math.floor(pointerX - canvasPos.left);\n    var y = Math.floor(pointerY - canvasPos.top);\n    Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"giveLifeToCellByCoordinates\"])(x, y);\n  }\n};\n\n//# sourceURL=webpack:///./src/controls.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: initGame, pauseLife, startLife, isItAlive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initGame\", function() { return initGame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pauseLife\", function() { return pauseLife; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startLife\", function() { return startLife; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isItAlive\", function() { return isItAlive; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls */ \"./src/controls.js\");\n/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statistics */ \"./src/statistics.js\");\n/* harmony import */ var _life__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./life */ \"./src/life.js\");\n/* harmony import */ var _lifeWorkerHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lifeWorkerHandler */ \"./src/lifeWorkerHandler.js\");\n/* -------- GAME OF LIFE ---------- \n    Created by Tony Gustafsson\n    More info: https://github.com/tonygustafsson/game-of-life/\n*/\n\n\n\n\n\nvar lifeTimerId = null;\nvar initGame = function initGame() {\n  pauseLife();\n  /* Initializes the game, resets everything */\n\n  Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"initCanvas\"])();\n  Object(_life__WEBPACK_IMPORTED_MODULE_3__[\"initLife\"])();\n  Object(_statistics__WEBPACK_IMPORTED_MODULE_2__[\"initStatistics\"])();\n  Object(_controls__WEBPACK_IMPORTED_MODULE_1__[\"initControls\"])(); // Let's start the timer and get some life going\n\n  startLife(_controls__WEBPACK_IMPORTED_MODULE_1__[\"generationSpeed\"]); //initLifeWorkerHandler(numberOfColumns, numberOfRows);\n};\nvar pauseLife = function pauseLife() {\n  if (lifeTimerId !== null) {\n    console.log('Pause life');\n    clearInterval(lifeTimerId);\n    lifeTimerId = null;\n  }\n};\nvar startLife = function startLife(generationSpeed) {\n  console.log('Start life');\n  lifeTimerId = setInterval(_life__WEBPACK_IMPORTED_MODULE_3__[\"evolve\"], generationSpeed);\n};\nvar isItAlive = function isItAlive() {\n  return lifeTimerId !== null;\n};\n\n(function gameOfLife() {\n  // Run the application\n  initGame();\n})();\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/life.js":
/*!*********************!*\
  !*** ./src/life.js ***!
  \*********************/
/*! exports provided: generation, cells, changePercentageAlive, initLife, evolve, giveLifeToCell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generation\", function() { return generation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cells\", function() { return cells; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changePercentageAlive\", function() { return changePercentageAlive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLife\", function() { return initLife; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"evolve\", function() { return evolve; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"giveLifeToCell\", function() { return giveLifeToCell; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statistics */ \"./src/statistics.js\");\n\n\nvar generation = 0;\nvar cells = [];\nvar predictionMode = false;\nvar percentageAlive = 15;\nvar changePercentageAlive = function changePercentageAlive(newPercentageAlive) {\n  percentageAlive = newPercentageAlive;\n};\nvar initLife = function initLife() {\n  generation = 0;\n  createCells();\n};\nvar evolve = function evolve() {\n  /* Calculates which cells will be alive or dead */\n  var statistics = null;\n\n  if (predictionMode) {\n    // Only predict the changes, so we can mark cells as new or dying\n    statistics = predictCellStates();\n  } else {\n    // Actually move cells in memory\n    changeCellStates();\n  } // Every other evolution, it will first predict, then make cell changes\n\n\n  predictionMode = !predictionMode; // Write to statistics which generation we are on now\n\n  generation++;\n  var paintTime = Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"paint\"])(); // Change cell count in statistics\n\n  if (statistics) {\n    statistics.paintTime = paintTime;\n    Object(_statistics__WEBPACK_IMPORTED_MODULE_1__[\"updateStatistics\"])(statistics);\n  }\n};\n\nvar createCell = function createCell(rowId, columnId, alive) {\n  /* Will create a specific cell which will end up in an array */\n  var cell = {\n    row: rowId,\n    column: columnId,\n    alive: alive,\n    willBeAlive: alive,\n    neighbors: 0\n  };\n  return cell;\n};\n\nvar getNeighbors = function getNeighbors(cell) {\n  /* Check how many neighbors are alive for this cell */\n  var neighbors = 0,\n      position = cell.row * _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] + cell.column,\n      top = cells[position - _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"]],\n      topRight = cells[position - (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] - 1)],\n      topLeft = cells[position - (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] + 1)],\n      right = cells[position + 1],\n      left = cells[position - 1],\n      bottom = cells[position + _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"]],\n      bottomRight = cells[position + (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] + 1)],\n      bottomLeft = cells[position + (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] - 1)];\n  if (typeof top !== 'undefined' && top.alive) neighbors++;\n  if (typeof topLeft !== 'undefined' && topLeft.alive) neighbors++;\n  if (typeof topRight !== 'undefined' && topRight.alive) neighbors++;\n  if (typeof right !== 'undefined' && right.alive) neighbors++;\n  if (typeof left !== 'undefined' && left.alive) neighbors++;\n  if (typeof bottom !== 'undefined' && bottom.alive) neighbors++;\n  if (typeof bottomRight !== 'undefined' && bottomRight.alive) neighbors++;\n  if (typeof bottomLeft !== 'undefined' && bottomLeft.alive) neighbors++;\n  return neighbors;\n};\n\nvar createCells = function createCells() {\n  /* Will create all cells. It will add them to an array, and keep track\n         of imaginary rows and columns too keep track of neighbors  */\n  cells = [];\n\n  for (var rowId = 0; rowId < _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfRows\"]; rowId++) {\n    for (var columnId = 0; columnId < _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"]; columnId++) {\n      // Check if it's initially dead or alive\n      var alive = Math.random() < percentageAlive / 100; // Create the cell and add it to an array\n\n      var cell = createCell(rowId, columnId, alive);\n      cells.push(cell);\n    }\n  }\n};\n\nvar giveLifeToCell = function giveLifeToCell(cellId) {\n  /* Turn on life for specific cell */\n  if (typeof cells[cellId] === 'undefined') return;\n  cells[cellId].alive = true;\n  cells[cellId].willBeAlive = true;\n};\n\nvar predictCellStates = function predictCellStates() {\n  /*  Only predict the changes, so we can mark cells as new or dying without\n          actually killing or creating something new. If we would kill cells every run\n          the surrounding cells would response to this death directly, the game needs the\n          all cells to change in response to the last cell move */\n  var livingCells = 0; // Keep track of how long this execution takes\n\n  var performanceStart = performance.now();\n  cells.forEach(function (cell) {\n    // Get the number of neighbors for each cell\n    cell.neighbors = getNeighbors(cell);\n\n    if (cell.alive && cell.neighbors < 2) {\n      // Any live cell with fewer than two live neighbors dies, as if by underpopulation.\n      cell.willBeAlive = false;\n    } else if (cell.alive && (cell.neighbors === 2 || cell.neighbors === 3)) {\n      // Any live cell with two or three live neighbors lives on to the next generation.\n      livingCells++;\n    } else if (cell.alive && cell.neighbors > 3) {\n      // Any live cell with more than three live neighbors dies, as if by overpopulation.\n      cell.willBeAlive = false;\n    } else if (!cell.alive && cell.neighbors === 3) {\n      // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.\n      cell.willBeAlive = true;\n    }\n  });\n  return {\n    livingCells: livingCells,\n    generation: generation,\n    totalCells: cells.length,\n    calcTime: performance.now() - performanceStart,\n    paintTime: 0\n    /* Will be populated later on by canvas.js */\n\n  };\n};\n\nvar changeCellStates = function changeCellStates() {\n  /* Will execute the cell states depending of what predictCellStates() said */\n  cells.forEach(function (cell) {\n    cell.alive = cell.willBeAlive;\n  });\n};\n\n//# sourceURL=webpack:///./src/life.js?");

/***/ }),

/***/ "./src/lifeWorkerHandler.js":
/*!**********************************!*\
  !*** ./src/lifeWorkerHandler.js ***!
  \**********************************/
/*! exports provided: cells, initLifeWorkerHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cells\", function() { return cells; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLifeWorkerHandler\", function() { return initLifeWorkerHandler; });\nvar cells = [];\nvar lifeWorker = null;\nvar initLifeWorkerHandler = function initLifeWorkerHandler(numberOfColumns, numberOfRows) {\n  if (!('serviceWorker' in navigator)) return;\n  lifeWorker = navigator.serviceWorker;\n\n  if (lifeWorker instanceof ServiceWorkerContainer) {\n    lifeWorker.register('lifeWorker.js', {\n      scope: '/'\n    }).then(function (registration) {\n      console.log('[PAGE] Service Worker Registered');\n    });\n    lifeWorker.ready.then(function (registration) {\n      console.log('[PAGE] Service Worker Ready');\n      sendMessage({\n        task: 'createCells',\n        numberOfColumns: numberOfColumns,\n        numberOfRows: numberOfRows\n      }).then(function (response) {\n        console.log('[PAGE] Cells created', response);\n\n        if (response && response.cells) {\n          cells = response.cells;\n        }\n\n        setInterval(function () {\n          sendMessage({\n            task: 'getCells'\n          }).then(function (response) {\n            console.log('[PAGE] Got cell updates', response);\n\n            if (response && response.cells) {\n              cells = response.cells;\n            }\n          });\n        }, 1000);\n      });\n    });\n    lifeWorker.addEventListener('message', function (e) {\n      console.log('[PAGE] Recieved message from lifeWorker', e);\n    });\n  }\n};\n\nvar sendMessage = function sendMessage(message) {\n  return new Promise(function (resolve, reject) {\n    if (lifeWorker instanceof ServiceWorkerContainer) {\n      var messageChannel = new MessageChannel();\n      var incomingPort = messageChannel.port1;\n      var outgoingPort = messageChannel.port2;\n      var outgoingPortArray = [outgoingPort];\n\n      if (lifeWorker.controller instanceof ServiceWorker) {\n        lifeWorker.controller.postMessage(message, outgoingPortArray);\n      }\n\n      incomingPort.onmessage = function (e) {\n        if (e.data && e.data.error) {\n          reject(e.data.error);\n        } else {\n          resolve(e.data);\n        }\n      };\n    }\n  });\n};\n\n//# sourceURL=webpack:///./src/lifeWorkerHandler.js?");

/***/ }),

/***/ "./src/statistics.js":
/*!***************************!*\
  !*** ./src/statistics.js ***!
  \***************************/
/*! exports provided: initStatistics, updateStatistics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initStatistics\", function() { return initStatistics; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateStatistics\", function() { return updateStatistics; });\nvar statisticsElement = null;\nvar paintTimes = [];\nvar calcTimes = [];\nvar statisticsElementId = 'statistics';\nvar calcSpeedsToRemember = 20;\nvar paintSpeedsToRemember = 20;\nvar initStatistics = function initStatistics() {\n  /* Create event handlers for statistics */\n  statisticsElement = document.getElementById(statisticsElementId);\n};\nvar updateStatistics = function updateStatistics(statistics) {\n  var statisticsHtml = \"\\n        <span class=\\\"statistics__item\\\">Cell spaces: \".concat(statistics.totalCells, \"</span>\\n        <span class=\\\"statistics__item\\\">Living: \").concat(statistics.livingCells, \" (\").concat(Math.floor(statistics.livingCells / statistics.totalCells * 100), \"%)</span>\\n        <span class=\\\"statistics__item\\\">Generation: \").concat(statistics.generation, \"</span>\\n        <span class=\\\"statistics__item\\\">Paint speed: \").concat(getAvgTime(paintTimes, paintSpeedsToRemember, statistics.paintTime), \" ms</span>\\n        <span class=\\\"statistics__item\\\">Calculation speed: \").concat(getAvgTime(calcTimes, calcSpeedsToRemember, statistics.calcTime), \" ms</span>\\n    \");\n\n  if (statisticsElement) {\n    statisticsElement.innerHTML = statisticsHtml;\n  }\n};\n\nvar getAvgTime = function getAvgTime(array, itemsToRemember, time) {\n  if (array.length > itemsToRemember - 1) {\n    // Remove old calc times\n    array.shift();\n  }\n\n  array.push(time);\n  var avgTime = array.reduce(function (a, b) {\n    return a + b;\n  }, 0) / array.length;\n  return parseInt(avgTime, 10).toString();\n};\n\n//# sourceURL=webpack:///./src/statistics.js?");

/***/ })

/******/ });