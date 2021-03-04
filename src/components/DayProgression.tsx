import React from 'react';

function checkMinuteChange(changeTime:  React.Dispatch<React.SetStateAction<{m: number; h: number;}>>, prevMinute: number = -1)
{
    let currMinute = new Date(Date.now()).getMinutes();

    if (prevMinute !== currMinute)
    {
        let currDate: Date = new Date(Date.now());
        changeTime({
            m: currDate.getMinutes(),
            h: currDate.getHours()
        });
    }

    window.requestAnimationFrame(() => checkMinuteChange(changeTime, currMinute));
}

export const DayProgression: React.FC = ({}) => {

    const [time, changeTime] = React.useState<{m: number, h: number}>(undefined);

    if (time == undefined)
    {
        window.requestAnimationFrame(() => checkMinuteChange(changeTime));
        return(<div/>);
    }

    let dayProgression: number;
    dayProgression = time.h - 10; /* Start day from 10 o-clock */
    dayProgression /= 11; /* Day is 11 hours long */
    dayProgression *= 100; /* Map it from 0 to 100 */

    return (
    <div id = "day_progression">

        <div id = "day_progression__label">
            <div id = "day_progression__label__time">{dayProgression > 0 ? time.h + ':' + (time.m < 10 ? '0' : '') + time.m : 'rest'}</div>
        </div>

        <div id = "day_progression__full_page" style = {{width: dayProgression + 'vw'}} ></div>

    </div>
    );

}

export default DayProgression;