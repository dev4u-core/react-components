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

	module.exports = __webpack_require__(20);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = vendors;

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(1);

/***/ },

/***/ 11:
/***/ function(module, exports) {

	"use strict";
	var CssClassSerializer = (function () {
	    function CssClassSerializer() {
	    }
	    CssClassSerializer.prototype.serialize = function (cssClass) {
	        return cssClass.selector
	            ? "." + cssClass.name + ": " + cssClass.selector + " { " + cssClass.styles + " }"
	            : "." + cssClass.name + " { " + cssClass.styles + " }";
	    };
	    CssClassSerializer.instance = new CssClassSerializer();
	    return CssClassSerializer;
	}());
	exports.CssClassSerializer = CssClassSerializer;


/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(4);
	var css_class_serializer_1 = __webpack_require__(11);
	describe('CssClassSerializer', function () {
	    describe('serialize', function () {
	        it('selector is null', function () {
	            var cssClass = {
	                name: 'class0',
	                styles: 'content: \'value0\''
	            };
	            var value = css_class_serializer_1.CssClassSerializer.instance.serialize(cssClass);
	            chai_1.expect(value).to.equal('.class0 { content: \'value0\' }');
	        });
	        it('selector is not null', function () {
	            var cssClass = {
	                name: 'class0',
	                selector: 'after',
	                styles: 'content: \'value0\''
	            };
	            var value = css_class_serializer_1.CssClassSerializer.instance.serialize(cssClass);
	            chai_1.expect(value).to.equal('.class0: after { content: \'value0\' }');
	        });
	    });
	});


/***/ }

/******/ });