import React, {useState} from 'react'

interface ExampleProps {

}

export const Example: React.FC<ExampleProps> = ({}) => {
    const [count, setCount] = useState(0);

    let appendix: string = '';
    for (let i = 0; i < count; i++)
    {
        appendix += ' again'
    }

    return (
        <div id = "example">
            <h1 id = "example_text">Hello {count !== 0 && appendix}</h1>
            <button id = "example_button" onClick = {() => setCount(count + 1)}>Hello</button>
        </div>
    );
}