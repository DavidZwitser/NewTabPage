"use strict";
exports.__esModule = true;
require("./index.scss");
var React = require("react");
var ReactDom = require("react-dom");
var ProgressionBar_1 = require("./progressionBar/ProgressionBar");
var TimeViewer_1 = require("./time_viewer/TimeViewer");
var LoadFadein_1 = require("./loadFadein/LoadFadein");
var Main = /** @class */ (function () {
    function Main() {
        this.render();
    }
    Main.prototype.render = function () {
        // ReactDom.render(
        //     React.createElement(ExampleViewer),
        //     document.getElementById('react-container')
        // );
        ReactDom.render(React.createElement(LoadFadein_1["default"]), document.getElementById('loadFadein-DOM-container'));
        var startDate = new Date('January 20, 2021');
        var endDate = new Date('August 30, 2021');
        var nowDate = new Date(Date.now());
        var dateTillNow = nowDate.getTime() - startDate.getTime();
        var fullDateRange = endDate.getTime() - startDate.getTime();
        var currentPercent = dateTillNow / fullDateRange * 100;
        var markerPlaces = [];
        for (var i = 0; i < 7; i++) {
            markerPlaces.push((new Date(2021, i + 1, 1).getTime() - startDate.getTime()) / fullDateRange * 100);
        }
        ReactDom.render(React.createElement(ProgressionBar_1["default"], {
            markers: [
                { place: markerPlaces[0], content: 'feb' },
                { place: markerPlaces[1], content: 'ma' },
                { place: markerPlaces[2], content: 'apr' },
                { place: markerPlaces[3], content: 'mei' },
                { place: markerPlaces[4], content: 'jun' },
                { place: markerPlaces[5], content: 'jul' },
                { place: markerPlaces[6], content: 'aug' }
            ],
            progression: currentPercent,
            barWidth: 50,
            fromDate: startDate,
            nowDate: nowDate
        }), document.getElementById('bar-DOM-container'));
        ReactDom.render(React.createElement(TimeViewer_1["default"]), document.getElementById('timeViewer-DOM-container'));
    };
    return Main;
}());
var main = new Main();
