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

	module.exports = __webpack_require__(19);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = vendors;

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(1);

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(4);
	var css_class_name_generator_1 = __webpack_require__(20);
	describe('ClassNameGenerator', function () {
	    describe('generate', function () {
	        it('result is different', function () {
	            var classNameGenerator = new css_class_name_generator_1.CssClassNameGenerator();
	            var className0 = classNameGenerator.generate();
	            var className1 = classNameGenerator.generate();
	            chai_1.expect(className0).is.not.null;
	            chai_1.expect(className1).is.not.null;
	            chai_1.expect(className0).to.not.equal(className1);
	        });
	    });
	    describe('generateByKey', function () {
	        it('result is the same', function () {
	            var classNameGenerator = new css_class_name_generator_1.CssClassNameGenerator();
	            var className0 = classNameGenerator.generateByKey('0');
	            var className1 = classNameGenerator.generateByKey('0');
	            chai_1.expect(className0).is.not.null;
	            chai_1.expect(className1).is.not.null;
	            chai_1.expect(className0).to.equal(className1);
	        });
	    });
	});


/***/ },

/***/ 20:
/***/ function(module, exports) {

	"use strict";
	var CssClassNameGenerator = (function () {
	    function CssClassNameGenerator() {
	        this._byKey = {};
	    }
	    CssClassNameGenerator.prototype.generate = function () {
	        return '--' + ('00000000' + (Math.random() * Math.pow(36, 8) << 0).toString(36)).slice(-8);
	    };
	    CssClassNameGenerator.prototype.generateByKey = function (key) {
	        var result = this._byKey[key];
	        if (!result) {
	            result = this.generate();
	            this._byKey[key] = result;
	        }
	        return result;
	    };
	    return CssClassNameGenerator;
	}());
	exports.CssClassNameGenerator = CssClassNameGenerator;


/***/ }

/******/ });