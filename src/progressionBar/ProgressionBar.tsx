import * as React from 'react';

export interface ProgressionBarProps
{
    markers: {place: number, content: string}[];
    // updateFunction: (newValue: number) => void;
    progression: number;
    barWidth: number;

    fromDate: Date;
    nowDate: Date;
}

interface ProgressionBarStates
{
    progression: number;
    transitionDate: string;
}

export default class ProgressionBar extends React.Component<ProgressionBarProps, ProgressionBarStates>
{
    private progressIsTransitioning: boolean = false;
    private timeTransitioning: number = 0;
    private lastTransitionTime: number = 0;

    private loadTransitionDurationSeconds: number = 2;

    constructor(props: ProgressionBarProps) 
    {
        super(props)
        this.state = {progression: 0, transitionDate: this.getWrittenDate(this.props.fromDate)};

        setTimeout(() => {
            this.setState({progression: props.progression});

            document.getElementById('bar_progressionOverlay').addEventListener('transitionstart', (ev: TransitionEvent) => {
                this.progressIsTransitioning = true
                this.lastTransitionTime = new Date().getTime();
                this.animateCurrentDateMarker();
            });

            document.getElementById('bar_progressionOverlay').addEventListener('transitionend', () => this.progressIsTransitioning = false);
        }, 200);
    }

    private animateCurrentDateMarker(): void
    {
        let currTransitionTime: number = new Date().getTime();
        let transitionDelta: number = currTransitionTime - this.lastTransitionTime;
        this.lastTransitionTime = currTransitionTime;
        this.timeTransitioning += transitionDelta;

        let fullDateRange: number = this.props.nowDate.getTime() - this.props.fromDate.getTime();
        
        let transitionPercent: number = this.timeTransitioning / (this.loadTransitionDurationSeconds + 2000);
        let transitionRemapToPI: number = transitionPercent * (Math.PI / 2);
        let transitionToSin: number = Math.sin(transitionRemapToPI);

        let transitionDateLocal: number = fullDateRange * transitionToSin;
        let transitionDateGlobal: number = this.props.fromDate.getTime() + transitionDateLocal;

        let definiteDate: Date = new Date();
        definiteDate.setTime(transitionDateGlobal);

        this.setState({transitionDate: this.getWrittenDate(definiteDate)})

        if (this.progressIsTransitioning == true)
        {
            window.requestAnimationFrame(this.animateCurrentDateMarker.bind(this));
        }
        else
        {
            this.setState({transitionDate: this.getWrittenDate(this.props.nowDate)})
        }
    }

    public setValue(value: number): void
    {
        this.setState({progression: value})
    }

    private createMarkers(): JSX.Element[]
    {
        let elements: JSX.Element[] = [];

        for (let i = 0; i < this.props.markers.length; i++)
        {
            elements.push(
                <div id = 'marker' style = {{marginLeft: this.props.markers[i].place * (this.props.barWidth / 100) + 'vmin'}} key = {'marker' + i}>
                    <p id = 'label'>{this.props.markers[i].content}</p>
                </div>
            );
        }

        return elements;
    }

    private getWrittenDate(date: Date): string
    {
        let month: number = date.getMonth();

        let dateName = month == 0 ? 'jan' : month == 1 ? 'feb' : month == 2 ? 'ma' : month == 3 ? 'apr' : month == 4 ? 'mei' : month == 5 ? 'jun' : month == 6 ? 'jul' : month == 7 ? 'aug' : 'none';

        return date.getDate() + ' ' + dateName;
    }

    render()
    {
        return(
            <div id = "progressionBar-container">
                <div id = 'bar_base' style = {{width: this.props.barWidth + 'vmin'}}>

                    <div id = 'bar_progressionOverlay' style = {{width: this.state.progression + '%', transitionDuration: this.loadTransitionDurationSeconds + 's'}}></div>
                    <p id = 'currentDate_marker'>{this.state.transitionDate}</p>
                    {this.createMarkers()}

                </div>
            </div>
        );
    }
} 