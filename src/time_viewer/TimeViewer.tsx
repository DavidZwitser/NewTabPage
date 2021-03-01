import * as React from 'react';

export interface TimeViewerProps
{

}

interface TimeViewerStates
{
    time: string;
}

export default class TimeViewer extends React.Component<TimeViewerProps, TimeViewerStates>
{
    constructor(props: TimeViewerProps)
    {
        super(props)
        this.state = {time: '00:00'};

        window.requestAnimationFrame(() => this.checkMinuteChange());
    }

    private checkMinuteChange(prevMinute: number = -1)
    {
        let currMinute = new Date(Date.now()).getMinutes();

        if (prevMinute !== currMinute)
        {
            this.setState({time: this.timeToString()});
        }

        window.requestAnimationFrame(() => this.checkMinuteChange(currMinute));
    }

    private timeToString(): string
    {
        let time: string = '';

        let date: Date = new Date(Date.now());

        time += date.getHours();
        time += ':';
        let minutes = date.getMinutes();
        time += minutes < 10 ? '0' : '';
        time += minutes;

        return time;
    }

    render()
    {
        return(
            <div id = "timeViewer-container">
                <div id = "time">{this.state.time}</div>
            </div>
        );
    }
} 