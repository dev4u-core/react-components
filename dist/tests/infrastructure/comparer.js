/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = vendors;

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(1);

/***/ },

/***/ 9:
/***/ function(module, exports) {

	"use strict";
	var Comparer = (function () {
	    function Comparer() {
	    }
	    Comparer.toComparedValue = function (value) {
	        if (typeof value == 'string') {
	            return value.toLowerCase();
	        }
	        return (value === false) ? 1 : ((value === true) ? 2 : value);
	    };
	    Comparer.prototype.compare = function (x, y) {
	        var xValue = Comparer.toComparedValue(x);
	        var yValue = Comparer.toComparedValue(y);
	        if (xValue > yValue)
	            return 1;
	        if (xValue < yValue)
	            return -1;
	        return 0;
	    };
	    Comparer.Instance = new Comparer();
	    return Comparer;
	}());
	exports.Comparer = Comparer;


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(4);
	var comparer_1 = __webpack_require__(9);
	describe('Comparer', function () {
	    it('compare boolean values', function () {
	        [
	            { x: true, y: true, result: 0 },
	            { x: true, y: false, result: 1 },
	            { x: true, y: null, result: 1 },
	            { x: false, y: true, result: -1 },
	            { x: false, y: false, result: 0 },
	            { x: false, y: null, result: 1 },
	            { x: null, y: true, result: -1 },
	            { x: null, y: false, result: -1 },
	            { x: null, y: null, result: 0 }
	        ].forEach(function (testCase) {
	            chai_1.expect(comparer_1.Comparer.Instance.compare(testCase.x, testCase.y)).to.equal(testCase.result, "x: " + testCase.x + ", y: " + testCase.y);
	        });
	    });
	    it('compare string values', function () {
	        [
	            { x: 'value0', y: 'value0', result: 0 },
	            { x: 'VALUE0', y: 'value0', result: 0 },
	            { x: 'value0', y: 'value1', result: -1 },
	            { x: 'value1', y: 'value0', result: 1 }
	        ].forEach(function (testCase) {
	            chai_1.expect(comparer_1.Comparer.Instance.compare(testCase.x, testCase.y)).to.equal(testCase.result, "x: " + testCase.x + ", y: " + testCase.y);
	        });
	    });
	});


/***/ }

/******/ });