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

	module.exports = __webpack_require__(8);


/***/ },
/* 1 */,
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
	var Comparer = (function () {
	    function Comparer() {
	    }
	    Comparer.toComparedValue = function (value) {
	        if (typeof value == 'string') {
	            return value.toLowerCase();
	        }
	        return (value == false) ? 1 : ((value == true) ? 2 : value);
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
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var comparer_1 = __webpack_require__(4);
	var FieldAccessor = (function () {
	    function FieldAccessor() {
	    }
	    FieldAccessor.prototype.getValue = function (model, compositeField) {
	        var result = model;
	        var fields = compositeField.split(FieldAccessor.Separator);
	        for (var i = 0; i < fields.length; i++) {
	            result = result[fields[i]];
	            if (!result)
	                break;
	        }
	        return result;
	    };
	    FieldAccessor.Separator = '.';
	    return FieldAccessor;
	}());
	exports.FieldAccessor = FieldAccessor;
	(function (SortDirection) {
	    SortDirection[SortDirection["Ascending"] = 1] = "Ascending";
	    SortDirection[SortDirection["Descending"] = 2] = "Descending";
	})(exports.SortDirection || (exports.SortDirection = {}));
	var SortDirection = exports.SortDirection;
	(function (DataSourceState) {
	    DataSourceState[DataSourceState["Empty"] = 0] = "Empty";
	    DataSourceState[DataSourceState["Binding"] = 1] = "Binding";
	    DataSourceState[DataSourceState["Bound"] = 2] = "Bound";
	})(exports.DataSourceState || (exports.DataSourceState = {}));
	var DataSourceState = exports.DataSourceState;
	var ClientDataSource = (function () {
	    function ClientDataSource(data, props) {
	        if (props && props.pageSize) {
	            this._pageSize = props.pageSize;
	            this.setPageIndex(props.pageIndex || 0);
	        }
	        this._data = data;
	        this._onDataBinging = [];
	        this._onDataBound = [];
	        this._state = DataSourceState.Empty;
	        this._view = null;
	    }
	    ClientDataSource.prototype.getComparer = function (expressions) {
	        var _this = this;
	        var result = null;
	        for (var i = 0; i < expressions.length; i++) {
	            var comparer = (function (direction, field) {
	                return function (x, y) {
	                    var xValue = _this.fieldAccessor.getValue(x, field);
	                    var yValue = _this.fieldAccessor.getValue(y, field);
	                    return (direction == SortDirection.Ascending)
	                        ? comparer_1.Comparer.Instance.compare(xValue, yValue)
	                        : comparer_1.Comparer.Instance.compare(yValue, xValue);
	                };
	            })(expressions[i].direction, expressions[i].field);
	            result = (result != null)
	                ? (function (prevComparer) { return function (x, y) { return prevComparer(x, y); }; })(result)
	                : comparer;
	        }
	        return result;
	    };
	    ClientDataSource.prototype.handleDataBinding = function () {
	        this._state = DataSourceState.Binding;
	        for (var i = 0; i < this._onDataBinging.length; i++) {
	            this._onDataBinging[i](this);
	        }
	    };
	    ClientDataSource.prototype.handleDataBound = function () {
	        this._state = DataSourceState.Bound;
	        for (var i = 0; i < this._onDataBound.length; i++) {
	            this._onDataBound[i](this);
	        }
	    };
	    ClientDataSource.prototype.internalDataBind = function (data) {
	        this._view = this._view || {};
	        this._view.data = data;
	        if (this._sort) {
	            this._sort(this._view);
	        }
	        if (this._setPageIndex) {
	            this._setPageIndex(this._view);
	        }
	    };
	    ClientDataSource.prototype.dataBind = function () {
	        var _this = this;
	        this.handleDataBinding();
	        if (this._data != null) {
	            var data = this._data;
	            if (data) {
	                this.internalDataBind(data);
	                this.handleDataBound();
	            }
	            else {
	                this._data().then(function (x) {
	                    _this._data = x;
	                    _this.internalDataBind(x);
	                    _this.handleDataBound();
	                });
	            }
	        }
	    };
	    ClientDataSource.prototype.setPageIndex = function (value) {
	        var _this = this;
	        this._setPageIndex = function (x) {
	            x.pageIndex = value;
	            x.data = x.data.slice(_this.pageSize * value, _this.pageSize * (value + 1));
	        };
	        return this;
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
	        return this;
	    };
	    Object.defineProperty(ClientDataSource.prototype, "fieldAccessor", {
	        get: function () {
	            return this._fieldAccessor = this._fieldAccessor || new FieldAccessor();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientDataSource.prototype, "pageSize", {
	        get: function () {
	            return this._pageSize;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientDataSource.prototype, "state", {
	        get: function () {
	            return this._state;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientDataSource.prototype, "totalCount", {
	        get: function () {
	            return this._data.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientDataSource.prototype, "view", {
	        get: function () {
	            return this._view;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientDataSource.prototype, "onDataBinding", {
	        set: function (value) {
	            this._onDataBinging.push(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ClientDataSource.prototype, "onDataBound", {
	        set: function (value) {
	            this._onDataBinging.push(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ClientDataSource;
	}());
	exports.ClientDataSource = ClientDataSource;


/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(2);
	var data_source_1 = __webpack_require__(6);
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
	    describe('paging', function () {
	        var data = [{ field: 'value0' }, { field: 'value1' }, { field: 'value2' }];
	        it('default', function () {
	            var dataSource = new data_source_1.ClientDataSource(data, { pageSize: 1 });
	            dataSource.dataBind();
	            chai_1.expect(dataSource.view.pageIndex).to.equal(0, 'pageIndex');
	            chai_1.expect(dataSource.view.data.length).to.equal(1, 'data.length');
	            chai_1.expect(dataSource.view.data[0].field).to.equal('value0', 'data[0].field');
	        });
	        it('setPageIndex', function () {
	            [{ pageIndex: 0 }, { pageIndex: 1 }, { pageIndex: 2 }]
	                .forEach(function (x, i) {
	                var dataSource = new data_source_1.ClientDataSource(data, { pageSize: 1 });
	                dataSource.setPageIndex(x.pageIndex).dataBind();
	                chai_1.expect(dataSource.view.pageIndex).to.equal(x.pageIndex, 'pageIndex');
	                chai_1.expect(dataSource.view.data.length).to.equal(1, 'data.length');
	                chai_1.expect(dataSource.view.data[0].field).to.equal('value' + x.pageIndex, 'data[0].field');
	            });
	        });
	    });
	    describe('sort', function () {
	        var testCases = [
	            [{ booleanField: true, stringField: 'value0' }, { booleanField: false, stringField: 'value1' }, { booleanField: null, stringField: 'value2' }],
	            [{ booleanField: null, stringField: 'value2' }, { booleanField: true, stringField: 'value0' }, { booleanField: false, stringField: 'value1' }],
	            [{ booleanField: null, stringField: 'value2' }, { booleanField: false, stringField: 'value1' }, { booleanField: true, stringField: 'value0' }]
	        ];
	        it('"SortDirection.Ascending" by one field', function () {
	            testCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource
	                    .sort({ direction: data_source_1.SortDirection.Ascending, field: 'stringField' })
	                    .dataBind();
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Ascending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('stringField', 'sortedBy[0].field');
	            });
	        });
	        it('"SortDirection.Descending" by one field', function () {
	            testCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource
	                    .sort({ direction: data_source_1.SortDirection.Descending, field: 'stringField' })
	                    .dataBind();
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Descending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('stringField', 'sortedBy[0].field');
	            });
	        });
	        it('"SortDirection.Ascending" by one "boolean" field', function () {
	            testCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource
	                    .sort({ direction: data_source_1.SortDirection.Ascending, field: 'booleanField' })
	                    .dataBind();
	                chai_1.expect(dataSource.view.data[0].booleanField).to.equal(null);
	                chai_1.expect(dataSource.view.data[1].booleanField).to.equal(false);
	                chai_1.expect(dataSource.view.data[2].booleanField).to.equal(true);
	            });
	        });
	        it('"SortDirection.Descending" by one "boolean" field', function () {
	            testCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource
	                    .sort({ direction: data_source_1.SortDirection.Descending, field: 'booleanField' })
	                    .dataBind();
	                chai_1.expect(dataSource.view.data[0].booleanField).to.equal(true);
	                chai_1.expect(dataSource.view.data[1].booleanField).to.equal(false);
	                chai_1.expect(dataSource.view.data[2].booleanField).to.equal(null);
	            });
	        });
	        it('"SortDirection.Ascending" by one "string" field', function () {
	            testCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource
	                    .sort({ direction: data_source_1.SortDirection.Ascending, field: 'stringField' })
	                    .dataBind();
	                chai_1.expect(dataSource.view.data[0].stringField).to.equal('value0');
	                chai_1.expect(dataSource.view.data[1].stringField).to.equal('value1');
	                chai_1.expect(dataSource.view.data[2].stringField).to.equal('value2');
	            });
	        });
	        it('"SortDirection.Descending" by one "string" field', function () {
	            testCases.forEach(function (x) {
	                var dataSource = new data_source_1.ClientDataSource(x);
	                dataSource
	                    .sort({ direction: data_source_1.SortDirection.Descending, field: 'stringField' })
	                    .dataBind();
	                chai_1.expect(dataSource.view.data[0].stringField).to.equal('value2');
	                chai_1.expect(dataSource.view.data[1].stringField).to.equal('value1');
	                chai_1.expect(dataSource.view.data[2].stringField).to.equal('value0');
	            });
	        });
	    });
	});


/***/ }
/******/ ]);