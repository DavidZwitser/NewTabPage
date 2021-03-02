import * as React from 'react';

export interface ProgressionBarProps
{
    markers: {place: number, content: string}[];
    // updateFunction: (newValue: number) => void;
    progression: number;
    barWidth: number;
}

interface ProgressionBarStates
{
    progression: number;
}

export default class ProgressionBar extends React.Component<ProgressionBarProps, ProgressionBarStates>
{

    constructor(props: ProgressionBarProps) 
    {
        super(props)
        this.state = {progression: 0};

        setTimeout(() => {
            this.setState({progression: props.progression});
        }, 200);
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

    render()
    {
        return(
            <div id = "progressionBar-container">
                <div id = 'bar_base' style = {{width: this.props.barWidth + 'vmin'}}>

                    <div id = 'bar_progressionOverlay' style = {{width: this.state.progression + '%'}}></div>
                    {this.createMarkers()}

                </div>
            </div>
        );
    }
} 