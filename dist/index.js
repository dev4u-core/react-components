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

	__webpack_require__(1);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var data_source_1 = __webpack_require__(3);
	var style_provider_1 = __webpack_require__(4);
	var GridBase = (function (_super) {
	    __extends(GridBase, _super);
	    function GridBase(props) {
	        _super.call(this, props);
	    }
	    GridBase.prototype.componentDidMount = function () {
	        var _this = this;
	        this.props.dataSource.onDataBound = function () { return _this.forceUpdate(); };
	    };
	    GridBase.prototype.getColumnDirection = function (column) {
	        var sortedBy = (this.props.dataSource.view.sortedBy != null)
	            ? this.props.dataSource.view.sortedBy.filter(function (x) { return x.propertyName == column.propertyName; })
	            : null;
	        return (sortedBy != null)
	            && (sortedBy.length == 1)
	            && (sortedBy[0].propertyName == column.propertyName)
	            ? sortedBy[0].direction
	            : null;
	    };
	    GridBase.prototype.handleSortClick = function (column) {
	        var sortedBy = this.props.dataSource.view.sortedBy;
	        var direction = (sortedBy != null)
	            && (sortedBy.length == 1)
	            && (sortedBy[0].propertyName == column.propertyName)
	            && (sortedBy[0].direction == data_source_1.SortDirection.Ascending)
	            ? data_source_1.SortDirection.Descending
	            : data_source_1.SortDirection.Ascending;
	        this.props.dataSource.sort({ direction: direction, propertyName: column.propertyName });
	        this.props.dataSource.dataBind();
	    };
	    Object.defineProperty(GridBase.prototype, "style", {
	        get: function () {
	            return this._style = this._style || style_provider_1.StyleProvider.Instance.getGridStyle();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GridBase;
	}(React.Component));
	exports.GridBase = GridBase;
	var Grid = (function (_super) {
	    __extends(Grid, _super);
	    function Grid() {
	        _super.apply(this, arguments);
	    }
	    Grid.prototype.renderHeaderCell = function (column, index) {
	        var _this = this;
	        var direction = this.getColumnDirection(column);
	        var className = this.style.headerRow.cell.classBySorting[direction];
	        return (React.createElement("th", {key: "grid-header-cell-" + index}, 
	            column.title, 
	            React.createElement("a", {className: className, onClick: function () { return _this.handleSortClick(column); }})));
	    };
	    Grid.prototype.renderRow = function (dataItem, index) {
	        var _this = this;
	        return (React.createElement("tr", {key: "grid-row-" + index}, this.props.columns.map(function (x, i) { return _this.renderRowCell(dataItem, x, i); })));
	    };
	    Grid.prototype.renderRowCell = function (dataItem, column, index) {
	        return (React.createElement("td", {key: "grid-cell-" + index}, dataItem[column.propertyName]));
	    };
	    Grid.prototype.render = function () {
	        var _this = this;
	        return (React.createElement("table", {cellspacing: "0", className: this.style.class, width: "100%"}, 
	            React.createElement("tbody", null, 
	                React.createElement("tr", null, this.props.columns.map(function (x, i) { return _this.renderHeaderCell(x, i); })), 
	                this.props.dataSource.view.data.map(function (x, i) { return _this.renderRow(x, i); }))
	        ));
	    };
	    return Grid;
	}(GridBase));
	exports.Grid = Grid;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	(function (SortDirection) {
	    SortDirection[SortDirection["Ascending"] = 1] = "Ascending";
	    SortDirection[SortDirection["Descending"] = 2] = "Descending";
	})(exports.SortDirection || (exports.SortDirection = {}));
	var SortDirection = exports.SortDirection;
	var ClientDataSource = (function () {
	    function ClientDataSource(data) {
	        this._data = data;
	        this._view = null;
	    }
	    ClientDataSource.prototype.getComparer = function (expressions) {
	        var result = null;
	        for (var i = 0; i < expressions.length; i++) {
	            var comparer = (function (direction, propertyName) {
	                return function (x, y) {
	                    var xValue = x[propertyName];
	                    var yValue = y[propertyName];
	                    if (xValue > yValue)
	                        return (direction == SortDirection.Ascending) ? 1 : -1;
	                    if (xValue < yValue)
	                        return (direction == SortDirection.Ascending) ? -1 : 1;
	                    return 0;
	                };
	            })(expressions[i].direction, expressions[i].propertyName);
	            result = (result != null)
	                ? (function (prevComparer) { return function (x, y) { return prevComparer(x, y); }; })(result)
	                : comparer;
	        }
	        return result;
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
	            x.data = x.data.sort(_this.getComparer(expressions));
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
	}());
	exports.ClientDataSource = ClientDataSource;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var StyleProvider = (function () {
	    function StyleProvider() {
	    }
	    // IStyleProvider Members
	    StyleProvider.prototype.getGridStyle = function () {
	        return {
	            class: null,
	            headerRow: {
	                class: null,
	                cell: {
	                    class: null,
	                    classBySorting: function (direction) { return null; }
	                }
	            },
	            row: {
	                class: null,
	                cell: {
	                    class: null
	                }
	            }
	        };
	    };
	    StyleProvider.Instance = new StyleProvider();
	    return StyleProvider;
	}());
	exports.StyleProvider = StyleProvider;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var panel_1 = __webpack_require__(6);
	(function (PanelContainerMode) {
	    PanelContainerMode[PanelContainerMode["DynamicAndStatic"] = 1] = "DynamicAndStatic";
	    PanelContainerMode[PanelContainerMode["StaticAndDynamic"] = 2] = "StaticAndDynamic";
	})(exports.PanelContainerMode || (exports.PanelContainerMode = {}));
	var PanelContainerMode = exports.PanelContainerMode;
	(function (PanelContainerOrientation) {
	    PanelContainerOrientation[PanelContainerOrientation["Horizontal"] = 1] = "Horizontal";
	    PanelContainerOrientation[PanelContainerOrientation["Vertical"] = 2] = "Vertical";
	})(exports.PanelContainerOrientation || (exports.PanelContainerOrientation = {}));
	var PanelContainerOrientation = exports.PanelContainerOrientation;
	var PanelContainer = (function (_super) {
	    __extends(PanelContainer, _super);
	    function PanelContainer(props) {
	        _super.call(this, props);
	        this.handleDynamicPanelClosed = this.handleDynamicPanelClosed.bind(this);
	        this.handleStaticPanelClosed = this.handleStaticPanelClosed.bind(this);
	        this.handlePanelClosing = this.handlePanelClosing.bind(this);
	        this.state = { dynamicPanels: props.dynamicPanels || [], staticPanels: this.getStaticPanels() };
	    }
	    PanelContainer.prototype.getStaticPanels = function () {
	        return this.props.children
	            ? React.Children.map(this.props.children, function (x) { return x; })
	                .map(function (x) { return x.props; })
	            : [];
	    };
	    PanelContainer.prototype.handleDynamicPanelClosed = function (panel) {
	        var dynamicPanelIndex = this.state.dynamicPanels.indexOf(panel);
	        this.state.dynamicPanels.splice(dynamicPanelIndex, 1);
	        this.forceUpdate();
	    };
	    PanelContainer.prototype.handlePanelClosing = function (panel) {
	        return this.props.onPanelClosing ? this.props.onPanelClosing(panel) : true;
	    };
	    PanelContainer.prototype.handleStaticPanelClosed = function (panel) {
	        var staticPanelIndex = this.state.staticPanels.indexOf(panel);
	        this.state.staticPanels.splice(staticPanelIndex, 1);
	        this.forceUpdate();
	    };
	    PanelContainer.prototype.renderDynamicPanel = function (renderContext, panel, index) {
	        var columnCount = panel.columnCount || renderContext.defaultColumnCount;
	        return React.createElement(panel_1.Panel, {columnCount: columnCount, key: "dynamic_panel_" + index, title: panel.title, onClosed: this.handleDynamicPanelClosed, onClosing: this.handlePanelClosing});
	    };
	    PanelContainer.prototype.renderDynamicPanels = function (renderContext) {
	        var _this = this;
	        return this.state.dynamicPanels.map(function (x, i) { return _this.renderDynamicPanel(renderContext, x, i); });
	    };
	    PanelContainer.prototype.renderStaticPanel = function (renderContext, panel, index) {
	        return React.cloneElement(panel, {
	            columnCount: panel.columnCount || renderContext.defaultColumnCount,
	            key: "static_panel_" + index,
	            onClosed: this.handleStaticPanelClosed,
	            onClosing: this.handlePanelClosing
	        });
	    };
	    PanelContainer.prototype.renderStaticPanels = function (renderContext) {
	        var _this = this;
	        var result = React.Children.map(this.props.children, function (x, i) { return (_this.state.staticPanels.indexOf(x.props) !== -1) ? _this.renderStaticPanel(renderContext, x, i) : null; });
	        return (result != null) ? result.filter(function (x) { return x != null; }) : null;
	    };
	    PanelContainer.prototype.render = function () {
	        var mode = this.props.mode || PanelContainerMode.DynamicAndStatic;
	        var orientation = this.props.orientation || PanelContainerOrientation.Horizontal;
	        var containerClassName = (orientation == PanelContainerOrientation.Horizontal) ? 'row' : 'panel-group';
	        var renderContext = {
	            defaultColumnCount: (orientation == PanelContainerOrientation.Horizontal)
	                ? Math.floor(12 / this.state.dynamicPanels.concat(this.state.staticPanels).length)
	                : null,
	            orientation: orientation
	        };
	        return (React.createElement("div", {className: containerClassName}, 
	            (mode == PanelContainerMode.StaticAndDynamic) ? this.renderStaticPanels(renderContext) : null, 
	            this.renderDynamicPanels(renderContext), 
	            (mode == PanelContainerMode.DynamicAndStatic) ? this.renderStaticPanels(renderContext) : null));
	    };
	    return PanelContainer;
	}(React.Component));
	exports.PanelContainer = PanelContainer;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Panel = (function (_super) {
	    __extends(Panel, _super);
	    function Panel(props) {
	        _super.call(this);
	        this.handleClose = this.handleClose.bind(this);
	    }
	    Panel.prototype.handleClose = function () {
	        var shouldBeClosed = true;
	        if (this.props.onClosing) {
	            shouldBeClosed = this.props.onClosing(this);
	        }
	        if (shouldBeClosed && this.props.onClosed)
	            this.props.onClosed(this);
	    };
	    Panel.prototype.renderBody = function () {
	        return this.props.children;
	    };
	    Panel.prototype.render = function () {
	        var _this = this;
	        var wrapper = this.props.columnCount
	            ? function (panelRenderer) { return React.createElement("div", {className: "col-md-" + _this.props.columnCount}, panelRenderer); }
	            : function (panelRenderer) { return panelRenderer; };
	        return wrapper(React.createElement("div", {className: "panel panel-default"}, 
	            React.createElement("div", {className: "panel-heading"}, 
	                this.props.title, 
	                React.createElement("button", {className: "close", onClick: this.handleClose, type: "button"}, 
	                    React.createElement("span", null, "×")
	                )), 
	            React.createElement("div", {className: "panel-body"}, this.renderBody())));
	    };
	    return Panel;
	}(React.Component));
	exports.Panel = Panel;


/***/ }
/******/ ]);