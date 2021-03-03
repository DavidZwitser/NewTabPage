import React from 'react'

export const LoadFadeIn: React.FC = ({}) => {

    const [opacity, changeOpacity] = React.useState(1);

    setTimeout(() => {
        changeOpacity(0);
    }, 5);

    return (<div id = "load_fade_in" style = {{transition: "opacity .5s ease-in-out", opacity: opacity}}></div>);
}

export default LoadFadeIn;