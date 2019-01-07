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
/*! exports provided: numberOfRows, numberOfColumns, initCanvas, paint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"numberOfRows\", function() { return numberOfRows; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"numberOfColumns\", function() { return numberOfColumns; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initCanvas\", function() { return initCanvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"paint\", function() { return paint; });\n/* harmony import */ var _life__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./life */ \"./src/life.js\");\n/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statistics */ \"./src/statistics.js\");\n\n\nvar numberOfRows = 0;\nvar numberOfColumns = 0;\nvar width = 0;\nvar height = 0;\nvar contextElement = null;\nvar context = null;\nvar initCanvas = function initCanvas() {\n  contextElement = document.getElementById('game-canvas');\n  context = contextElement.getContext('2d');\n  width = Math.floor(window.innerWidth * 0.95);\n  height = Math.floor(window.innerHeight * 0.8);\n  context.canvas.width = width;\n  context.canvas.height = height;\n  numberOfRows = Math.floor(height / _life__WEBPACK_IMPORTED_MODULE_0__[\"cellSize\"]);\n  numberOfColumns = Math.floor(width / _life__WEBPACK_IMPORTED_MODULE_0__[\"cellSize\"]);\n};\nvar paint = function paintCanvas() {\n  /* Will paint each generation to the canvas */\n  // Keep track of performance\n  var performanceStart = performance.now(); // Clear all cells so we won't have to paint out dead cells (performance hog)\n\n  if (context !== undefined) {\n    context.clearRect(0, 0, width, height);\n  }\n\n  _life__WEBPACK_IMPORTED_MODULE_0__[\"cells\"].forEach(function (cell) {\n    // Get the X and Y position from the cell position and size\n    var posX = Math.floor(cell.column * _life__WEBPACK_IMPORTED_MODULE_0__[\"cellSize\"]) + 1,\n        posY = Math.floor(cell.row * _life__WEBPACK_IMPORTED_MODULE_0__[\"cellSize\"]) + 1; // Get the cell color depending on cell state\n\n    var cellColor = cell.getCellColor();\n\n    if (cellColor) {\n      // Do not paint if dead cell\n      context.beginPath(); // Leave a pixel to create a border (actual borders on rectangle did slow it down for some reason)\n\n      context.rect(posX, posY, _life__WEBPACK_IMPORTED_MODULE_0__[\"cellSize\"] - 1, _life__WEBPACK_IMPORTED_MODULE_0__[\"cellSize\"] - 1);\n      context.fillStyle = cellColor;\n      context.fill();\n    }\n  }); // Write the paint speed to the statistics\n\n  Object(_statistics__WEBPACK_IMPORTED_MODULE_1__[\"changePaintSpeed\"])(performance.now() - performanceStart);\n};\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/controls.js":
/*!*************************!*\
  !*** ./src/controls.js ***!
  \*************************/
