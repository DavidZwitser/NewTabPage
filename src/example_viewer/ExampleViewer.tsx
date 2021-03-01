import * as React from 'react';

interface ExampleViewerProps
{

}

interface ExampleViewerStates
{

}

export default class ExampleViewer extends React.Component<ExampleViewerProps, ExampleViewerStates>
{
    constructor(props: ExampleViewerProps)
    {
        super(props)
        this.state = {};
    }

    render()
    {
        return(
            <div id = "example-container">
                <h1 id = "example-title">Hello I am an example.</h1>
            </div>
        );
    }
} 