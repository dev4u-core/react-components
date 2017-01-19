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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = vendors;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(1);

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var ClassNameSeparator = ' ';
	var ClassNameBuilder = (function () {
	    function ClassNameBuilder() {
	        this._stack = [];
	    }
	    ClassNameBuilder.prototype.add = function (className) {
	        this._stack.push(function (x) { return x ? (x + ClassNameSeparator + className) : className; });
	        return this;
	    };
	    ClassNameBuilder.prototype.addIf = function (condition, classNameGetter) {
	        if (condition) {
	            this.add(classNameGetter());
	        }
	        return this;
	    };
	    ClassNameBuilder.prototype.addUnique = function (key) {
	        return this;
	    };
	    ClassNameBuilder.prototype.build = function () {
	        var result = null;
	        for (var i = 0; i < this._stack.length; i++) {
	            result = this._stack[i](result);
	        }
	        return result;
	    };
	    return ClassNameBuilder;
	}());
	exports.ClassNameBuilder = ClassNameBuilder;


/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(4);
	var class_name_builder_1 = __webpack_require__(10);
	describe('ClassNameBuilder', function () {
	    describe('add', function () {
	        it('one class', function () {
	            var classNameBuilder = new class_name_builder_1.ClassNameBuilder();
	            classNameBuilder.add('class0');
	            chai_1.expect(classNameBuilder.build()).to.equal('class0');
	        });
	        it('two classes', function () {
	            var classNameBuilder = new class_name_builder_1.ClassNameBuilder();
	            classNameBuilder.add('class0');
	            classNameBuilder.add('class1');
	            chai_1.expect(classNameBuilder.build()).to.equal('class0 class1');
	        });
	    });
	    describe('addIf', function () {
	        it('condition is true', function () {
	            var classNameBuilder = new class_name_builder_1.ClassNameBuilder();
	            classNameBuilder.addIf(true, function () { return 'class0'; });
	            chai_1.expect(classNameBuilder.build()).to.equal('class0');
	        });
	        it('condition is false', function () {
	            var classNameBuilder = new class_name_builder_1.ClassNameBuilder();
	            classNameBuilder.addIf(false, function () { return 'class0'; });
	            chai_1.expect(classNameBuilder.build()).to.equal(null);
	        });
	    });
	});


/***/ }
/******/ ]);