/*! exports provided: generationSpeed, initControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generationSpeed\", function() { return generationSpeed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initControls\", function() { return initControls; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _life__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./life */ \"./src/life.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\nvar generationSpeed = null;\nvar toggleLifeElement = null;\nvar createGenerationElement = null;\nvar resetElement = null;\nvar initControls = function initControls() {\n  toggleLifeElement = document.getElementById('toggleLife');\n  createGenerationElement = document.getElementById('createGeneration');\n  resetElement = document.getElementById('reset');\n  /* Add event handlers for the controls */\n\n  if (toggleLifeElement) {\n    toggleLifeElement.addEventListener('click', toggleLife);\n    toggleLifeElement.innerText = 'Pause';\n  }\n\n  if (createGenerationElement) createGenerationElement.addEventListener('click', createGeneration);\n  if (resetElement) resetElement.addEventListener('click', reset);\n  var generationSpeedSelectorElement = document.getElementById('generationSpeedSelector');\n\n  if (generationSpeedSelectorElement) {\n    generationSpeedSelectorElement.addEventListener('change', changeGenerationSpeed);\n    generationSpeedSelectorElement.addEventListener('change', changeCellSize);\n  }\n\n  var gamePercentageAliveSelector = document.getElementById('gamePercentageAliveSelector');\n  if (gamePercentageAliveSelector) gamePercentageAliveSelector.addEventListener('change', changePercentageAlive);\n};\n\nvar reset = function reset() {\n  /* Restarts the game */\n  Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"initCanvas\"])();\n  Object(_life__WEBPACK_IMPORTED_MODULE_1__[\"initLife\"])();\n};\n\nvar toggleLife = function toggleLife() {\n  /* Toggle between start and pause */\n  if (_game__WEBPACK_IMPORTED_MODULE_2__[\"lifeTimerId\"] === null) {\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"runLife\"])();\n    if (toggleLifeElement) toggleLifeElement.innerText = 'Pause';\n  } else {\n    clearInterval(_game__WEBPACK_IMPORTED_MODULE_2__[\"lifeTimerId\"]);\n    Object(_game__WEBPACK_IMPORTED_MODULE_2__[\"changeLifeTimerId\"])(null);\n    if (toggleLifeElement) toggleLifeElement.innerText = 'Start';\n  }\n};\n\nvar createGeneration = function createGeneration() {\n  /* Manually change to next generation when paused */\n  Object(_life__WEBPACK_IMPORTED_MODULE_1__[\"evolve\"])();\n};\n\nvar changeGenerationSpeed = function changeGenerationSpeed() {\n  /* Changes the generation speed in ms */\n  var generationSpeedSelector = this,\n      generationSpeed = parseInt(generationSpeedSelector.options[generationSpeedSelector.selectedIndex].value, 10);\n  this.generationSpeed = generationSpeed;\n};\n\nvar changeCellSize = function changeCellSize() {\n  /* Changes cell size in px */\n  var gameCellSizeSelector = this,\n      cellSize = parseInt(gameCellSizeSelector.options[gameCellSizeSelector.selectedIndex].value, 10);\n  this.cellSize = cellSize;\n  this.gameInit();\n};\n\nvar changePercentageAlive = function changePercentageAlive() {\n  /* Changes percentage of cells that is alive and resets the game */\n  var gamePercentageAliveSelector = this,\n      percentageAlive = parseInt(gamePercentageAliveSelector.options[gamePercentageAliveSelector.selectedIndex].value, 10);\n  this.percentageAlive = percentageAlive;\n  this.gameInit();\n};\n\n//# sourceURL=webpack:///./src/controls.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: lifeTimerId, runLife, changeLifeTimerId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lifeTimerId\", function() { return lifeTimerId; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"runLife\", function() { return runLife; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeLifeTimerId\", function() { return changeLifeTimerId; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls */ \"./src/controls.js\");\n/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statistics */ \"./src/statistics.js\");\n/* harmony import */ var _life__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./life */ \"./src/life.js\");\n/* -------- GAME OF LIFE ---------- \n    Created by Tony Gustafsson\n    More info: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life\n*/\n\n\n\n\nvar lifeTimerId = null;\n\nvar initGame = function init() {\n  /* Initializes the game, resets everything */\n  var game = this;\n  Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"initCanvas\"])();\n  Object(_life__WEBPACK_IMPORTED_MODULE_3__[\"initLife\"])();\n  Object(_statistics__WEBPACK_IMPORTED_MODULE_2__[\"initStatistics\"])();\n  Object(_controls__WEBPACK_IMPORTED_MODULE_1__[\"initControls\"])();\n\n  if (lifeTimerId !== null) {\n    clearInterval(lifeTimerId);\n    lifeTimerId = null;\n  } // Let's start the timer and get some life going\n\n\n  runLife();\n};\n\nvar runLife = function runLife() {\n  /* Keeps track of timer, makes the cells evolve automatically */\n  Object(_life__WEBPACK_IMPORTED_MODULE_3__[\"evolve\"])();\n  lifeTimerId = setInterval(_life__WEBPACK_IMPORTED_MODULE_3__[\"evolve\"], _controls__WEBPACK_IMPORTED_MODULE_1__[\"generationSpeed\"]);\n};\nvar changeLifeTimerId = function changeLifeTimerId(id) {\n  lifeTimerId = id;\n};\n\n(function gameOfLife() {\n  'use strict'; // Let's roll\n\n  initGame();\n})();\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/life.js":
/*!*********************!*\
  !*** ./src/life.js ***!
  \*********************/
