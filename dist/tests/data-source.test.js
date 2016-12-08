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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(2);
	var data_source_1 = __webpack_require__(4);
	describe('ClientDataSource', function () {
	    it('dataBind', function () {
	        var data = [{ field: 'value0' }, { field: 'value1' }, { field: 'value2' }];
	        var dataSource = new data_source_1.ClientDataSource(data);
	        chai_1.expect(dataSource.view).to.be.null;
	        dataSource.dataBind();
	        chai_1.expect(dataSource.view.data[0].field).to.equal('value0');
	        chai_1.expect(dataSource.view.data[1].field).to.equal('value1');
	        chai_1.expect(dataSource.view.data[2].field).to.equal('value2');
	    });
	    describe('sort', function () {
	        var dataByCases = [
	            [{ booleanField: true, stringField: 'value0' }, { booleanField: false, stringField: 'value1' }, { booleanField: null, stringField: 'value2' }],
	            [{ booleanField: null, stringField: 'value2' }, { booleanField: true, stringField: 'value0' }, { booleanField: false, stringField: 'value1' }],
	            [{ booleanField: null, stringField: 'value2' }, { booleanField: false, stringField: 'value1' }, { booleanField: true, stringField: 'value0' }]
	        ];
	        it('"SortDirection.Ascending" by one field', function () {
	            dataByCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource.sort({ direction: data_source_1.SortDirection.Ascending, field: 'stringField' });
	                dataSource.dataBind();
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Ascending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('stringField', 'sortedBy[0].field');
	            });
	        });
	        it('"SortDirection.Descending" by one field', function () {
	            dataByCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource.sort({ direction: data_source_1.SortDirection.Descending, field: 'stringField' });
	                dataSource.dataBind();
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Descending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('stringField', 'sortedBy[0].field');
	            });
	        });
	        it('"SortDirection.Ascending" by one "boolean" field', function () {
	            dataByCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource.sort({ direction: data_source_1.SortDirection.Ascending, field: 'booleanField' });
	                dataSource.dataBind();
	                chai_1.expect(dataSource.view.data[0].booleanField).to.equal(null);
	                chai_1.expect(dataSource.view.data[1].booleanField).to.equal(false);
	                chai_1.expect(dataSource.view.data[2].booleanField).to.equal(true);
	            });
	        });
	        it('"SortDirection.Descending" by one "boolean" field', function () {
	            dataByCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource.sort({ direction: data_source_1.SortDirection.Descending, field: 'booleanField' });
	                dataSource.dataBind();
	                chai_1.expect(dataSource.view.data[0].booleanField).to.equal(true);
	                chai_1.expect(dataSource.view.data[1].booleanField).to.equal(false);
	                chai_1.expect(dataSource.view.data[2].booleanField).to.equal(null);
	            });
	        });
	        it('"SortDirection.Ascending" by one "string" field', function () {
	            dataByCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource.sort({ direction: data_source_1.SortDirection.Ascending, field: 'stringField' });
	                dataSource.dataBind();
	                chai_1.expect(dataSource.view.data[0].stringField).to.equal('value0');
	                chai_1.expect(dataSource.view.data[1].stringField).to.equal('value1');
	                chai_1.expect(dataSource.view.data[2].stringField).to.equal('value2');
	            });
	        });
	        it('"SortDirection.Descending" by one "string" field', function () {
	            dataByCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource.sort({ direction: data_source_1.SortDirection.Descending, field: 'stringField' });
	                dataSource.dataBind();
	                chai_1.expect(dataSource.view.data[0].stringField).to.equal('value2');
	                chai_1.expect(dataSource.view.data[1].stringField).to.equal('value1');
	                chai_1.expect(dataSource.view.data[2].stringField).to.equal('value0');
	            });
	        });
	    });
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(1);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = vendors;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	(function (SortDirection) {
	    SortDirection[SortDirection["Ascending"] = 1] = "Ascending";
	    SortDirection[SortDirection["Descending"] = 2] = "Descending";
	})(exports.SortDirection || (exports.SortDirection = {}));
	var SortDirection = exports.SortDirection;
	var DataSource = (function () {
	    function DataSource() {
	    }
	    DataSource.prototype.getValue = function (model, compositeField) {
	        var result = model;
	        var fields = compositeField.split('.');
	        for (var i = 0; i < fields.length; i++) {
	            result = result[fields[i]];
	            if (!result)
	                break;
	        }
	        return result;
	    };
	    Object.defineProperty(DataSource.prototype, "view", {
	        get: function () { },
	        enumerable: true,
	        configurable: true
	    });
	    return DataSource;
	}());
	exports.DataSource = DataSource;
	var ClientDataSource = (function (_super) {
	    __extends(ClientDataSource, _super);
	    function ClientDataSource(data) {
	        _super.call(this);
	        this._data = data;
	        this._view = null;
	    }
	    ClientDataSource.prototype.getComparer = function (expressions) {
	        var _this = this;
	        var result = null;
	        for (var i = 0; i < expressions.length; i++) {
	            var comparer = (function (direction, field) {
	                return function (x, y) {
	                    var xValue = _this.toComparedValue(_this.getValue(x, field));
	                    var yValue = _this.toComparedValue(_this.getValue(y, field));
	                    if (xValue > yValue)
	                        return (direction == SortDirection.Ascending) ? 1 : -1;
	                    if (xValue < yValue)
	                        return (direction == SortDirection.Ascending) ? -1 : 1;
	                    return 0;
	                };
	            })(expressions[i].direction, expressions[i].field);
	            result = (result != null)
	                ? (function (prevComparer) { return function (x, y) { return prevComparer(x, y); }; })(result)
	                : comparer;
	        }
	        return result;
	    };
	    ClientDataSource.prototype.toComparedValue = function (value) {
	        return (value == true) ? 1 : ((value == true) ? 0 : value);
	    };
	    // IDataSource<T> Members
	    ClientDataSource.prototype.dataBind = function () {
	        this._view = this._view || {};
	        this._view.data = this._data;
	        if (this._sort != null) {
	            this._sort(this._view);
	            this._sort = null;
	        }
	        if (this._onDataBound != null) {
	            this._onDataBound(this._view);
	        }
	    };
	    ClientDataSource.prototype.sort = function () {
	        var _this = this;
	        var expressions = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            expressions[_i - 0] = arguments[_i];
	        }
	        this._sort = function (x) {
	            x.sortedBy = expressions;
	            x.data = expressions ? x.data.sort(_this.getComparer(expressions)) : x.data;
	        };
	    };
	    Object.defineProperty(ClientDataSource.prototype, "view", {
	        get: function () {
	            return this._view;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientDataSource.prototype, "onDataBound", {
	        set: function (value) {
	            this._onDataBound = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ClientDataSource;
	}(DataSource));
	exports.ClientDataSource = ClientDataSource;


/***/ }
/******/ ]);