import * as React from 'react';

export interface LoadFadeinProps
{

}

interface LoadFadeinStates
{
    opacity: number;
}

export default class LoadFadein extends React.Component<LoadFadeinProps, LoadFadeinStates>
{
    constructor(props: LoadFadeinProps)
    {
        super(props)
        this.state = {opacity: 1};

        setTimeout(() => {
            this.setState({opacity: 0});
        }, 100);
    }

    render()
    {
        return(
            <div id = "loadFadein-container" style = {{opacity: this.state.opacity}}></div>
        );
    }
} 