/*! exports provided: cellSize, generation, cells, evolve, initLife */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cellSize\", function() { return cellSize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generation\", function() { return generation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cells\", function() { return cells; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"evolve\", function() { return evolve; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initLife\", function() { return initLife; });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statistics */ \"./src/statistics.js\");\n\n\nvar cellSize = 6;\nvar predictionMode = false;\nvar generation = 0;\nvar cells = [];\nvar percentageAlive = 15;\n\nvar createCell = function createCell(rowId, columnId, alive) {\n  /* Will create a specific cell which will end up in an array */\n  var cell = {\n    row: rowId,\n    column: columnId,\n    alive: alive,\n    willBeAlive: alive,\n    getNeighbors: function getNeighbors() {\n      /* Check how many neighbors are alive for this cell */\n      var neighbors = 0,\n          position = cell.row * _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] + cell.column,\n          top = cells[position - _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"]],\n          topRight = cells[position - (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] - 1)],\n          topLeft = cells[position - (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] + 1)],\n          right = cells[position + 1],\n          left = cells[position - 1],\n          bottom = cells[position + _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"]],\n          bottomRight = cells[position + (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] + 1)],\n          bottomLeft = cells[position + (_canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"] - 1)];\n      if (typeof top !== 'undefined' && top.alive) neighbors++;\n      if (typeof topLeft !== 'undefined' && topLeft.alive) neighbors++;\n      if (typeof topRight !== 'undefined' && topRight.alive) neighbors++;\n      if (typeof right !== 'undefined' && right.alive) neighbors++;\n      if (typeof left !== 'undefined' && left.alive) neighbors++;\n      if (typeof bottom !== 'undefined' && bottom.alive) neighbors++;\n      if (typeof bottomRight !== 'undefined' && bottomRight.alive) neighbors++;\n      if (typeof bottomLeft !== 'undefined' && bottomLeft.alive) neighbors++;\n      return neighbors;\n    },\n    getCellColor: function getColor() {\n      /* Get the cell color depending of cell state */\n      var cell = this;\n      if (cell.alive && !cell.willBeAlive) return '#b6542c'; // Dying cell\n      else if (cell.alive && cell.getNeighbors() === 3) return '#006040'; // Popular cell\n        else if (cell.alive) return '#008000'; // Alive\n          else if (!cell.alive && cell.willBeAlive) return '#0057aa'; // New cell\n            else return false; // Dead, do not paint\n    }\n  };\n  return cell;\n};\n\nvar createCells = function createCells() {\n  /* Will create all cells. It will add them to an array, and keep track\n         of imaginary rows and columns too keep track of neighbors  */\n  for (var rowId = 0; rowId < _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfRows\"]; rowId++) {\n    for (var columnId = 0; columnId < _canvas__WEBPACK_IMPORTED_MODULE_0__[\"numberOfColumns\"]; columnId++) {\n      // Check if it's initially dead or alive\n      var alive = Math.random() < percentageAlive / 100; // Create the cell and add it to an array\n\n      var cell = createCell(rowId, columnId, alive);\n      cells.push(cell);\n    }\n  }\n};\n\nvar evolve = function evolve() {\n  /* Calculates which cells will be alive or dead */\n  if (predictionMode) {\n    // Only predict the changes, so we can mark cells as new or dying\n    predictCellStates();\n  } else {\n    // Actually move cells in memory\n    changeCellStates();\n  } // Every other evolution, it will first predict, then make cell changes\n\n\n  predictionMode = !predictionMode; // Write to statistics which generation we are on now\n\n  generation++;\n  Object(_canvas__WEBPACK_IMPORTED_MODULE_0__[\"paint\"])(); // Change cell count in statistics\n\n  Object(_statistics__WEBPACK_IMPORTED_MODULE_1__[\"changeCellsCount\"])(cells.length);\n};\n\nvar predictCellStates = function predictCellStates() {\n  /*  Only predict the changes, so we can mark cells as new or dying without\n          actually killing or creating something new. If we would kill cells every run\n          the surrounding cells would response to this death directly, the game needs the\n          all cells to change in response to the last cell move */\n  var livingCells = 0; // Keep track of how long this execution takes\n\n  var performanceStart = performance.now();\n  cells.forEach(function (cell) {\n    // Get the number of neighbors for each cell\n    var neighbors = cell.getNeighbors();\n\n    if (cell.alive) {\n      // Only survive if it got 2-3 neighbors\n      cell.willBeAlive = neighbors === 2 || neighbors === 3;\n      livingCells++;\n    } else {\n      // Create new cell if 3 neighbors\n      cell.willBeAlive = neighbors === 3;\n    }\n  }); // Add performance and living cell count to statistics\n\n  Object(_statistics__WEBPACK_IMPORTED_MODULE_1__[\"changeLivingCellsCount\"])(livingCells);\n  Object(_statistics__WEBPACK_IMPORTED_MODULE_1__[\"changeLifeCalcSpeed\"])(performance.now() - performanceStart);\n};\n\nvar changeCellStates = function changeCellStates() {\n  /* Will execute the cell states depending of what predictCellStates() said */\n  cells.forEach(function (cell) {\n    cell.alive = cell.willBeAlive;\n  });\n};\n\nvar initLife = function initLife() {\n  generation = 0;\n  createCells();\n};\n\n//# sourceURL=webpack:///./src/life.js?");

/***/ }),

