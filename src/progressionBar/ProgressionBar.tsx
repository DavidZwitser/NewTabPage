import * as React from 'react';

export interface ProgressionBarProps
{
    markers: {place: number, content: string}[];
    // updateFunction: (newValue: number) => void;
    progression: number;
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

    render()
    {
        return(
            <div id = "progressionBar-container">
                <div id = 'bar_base'>
                    <div id = 'bar_progressionOverlay' style = {{width: this.state.progression + '%'}}></div>
                </div>
            </div>
        );
    }
} 