import React from 'react';
import LoadFadeIn from './LoadFadeIn';
import ProgressionBar from './ProgressionBar';
import DayProgression from './DayProgression';

const App: React.FC = () => {

    let startDate: Date = new Date('January 20, 2021');
    let endDate: Date = new Date('August 30, 2021');
    let nowDate: Date = new Date(Date.now());

    let dateTillNow: number = nowDate.getTime() - startDate.getTime();
    let fullDateRange: number = endDate.getTime() - startDate.getTime();

    let currentPercent: number = dateTillNow / fullDateRange * 100;
    let markerPlaces: number[] = [];

    for (let i = 0; i < 7; i++)
    {
        markerPlaces.push((new Date(2021, i + 1, 1).getTime() - startDate.getTime()) / fullDateRange * 100);
    }

    /* Add all components in this container */
    return(
        <div className = 'app_container'>
            
            <LoadFadeIn />

            <ProgressionBar markers = {[
                {place: markerPlaces[0], content: 'feb'},
                {place: markerPlaces[1], content: 'ma'},
                {place: markerPlaces[2], content: 'apr'},
                {place: markerPlaces[3], content: 'mei'},
                {place: markerPlaces[4], content: 'jun'},
                {place: markerPlaces[5], content: 'jul'},
                {place: markerPlaces[6], content: 'aug'}
            ]}
            progression = {currentPercent}
            barWidth = {50}
            fromDate = {startDate}
            nowDate = {nowDate}
            />

            <DayProgression />

        </div>
    )
}

export default App;