/***/ "./src/statistics.js":
/*!***************************!*\
  !*** ./src/statistics.js ***!
  \***************************/
/*! exports provided: initStatistics, changeCellsCount, changeLivingCellsCount, changePaintSpeed, changeLifeCalcSpeed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initStatistics\", function() { return initStatistics; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeCellsCount\", function() { return changeCellsCount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeLivingCellsCount\", function() { return changeLivingCellsCount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changePaintSpeed\", function() { return changePaintSpeed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeLifeCalcSpeed\", function() { return changeLifeCalcSpeed; });\nvar numberOfCellsElement = null;\nvar numberOfLivingCellsElement = null;\nvar generationElement = null;\nvar paintSpeedElement = null;\nvar lifeCalcSpeedElement = null;\nvar paintSpeeds = [];\nvar lifeCalcSpeeds = [];\nvar initStatistics = function initStatistics() {\n  /* Create event handlers for statistics */\n  numberOfCellsElement = document.getElementById('numberOfCells');\n  numberOfLivingCellsElement = document.getElementById('numberOfLivingCells');\n  generationElement = document.getElementById('generation');\n  paintSpeedElement = document.getElementById('paintSpeed');\n  lifeCalcSpeedElement = document.getElementById('lifeCalcSpeed');\n};\nvar changeCellsCount = function changeCellsCount(numberOfCells) {\n  if (numberOfCellsElement) {\n    numberOfCellsElement.innerText = numberOfCells.toString();\n  }\n};\nvar changeLivingCellsCount = function changeLivingCellsCount(numberOfLivingCells) {\n  if (numberOfLivingCellsElement) numberOfLivingCellsElement.innerText = numberOfLivingCells.toString();\n};\n\nvar changeGeneration = function changeGeneration(generation) {\n  if (generationElement) {\n    generationElement.innerText = generation.toString();\n  }\n};\n\nvar changePaintSpeed = function changePaintSpeed(paintSpeed) {\n  /* Add to the paint speed statistics, keep 20 in memory and\n         get the average of these */\n  var totalPaintSpeed = 0,\n      maxNumberOfPaintSpeeds = 20;\n\n  if (paintSpeeds.length > maxNumberOfPaintSpeeds - 1) {\n    paintSpeeds.shift();\n  }\n\n  paintSpeeds.push(paintSpeed);\n\n  for (var i = 0; i < paintSpeeds.length; i++) {\n    totalPaintSpeed = totalPaintSpeed + paintSpeeds[i];\n  }\n\n  if (paintSpeedElement) {\n    paintSpeedElement.innerText = Math.floor(totalPaintSpeed / paintSpeeds.length).toString();\n  }\n};\nvar changeLifeCalcSpeed = function changeLifeCalcSpeed(lifeCalcSpeed) {\n  /* Add to the life calculation speed statistics, keep 20 in memory and\n         get the average of these */\n  var totalLifeCalcSpeed = 0,\n      maxNumberOfLifeCalcSpeeds = 20;\n\n  if (lifeCalcSpeeds.length > maxNumberOfLifeCalcSpeeds - 1) {\n    lifeCalcSpeeds.shift();\n  }\n\n  lifeCalcSpeeds.push(lifeCalcSpeed);\n\n  for (var i = 0; i < lifeCalcSpeeds.length; i++) {\n    totalLifeCalcSpeed = totalLifeCalcSpeed + lifeCalcSpeeds[i];\n  }\n\n  if (lifeCalcSpeedElement) {\n    lifeCalcSpeedElement.innerText = Math.floor(totalLifeCalcSpeed / lifeCalcSpeeds.length).toString();\n  }\n};\n\n//# sourceURL=webpack:///./src/statistics.js?");

/***/ })

/******/ });