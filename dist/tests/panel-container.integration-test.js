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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(1);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = vendors;

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(41);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(43);

/***/ },
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var chai_1 = __webpack_require__(2);
	var panel_1 = __webpack_require__(16);
	var panel_container_1 = __webpack_require__(17);
	var Enzyme = __webpack_require__(10);
	var React = __webpack_require__(11);
	describe('<PanelContainer />', function () {
	    describe('initialization', function () {
	        it('"staticPanels" property should be initialized', function () {
	            var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, null, 
	                React.createElement(panel_1.Panel, {title: "panel0"}), 
	                React.createElement(panel_1.Panel, {title: "panel1"}), 
	                React.createElement(panel_1.Panel, {title: "panel2"})));
	            var staticPanels = panelContainer.state().staticPanels;
	            chai_1.expect(staticPanels.length).to.equal(3);
	            chai_1.expect(staticPanels[0].title).to.equal('panel0');
	            chai_1.expect(staticPanels[1].title).to.equal('panel1');
	            chai_1.expect(staticPanels[2].title).to.equal('panel2');
	        });
	    });
	    describe('behaviour', function () {
	        it('panel should be closed (dynamic with 3 panel)', function () {
	            var dynamicPanels = [{ title: 'panel0' }, { title: 'panel1' }, { title: 'panel2' }];
	            var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {dynamicPanels: dynamicPanels}));
	            for (var i = dynamicPanels.length - 1; i > 0; i--) {
	                panelContainer.find('button.close').last().simulate('click');
	                chai_1.expect(panelContainer.state().dynamicPanels.length).to.equal(i);
	            }
	        });
	        it('panel should not be closed (dynamic with 3 panel)', function () {
	            var dynamicPanels = [{ title: 'panel0' }, { title: 'panel1' }, { title: 'panel2' }];
	            var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {dynamicPanels: dynamicPanels, onPanelClosing: function () { return false; }}));
	            panelContainer.find('button.close').last().simulate('click');
	            chai_1.expect(panelContainer.state().dynamicPanels.length).to.equal(3);
	        });
	        it('panel should be closed (static with 1 panel)', function () {
	            var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {onPanelClosing: function () { return true; }}, 
	                React.createElement(panel_1.Panel, null)
	            ));
	            panelContainer.find('button.close').last().simulate('click');
	            chai_1.expect(panelContainer.state().staticPanels.length).to.equal(0);
	        });
	        it('panel should be closed (static with 2 panels)', function () {
	            var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {onPanelClosing: function () { return true; }}, 
	                React.createElement(panel_1.Panel, null), 
	                React.createElement(panel_1.Panel, null)));
	            panelContainer.find('button.close').last().simulate('click');
	            chai_1.expect(panelContainer.state().staticPanels.length).to.equal(1);
	        });
	        it('panel should not be closed (static with 1 panel)', function () {
	            var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {onPanelClosing: function () { return false; }}, 
	                React.createElement(panel_1.Panel, null)
	            ));
	            panelContainer.find('button.close').last().simulate('click');
	            chai_1.expect(panelContainer.state().staticPanels.length).to.equal(1);
	        });
	        it('panel should not be closed (static with 2 panels)', function () {
	            var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {onPanelClosing: function () { return false; }}, 
	                React.createElement(panel_1.Panel, null), 
	                React.createElement(panel_1.Panel, null)));
	            panelContainer.find('button.close').last().simulate('click');
	            chai_1.expect(panelContainer.state().staticPanels.length).to.equal(2);
	        });
	    });
	    describe('property', function () {
	        describe('mode', function () {
	            it('mode == DynamicAndStatic (it is the same as default)', function () {
	                var dynamicPanels = [{ title: 'dynamicPanel' }];
	                var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {dynamicPanels: dynamicPanels}, 
	                    React.createElement(panel_1.Panel, {title: "staticPanel"})
	                ));
	                var panels = panelContainer.find(panel_1.Panel);
	                chai_1.expect(panels.at(0).props().title).to.equal('dynamicPanel');
	                chai_1.expect(panels.at(1).props().title).to.equal('staticPanel');
	            });
	            it('mode == StaticAndDynamic', function () {
	                var dynamicPanels = [{ title: 'dynamicPanel' }];
	                var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {dynamicPanels: dynamicPanels, mode: panel_container_1.PanelContainerMode.StaticAndDynamic}, 
	                    React.createElement(panel_1.Panel, {title: "staticPanel"})
	                ));
	                var panels = panelContainer.find(panel_1.Panel);
	                chai_1.expect(panels.at(0).props().title).to.equal('staticPanel');
	                chai_1.expect(panels.at(1).props().title).to.equal('dynamicPanel');
	            });
	        });
	        describe('orientation', function () {
	            var columnCountsByTestCase = [
	                [12],
	                [6, 6],
	                [4, 4, 4],
	                [3, 3, 3, 3],
	                [2, 2, 2, 2, 2],
	                [2, 2, 2, 2, 2, 2],
	                [1, 1, 1, 1, 1, 1, 1],
	                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	            ];
	            it('orientation == Horizontal (it is the same as default)', function () {
	                columnCountsByTestCase.forEach(function (columnCounts) {
	                    var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, null, columnCounts.map(function (x) { return React.createElement(panel_1.Panel, null); })));
	                    var panels = panelContainer.find(panel_1.Panel);
	                    for (var i = 0; i < columnCounts.length; i++) {
	                        chai_1.expect(panels.at(i).props().columnCount).to.equal(columnCounts[i], "panels.length = " + panels.length);
	                    }
	                });
	            });
	            it('orientation == Vertical', function () {
	                columnCountsByTestCase.forEach(function (columnCounts) {
	                    var panelContainer = Enzyme.mount(React.createElement(panel_container_1.PanelContainer, {orientation: panel_container_1.PanelContainerOrientation.Vertical}, columnCounts.map(function (x) { return React.createElement(panel_1.Panel, null); })));
	                    var panels = panelContainer.find(panel_1.Panel);
	                    for (var i = 0; i < columnCounts.length; i++) {
	                        chai_1.expect(panels.at(i).props().columnCount).is.null;
	                    }
	                });
	            });
	        });
	    });
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(11);
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


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(11);
	var panel_1 = __webpack_require__(16);
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


/***/ }
/******/ ]);