import './index.scss';

import * as React from 'react';
import * as ReactDom from "react-dom";

import ExampleViewer from './example_viewer/ExampleViewer';
import ProgressionBar, {ProgressionBarProps} from './progressionBar/ProgressionBar';
import TimeViewer from './time_viewer/TimeViewer';

import LoadFadedin from './loadFadein/LoadFadein';

class Main
{
    constructor()
    {
        this.render();
    }

    private render(): void
    {

        // ReactDom.render(
        //     React.createElement(ExampleViewer),
        //     document.getElementById('react-container')
        // );

        
        ReactDom.render(
            React.createElement(LoadFadedin),
            document.getElementById('loadFadein-DOM-container')
        );
            
        let startDate: Date = new Date('January 20, 2021');
        let endDate: Date = new Date('August 30, 2021');
        let nowDate: Date = new Date(Date.now());

        let dateTillNow: number = nowDate.getTime() - startDate.getTime();
        let fullDateRange: number = endDate.getTime() - startDate.getTime();
        let currentPercent: number = dateTillNow / fullDateRange * 100;
        
        ReactDom.render(
            React.createElement(ProgressionBar, <ProgressionBarProps>{
                markers: [{place: 0, content: '20/1'}],
                progression: currentPercent
            }),
            document.getElementById('bar-DOM-container')
        );

        ReactDom.render(
            React.createElement(TimeViewer),
            document.getElementById('timeViewer-DOM-container')
        );

    }
}
let main = new Main(); 