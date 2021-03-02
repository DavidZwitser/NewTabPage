"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var ProgressionBar = /** @class */ (function (_super) {
    __extends(ProgressionBar, _super);
    function ProgressionBar(props) {
        var _this = _super.call(this, props) || this;
        _this.progressIsTransitioning = false;
        _this.timeTransitioning = 0;
        _this.lastTransitionTime = 0;
        _this.loadTransitionDurationSeconds = 2;
        _this.state = { progression: 0, transitionDate: _this.getWrittenDate(_this.props.fromDate) };
        setTimeout(function () {
            _this.setState({ progression: props.progression });
            document.getElementById('bar_progressionOverlay').addEventListener('transitionstart', function (ev) {
                _this.progressIsTransitioning = true;
                _this.lastTransitionTime = new Date().getTime();
                _this.animateCurrentDateMarker();
            });
            document.getElementById('bar_progressionOverlay').addEventListener('transitionend', function () { return _this.progressIsTransitioning = false; });
        }, 200);
        return _this;
    }
    ProgressionBar.prototype.animateCurrentDateMarker = function () {
        var currTransitionTime = new Date().getTime();
        var transitionDelta = currTransitionTime - this.lastTransitionTime;
        this.lastTransitionTime = currTransitionTime;
        this.timeTransitioning += transitionDelta;
        var fullDateRange = this.props.nowDate.getTime() - this.props.fromDate.getTime();
        var transitionPercent = this.timeTransitioning / (this.loadTransitionDurationSeconds + 2000);
        var transitionRemapToPI = transitionPercent * (Math.PI / 2);
        var transitionToSin = Math.sin(transitionRemapToPI);
        var transitionDateLocal = fullDateRange * transitionToSin;
        var transitionDateGlobal = this.props.fromDate.getTime() + transitionDateLocal;
        var definiteDate = new Date();
        definiteDate.setTime(transitionDateGlobal);
        this.setState({ transitionDate: this.getWrittenDate(definiteDate) });
        if (this.progressIsTransitioning == true) {
            window.requestAnimationFrame(this.animateCurrentDateMarker.bind(this));
        }
        else {
            this.setState({ transitionDate: this.getWrittenDate(this.props.nowDate) });
        }
    };
    ProgressionBar.prototype.setValue = function (value) {
        this.setState({ progression: value });
    };
    ProgressionBar.prototype.createMarkers = function () {
        var elements = [];
        for (var i = 0; i < this.props.markers.length; i++) {
            elements.push(React.createElement("div", { id: 'marker', style: { marginLeft: this.props.markers[i].place * (this.props.barWidth / 100) + 'vmin' }, key: 'marker' + i },
                React.createElement("p", { id: 'label' }, this.props.markers[i].content)));
        }
        return elements;
    };
    ProgressionBar.prototype.getWrittenDate = function (date) {
        var month = date.getMonth();
        var dateName = month == 0 ? 'jan' : month == 1 ? 'feb' : month == 2 ? 'ma' : month == 3 ? 'apr' : month == 4 ? 'mei' : month == 5 ? 'jun' : month == 6 ? 'jul' : month == 7 ? 'aug' : 'none';
        return date.getDate() + ' ' + dateName;
    };
    ProgressionBar.prototype.render = function () {
        return (React.createElement("div", { id: "progressionBar-container" },
            React.createElement("div", { id: 'bar_base', style: { width: this.props.barWidth + 'vmin' } },
                React.createElement("div", { id: 'bar_progressionOverlay', style: { width: this.state.progression + '%', transitionDuration: this.loadTransitionDurationSeconds + 's' } }),
                React.createElement("p", { id: 'currentDate_marker' }, this.state.transitionDate),
                this.createMarkers())));
    };
    return ProgressionBar;
}(React.Component));
exports["default"] = ProgressionBar;
