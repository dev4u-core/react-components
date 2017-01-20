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
	var Enzyme = __webpack_require__(2);
	var chai_1 = __webpack_require__(4);
	var React = __webpack_require__(5);
	var grid_1 = __webpack_require__(6);
	var grid_column_1 = __webpack_require__(7);
	var data_source_1 = __webpack_require__(8);
	describe('<Grid />', function () {
	    describe('behaviour', function () {
	        describe('sorting', function () {
	            var dataSource;
	            var grid;
	            beforeEach(function () {
	                dataSource = new data_source_1.ClientDataSource([]);
	                dataSource.dataBind();
	                grid = Enzyme.mount(React.createElement(grid_1.Grid, {dataSource: dataSource}, 
	                    React.createElement(grid_column_1.GridColumn, {field: "title", title: "Title"}), 
	                    React.createElement(grid_column_1.GridColumn, {field: "description", title: "Description"})));
	            });
	            it('one click on first column', function () {
	                grid.find('th a').first().simulate('click');
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Ascending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
	            });
	            it('one click on first column and one click by last column', function () {
	                grid.find('th a').first().simulate('click');
	                grid.find('th a').last().simulate('click');
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Ascending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('description', 'sortedBy[0].field');
	            });
	            it('two click on first column', function () {
	                grid.find('th a')
	                    .first()
	                    .simulate('click')
	                    .simulate('click');
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Descending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('title', 'sortedBy[0].field');
	            });
	            it('three click on first column', function () {
	                grid.find('th a')
	                    .first()
	                    .simulate('click')
	                    .simulate('click')
	                    .simulate('click');
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(0, 'sortedBy.length');
	            });
	            it('two click on first column and one click on last column', function () {
	                grid.find('th a')
	                    .first()
	                    .simulate('click')
	                    .simulate('click');
	                grid.find('th a')
	                    .last()
	                    .simulate('click');
	                chai_1.expect(dataSource.view.sortedBy.length).to.equal(1, 'sortedBy.length');
	                chai_1.expect(dataSource.view.sortedBy[0].direction).to.equal(data_source_1.SortDirection.Ascending, 'sortedBy[0].direction');
	                chai_1.expect(dataSource.view.sortedBy[0].field).to.equal('description', 'sortedBy[0].field');
	            });
	        });
	    });
	    describe('property', function () {
	        var cssClass = {
	            name: 'class0',
	            styles: 'content: \'value0\';'
	        };
	        describe('body', function () {
	            it('className', function () {
	                var grid = Enzyme.mount(React.createElement(grid_1.Grid, {autoBind: true, dataSource: new data_source_1.ClientDataSource([{}])}, 
	                    React.createElement(grid_column_1.GridColumn, {body: { className: 'class0' }, field: "title", title: "Title"})
	                ));
	                chai_1.expect(grid.find("tbody td.class0").length).to.equal(1);
	            });
	            it('classTemplate', function () {
	                var grid = Enzyme.mount(React.createElement(grid_1.Grid, {autoBind: true, dataSource: new data_source_1.ClientDataSource([{}])}, 
	                    React.createElement(grid_column_1.GridColumn, {body: { classTemplate: function () { return cssClass; } }, field: "title", title: "Title"})
	                ));
	                chai_1.expect(grid.find("tbody td.class0").length).to.equal(1);
	                chai_1.expect(grid.find('style').html()).to.equal('<style>.class0 { content: \'value0\'; }</style>');
	            });
	        });
	        describe('header', function () {
	            it('className', function () {
	                var grid = Enzyme.mount(React.createElement(grid_1.Grid, {autoBind: true, dataSource: new data_source_1.ClientDataSource([{}])}, 
	                    React.createElement(grid_column_1.GridColumn, {header: { className: 'class0' }, field: "title", title: "Title"})
	                ));
	                chai_1.expect(grid.find("th.class0").length).to.equal(1);
	            });
	            it('classTemplate', function () {
	                var grid = Enzyme.mount(React.createElement(grid_1.Grid, {autoBind: true, dataSource: new data_source_1.ClientDataSource([{}])}, 
	                    React.createElement(grid_column_1.GridColumn, {header: { classTemplate: function () { return cssClass; } }, field: "title", title: "Title"})
	                ));
	                chai_1.expect(grid.find("th.class0").length).to.equal(1);
	                chai_1.expect(grid.find('style').html()).to.equal('<style>.class0 { content: \'value0\'; }</style>');
	            });
	        });
	    });
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(41);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = vendors;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(1);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(43);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var grid_column_1 = __webpack_require__(7);
	var css_class_name_builder_1 = __webpack_require__(10);
	var css_class_serializer_1 = __webpack_require__(11);
	var data_source_1 = __webpack_require__(8);
	var style_provider_1 = __webpack_require__(12);
	var GridBase = (function (_super) {
	    __extends(GridBase, _super);
	    function GridBase(props) {
	        _super.call(this, props);
	        this.state = { expandedDetailRows: [] };
	    }
	    GridBase.prototype.componentWillMount = function () {
	        this.setDataSource(this.props.dataSource);
	    };
	    GridBase.prototype.componentWillUpdate = function () {
	        this._columns = null;
	        this._detailColumn = null;
	    };
	    GridBase.prototype.componentWillReceiveProps = function (nextProps) {
	        if ((this.props.dataSource != nextProps.dataSource) && (nextProps.dataSource != null)) {
	            this.setDataSource(nextProps.dataSource);
	        }
	    };
	    GridBase.prototype.getCellClassName = function (column, cellProps) {
	        var classNameBuilder = new css_class_name_builder_1.CssClassNameBuilder();
	        if (cellProps) {
	            console.log((cellProps.classTemplate != null));
	            classNameBuilder
	                .add(cellProps.className)
	                .addIf((cellProps.classTemplate != null) && (cellProps.classTemplate(column) != null), function () { return cellProps.classTemplate(column).name; });
	        }
	        return classNameBuilder.build();
	    };
	    GridBase.prototype.renderDetailRow = function (model, rowIndex) {
	        return this.detailColumn ? this.detailColumn.renderDetailRow(model, rowIndex) : null;
	    };
	    GridBase.prototype.renderBodyCell = function (column, model, columnIndex, rowIndex) {
	        return column.renderBody(model, rowIndex);
	    };
	    GridBase.prototype.renderHeaderCell = function (column, columnIndex) {
	        return column.renderHeader();
	    };
	    GridBase.prototype.renderStyleSection = function () {
	        var headerStyles = this.columns.filter(function (x) { return x.props.header && x.props.header.classTemplate; })
	            .map(function (x) { return css_class_serializer_1.CssClassSerializer.instance.serialize(x.props.header.classTemplate(x)); })
	            .join();
	        var bodyStyles = this.columns.filter(function (x) { return x.props.body && x.props.body.classTemplate; })
	            .map(function (x) { return css_class_serializer_1.CssClassSerializer.instance.serialize(x.props.body.classTemplate(x)); })
	            .join();
	        var footerStyles = this.columns.filter(function (x) { return x.props.footer && x.props.footer.classTemplate; })
	            .map(function (x) { return css_class_serializer_1.CssClassSerializer.instance.serialize(x.props.footer.classTemplate(x)); })
	            .join();
	        return React.createElement("style", null, headerStyles + bodyStyles + footerStyles);
	    };
	    GridBase.prototype.setDataSource = function (dataSource) {
	        var _this = this;
	        if ((this.props.autoBind != false) && (dataSource.state == data_source_1.DataSourceState.Empty)) {
	            dataSource.dataBind();
	        }
	        if (dataSource) {
	            dataSource.onDataBound = function (dataSource) {
	                if (dataSource == _this.props.dataSource) {
	                    _this.forceUpdate();
	                }
	            };
	        }
	    };
	    Object.defineProperty(GridBase.prototype, "columns", {
	        get: function () {
	            var _this = this;
	            return this._columns = this._columns
	                || React.Children.toArray(this.props.children)
	                    .map(function (x) { return new x.type(x.props, _this); })
	                    .filter(function (x) { return x instanceof grid_column_1.GridColumnBase; });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridBase.prototype, "detailColumn", {
	        get: function () {
	            return this._detailColumn = this._detailColumn
	                || this.columns.find(function (x) { return x instanceof grid_column_1.DetailGridColumn; });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridBase.prototype, "style", {
	        get: function () {
	            return this._style = this._style || this.props.style || style_provider_1.StyleProvider.Instance.getGridStyle();
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
	    Grid.prototype.renderBody = function () {
	        var _this = this;
	        return (React.createElement("tbody", null, this.props.dataSource.view
	            ? this.props.dataSource.view.data.map(function (x, i) {
	                return (_this.state.expandedDetailRows.indexOf(x) != -1)
	                    ? [_this.renderBodyRow(x, i), _this.renderDetailRow(x, i)]
	                    : [_this.renderBodyRow(x, i)];
	            })
	            : null));
	    };
	    Grid.prototype.renderBodyCell = function (column, model, columnIndex, rowIndex) {
	        return (React.createElement("td", {className: this.getCellClassName(column, column.props.body), key: rowIndex + "_" + columnIndex}, _super.prototype.renderBodyCell.call(this, column, model, columnIndex, rowIndex)));
	    };
	    Grid.prototype.renderBodyRow = function (model, rowIndex) {
	        var _this = this;
	        return (React.createElement("tr", {key: rowIndex}, this.columns.map(function (x, i) { return _this.renderBodyCell(x, model, i, rowIndex); })));
	    };
	    Grid.prototype.renderDetailRow = function (model, rowIndex) {
	        return (React.createElement("tr", null, 
	            React.createElement("td", {colSpan: this.columns.length}, _super.prototype.renderDetailRow.call(this, model, rowIndex))
	        ));
	    };
	    Grid.prototype.renderHeader = function () {
	        return (React.createElement("thead", null, this.renderHeaderRow()));
	    };
	    Grid.prototype.renderHeaderCell = function (column, columnIndex) {
	        return (React.createElement("th", {className: this.getCellClassName(column, column.props.header), key: columnIndex}, _super.prototype.renderHeaderCell.call(this, column, columnIndex)));
	    };
	    Grid.prototype.renderHeaderRow = function () {
	        var _this = this;
	        return (React.createElement("tr", null, this.columns.map(function (x, i) { return _this.renderHeaderCell(x, i); })));
	    };
	    Grid.prototype.render = function () {
	        return (React.createElement("div", null, 
	            this.renderStyleSection(), 
	            React.createElement("table", {className: this.style.class}, 
	                this.renderHeader(), 
	                this.renderBody())));
	    };
	    return Grid;
	}(GridBase));
	exports.Grid = Grid;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(5);
	var data_source_1 = __webpack_require__(8);
	var GridColumnBase = (function (_super) {
	    __extends(GridColumnBase, _super);
	    function GridColumnBase(props, grid) {
	        _super.call(this, props);
	        this._grid = grid;
	        this.handleClickToSort = this.handleClickToSort.bind(this);
	    }
	    GridColumnBase.prototype.getSortDirection = function () {
	        var _this = this;
	        var sortedBy = (this.grid.props.dataSource.view && this.grid.props.dataSource.view.sortedBy)
	            ? this.grid.props.dataSource.view.sortedBy.filter(function (x) { return x.field == _this.props.field; })
	            : null;
	        return (sortedBy != null)
	            && (sortedBy.length == 1)
	            && (sortedBy[0].field == this.props.field)
	            ? sortedBy[0].direction
	            : null;
	    };
	    GridColumnBase.prototype.handleClickToSort = function () {
	        var _this = this;
	        var dataSource = this.grid.props.dataSource;
	        var sortedBy = null;
	        if (dataSource.view && dataSource.view.sortedBy) {
	            sortedBy = dataSource.view.sortedBy.filter(function (x) { return x.field == _this.props.field; });
	            sortedBy = (sortedBy.length == 1) ? sortedBy[0] : null;
	        }
	        var direction = (sortedBy != null)
	            ? ((sortedBy.direction == data_source_1.SortDirection.Ascending) ? data_source_1.SortDirection.Descending : null)
	            : data_source_1.SortDirection.Ascending;
	        if (direction) {
	            dataSource.sort({ direction: direction, field: this.props.field });
	        }
	        else {
	            dataSource.sort();
	        }
	        dataSource.dataBind();
	    };
	    GridColumnBase.prototype.renderBody = function (model, index) {
	        return this.props.children
	            ? React.Children.only(this.props.children)
	            : ((this.props.body && this.props.body.template) ? this.props.body.template(this, model) : model[this.props.field]);
	    };
	    GridColumnBase.prototype.renderFooter = function () {
	        return (this.props.footer && this.props.footer.template) ? this.props.footer.template(this) : null;
	    };
	    GridColumnBase.prototype.renderHeader = function () {
	        return (this.props.header && this.props.header.template) ? this.props.header.template(this) : null;
	    };
	    Object.defineProperty(GridColumnBase.prototype, "grid", {
	        get: function () {
	            return this._grid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GridColumnBase;
	}(React.Component));
	exports.GridColumnBase = GridColumnBase;
	var GridColumn = (function (_super) {
	    __extends(GridColumn, _super);
	    function GridColumn() {
	        _super.apply(this, arguments);
	    }
	    GridColumn.prototype.renderBody = function (model, index) {
	        return this.props.children
	            ? React.Children.only(this.props.children)
	            : (this.props.body && this.props.body.template
	                ? this.props.body.template(this, model)
	                : (this.props.field ? (React.createElement("span", null, model[this.props.field])) : null));
	    };
	    GridColumn.prototype.renderFooter = function () {
	        return (this.props.footer && this.props.footer.template) ? this.props.footer.template(this) : null;
	    };
	    GridColumn.prototype.renderHeader = function () {
	        var _this = this;
	        var direction = this.getSortDirection();
	        var className = ''; //this.style.headerRow.cell.classBySorting[direction];
	        return _super.prototype.renderHeader.call(this)
	            || ((this.props.isSortable != false)
	                ? React.createElement("a", {href: "javascript:", onClick: function () { return _this.handleClickToSort(); }}, this.props.title)
	                : React.createElement("span", null, this.props.title));
	    };
	    return GridColumn;
	}(GridColumnBase));
	exports.GridColumn = GridColumn;
	var DetailGridColumn = (function (_super) {
	    __extends(DetailGridColumn, _super);
	    function DetailGridColumn(props, grid) {
	        _super.call(this, props, grid);
	        this.handleClickToExpandOrCollapseDetail = this.handleClickToExpandOrCollapseDetail.bind(this);
	    }
	    DetailGridColumn.prototype.handleClickToExpandOrCollapseDetail = function (model) {
	        var index = this.grid.state.expandedDetailRows.indexOf(model);
	        if (index !== -1) {
	            this.grid.state.expandedDetailRows.splice(index, 1);
	        }
	        else {
	            this.grid.state.expandedDetailRows.push(model);
	        }
	        this.grid.forceUpdate();
	    };
	    DetailGridColumn.prototype.renderBody = function (model, rowIndex) {
	        var _this = this;
	        return (React.createElement("a", {href: "javascript:", onClick: function () { return _this.handleClickToExpandOrCollapseDetail(model); }}, (this.grid.state.expandedDetailRows.indexOf(model) != -1) ? '-' : '+'));
	    };
	    DetailGridColumn.prototype.renderDetailRow = function (model, rowIndex) {
	        return this.props.detailRowTemplate ? this.props.detailRowTemplate(this, model, rowIndex) : null;
	    };
	    return DetailGridColumn;
	}(GridColumnBase));
	exports.DetailGridColumn = DetailGridColumn;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var comparer_1 = __webpack_require__(9);
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
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var ClassNameSeparator = ' ';
	var CssClassNameBuilder = (function () {
	    function CssClassNameBuilder() {
	        this._stack = [];
	    }
	    CssClassNameBuilder.prototype.add = function (className) {
	        this._stack.push(function (x) { return x ? (x + ClassNameSeparator + className) : className; });
	        return this;
	    };
	    CssClassNameBuilder.prototype.addIf = function (condition, classNameGetter) {
	        if (condition) {
	            this.add(classNameGetter());
	        }
	        return this;
	    };
	    CssClassNameBuilder.prototype.build = function () {
	        var result = null;
	        for (var i = 0; i < this._stack.length; i++) {
	            result = this._stack[i](result);
	        }
	        return result;
	    };
	    return CssClassNameBuilder;
	}());
	exports.CssClassNameBuilder = CssClassNameBuilder;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var CssClassSerializer = (function () {
	    function CssClassSerializer() {
	    }
	    CssClassSerializer.prototype.serialize = function (cssClass) {
	        var result = cssClass.selector
	            ? "." + cssClass.name + ":" + cssClass.selector + " { " + cssClass.styles + " }"
	            : "." + cssClass.name + " { " + cssClass.styles + " }";
	        if (cssClass.media) {
	            result = "@media " + cssClass.media + " { " + result + " }";
	        }
	        return result;
	    };
	    CssClassSerializer.instance = new CssClassSerializer();
	    return CssClassSerializer;
	}());
	exports.CssClassSerializer = CssClassSerializer;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	var StyleType;
	(function (StyleType) {
	    StyleType[StyleType["GridStyle"] = 0] = "GridStyle";
	})(StyleType || (StyleType = {}));
	var StyleProvider = (function () {
	    function StyleProvider() {
	        this._styles = {};
	    }
	    StyleProvider.prototype.getGridStyle = function () {
	        return this._styles[StyleType.GridStyle];
	    };
	    StyleProvider.prototype.setGridStyle = function (value) {
	        this._styles[StyleType.GridStyle] = value;
	        return this;
	    };
	    StyleProvider.Instance = new StyleProvider()
	        .setGridStyle({
	        class: null,
	        headerRow: {
	            class: null,
	            cell: {
	                class: null,
	                classBySorting: {}
	            }
	        },
	        row: {
	            class: null,
	            cell: {
	                class: null
	            }
	        }
	    });
	    return StyleProvider;
	}());
	exports.StyleProvider = StyleProvider;


/***/ }
/******/ ]);