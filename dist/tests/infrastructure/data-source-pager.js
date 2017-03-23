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

	module.exports = __webpack_require__(23);


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
/* 8 */
/***/ function(module, exports) {

	"use strict";
	(function (DataType) {
	    DataType[DataType["Date"] = 0] = "Date";
	    DataType[DataType["Enum"] = 1] = "Enum";
	    DataType[DataType["String"] = 2] = "String";
	    DataType[DataType["Number"] = 3] = "Number";
	})(exports.DataType || (exports.DataType = {}));
	var DataType = exports.DataType;
	(function (SortDirection) {
	    SortDirection[SortDirection["Ascending"] = 1] = "Ascending";
	    SortDirection[SortDirection["Descending"] = 2] = "Descending";
	})(exports.SortDirection || (exports.SortDirection = {}));
	var SortDirection = exports.SortDirection;


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(8);
	var comparer_1 = __webpack_require__(11);
	var field_accessor_1 = __webpack_require__(12);
	(function (DataSourceState) {
	    DataSourceState[DataSourceState["Empty"] = 0] = "Empty";
	    DataSourceState[DataSourceState["Binding"] = 1] = "Binding";
	    DataSourceState[DataSourceState["Bound"] = 2] = "Bound";
	})(exports.DataSourceState || (exports.DataSourceState = {}));
	var DataSourceState = exports.DataSourceState;
	var ClientDataSource = (function () {
	    function ClientDataSource(data, props) {
	        if (props) {
	            if (props.pageSize) {
	                this._pageSize = props.pageSize;
	                this.setPageIndex(props.pageIndex || 0);
	            }
	            if (props.sortedBy) {
	                this.sort.apply(this, props.sortedBy);
	            }
	            this._fieldAccessor = props.fieldAccessor;
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
	                    return (direction == common_1.SortDirection.Ascending)
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
	    ClientDataSource.prototype.filter = function () {
	        var expressions = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            expressions[_i - 0] = arguments[_i];
	        }
	        this._sort = function (x) {
	            x.filteredBy = expressions;
	            x.data = x.data.filter(expressions[0].expression);
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
	            x.data = (expressions && (expressions.length > 0)) ? x.data.concat().sort(_this.getComparer(expressions)) : x.data;
	        };
	        return this;
	    };
	    Object.defineProperty(ClientDataSource.prototype, "fieldAccessor", {
	        get: function () {
	            return this._fieldAccessor = this._fieldAccessor || new field_accessor_1.DefaultFieldAccessor();
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
	            this._onDataBound.push(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ClientDataSource;
	}());
	exports.ClientDataSource = ClientDataSource;


/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports) {

	"use strict";
	var DefaultFieldAccessor = (function () {
	    function DefaultFieldAccessor() {
	    }
	    DefaultFieldAccessor.prototype.getValue = function (model, compositeField) {
	        var fields = compositeField.split(DefaultFieldAccessor.Separator);
	        var result = model;
	        for (var i = 0; i < fields.length; i++) {
	            result = result[fields[i]];
	            if (!result)
	                break;
	        }
	        return result;
	    };
	    DefaultFieldAccessor.Separator = '.';
	    return DefaultFieldAccessor;
	}());
	exports.DefaultFieldAccessor = DefaultFieldAccessor;


/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(4);
	var data_source_1 = __webpack_require__(10);
	var data_source_pager_1 = __webpack_require__(24);
	describe('DataSourcePager', function () {
	    function createPager(pageSize) {
	        var dataSource = new data_source_1.ClientDataSource([{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], { pageSize: pageSize || 2, pageIndex: 2 });
	        dataSource.dataBind();
	        return new data_source_pager_1.DataSourcePager(dataSource);
	    }
	    describe('canMoveToPage', function () {
	        it('PageType.First if true', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.Last);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.First)).equal(true);
	        });
	        it('PageType.First if false', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.First);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.First)).equal(false);
	        });
	        it('PageType.Last if true', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.First);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.Last)).equal(true);
	        });
	        it('PageType.Last if false', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.Last);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.Last)).equal(false);
	        });
	        it('PageType.Next if true', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.First);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.Next)).equal(true);
	        });
	        it('PageType.Next if false', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.Last);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.Next)).equal(false);
	        });
	        it('PageType.Last if true', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.Last);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.Previous)).equal(true);
	        });
	        it('PageType.Last if false', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.First);
	            chai_1.expect(pager.canMoveToPage(data_source_pager_1.PageType.Previous)).equal(false);
	        });
	    });
	    describe('getPageInfo', function () {
	        it('if total count more then page size', function () {
	            [
	                { pageIndex: 0, pageInfo: { firstIndex: 0, lastIndex: 1 } },
	                { pageIndex: 1, pageInfo: { firstIndex: 2, lastIndex: 3 } },
	                { pageIndex: 2, pageInfo: { firstIndex: 4, lastIndex: 4 } }
	            ].forEach(function (x) {
	                var pager = createPager();
	                var pageInfo = pager.getPageInfo(x.pageIndex);
	                chai_1.expect(pageInfo.firstIndex).to.equal(x.pageInfo.firstIndex, 'firstIndex');
	                chai_1.expect(pageInfo.lastIndex).to.equal(x.pageInfo.lastIndex, 'lastIndex');
	            });
	        });
	        it('if total count less then page size', function () {
	            var pager = createPager(10);
	            var pageInfo = pager.getPageInfo(0);
	            chai_1.expect(pageInfo.firstIndex).to.equal(0, 'firstIndex');
	            chai_1.expect(pageInfo.lastIndex).to.equal(4, 'lastIndex');
	        });
	        it('if data source is empty', function () {
	            var dataSource = new data_source_1.ClientDataSource([], { pageSize: 2, pageIndex: 0 });
	            var pager = new data_source_pager_1.DataSourcePager(dataSource);
	            dataSource.dataBind();
	            var pageInfo = pager.getPageInfo(0);
	            chai_1.expect(pageInfo.firstIndex).to.equal(0, 'firstIndex');
	            chai_1.expect(pageInfo.lastIndex).to.equal(0, 'lastIndex');
	        });
	    });
	    describe('moveToPage', function () {
	        it('PageType.First', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.Last);
	            pager.moveToPage(data_source_pager_1.PageType.First);
	            chai_1.expect(pager.dataSource.view.pageIndex).to.equal(0);
	        });
	        it('PageType.Last', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.First);
	            pager.moveToPage(data_source_pager_1.PageType.Last);
	            chai_1.expect(pager.dataSource.view.pageIndex).to.equal(2);
	        });
	        it('PageType.Next', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.First);
	            pager.moveToPage(data_source_pager_1.PageType.Next);
	            chai_1.expect(pager.dataSource.view.pageIndex).to.equal(1);
	        });
	        it('PageType.Previous', function () {
	            var pager = createPager();
	            pager.moveToPage(data_source_pager_1.PageType.Last);
	            pager.moveToPage(data_source_pager_1.PageType.Previous);
	            chai_1.expect(pager.dataSource.view.pageIndex).to.equal(1);
	        });
	    });
	});


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	(function (PageType) {
	    PageType[PageType["First"] = 0] = "First";
	    PageType[PageType["Next"] = 1] = "Next";
	    PageType[PageType["Last"] = 2] = "Last";
	    PageType[PageType["Previous"] = 3] = "Previous";
	})(exports.PageType || (exports.PageType = {}));
	var PageType = exports.PageType;
	var DataSourcePager = (function () {
	    function DataSourcePager(dataSource) {
	        this._dataSource = dataSource;
	    }
	    DataSourcePager.prototype.getPageIndex = function (pageType) {
	        switch (pageType) {
	            case PageType.First: return 0;
	            case PageType.Last: return this.getPageCount() - 1;
	            case PageType.Next: return this.dataSource.view.pageIndex + 1;
	            case PageType.Previous: return this.dataSource.view.pageIndex - 1;
	        }
	    };
	    DataSourcePager.prototype.canMoveToPage = function (pageType) {
	        var nextPageIndex = this.getPageIndex(pageType);
	        var pageCount = this.getPageCount();
	        return (nextPageIndex >= 0) && (nextPageIndex < pageCount) && (nextPageIndex != this.dataSource.view.pageIndex);
	    };
	    DataSourcePager.prototype.getPageCount = function () {
	        return Math.ceil(this.dataSource.totalCount / this.dataSource.pageSize);
	    };
	    DataSourcePager.prototype.getPageInfo = function (pageIndex) {
	        var lastPageIndex = (pageIndex + 1) * this.dataSource.pageSize - 1;
	        return {
	            firstIndex: pageIndex * this.dataSource.pageSize,
	            lastIndex: (lastPageIndex < this.dataSource.totalCount)
	                ? lastPageIndex
	                : (this.dataSource.totalCount) > 0 ? (this.dataSource.totalCount - 1) : 0
	        };
	    };
	    DataSourcePager.prototype.moveToPage = function (pageType) {
	        if (!this.canMoveToPage(pageType))
	            return;
	        var pageIndex = this.getPageIndex(pageType);
	        this.dataSource.setPageIndex(pageIndex);
	        this.dataSource.dataBind();
	    };
	    Object.defineProperty(DataSourcePager.prototype, "dataSource", {
	        get: function () {
	            return this._dataSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DataSourcePager;
	}());
	exports.DataSourcePager = DataSourcePager;


/***/ }
/******/ ]);