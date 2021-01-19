import React, {useEffect, useState} from 'react';
import './Assets/index.css';
import {RulesProps} from './types';

// Beyond this anytest is a pending test - just update the last pending test
export const Rules: React.FC<RulesProps> = ({setScreen}) => {
    // time in seconds
    const [timeToStart, setTimeToStart] = useState(60);

    // const goFullScreen = () => {
    //     const element = document.querySelector('body') as HTMLBodyElement;
    //     element.requestFullscreen()
    //     .then(() => {
    //         console.log('Full Screen Enabled');
    //     })
    //     .catch(e => console.error(e));
    //   };
    
    const startTest = () => {
        setScreen(3);
    }

    useEffect(() => {

        // start a timer to call startTest after 1 minute
        const intervalId = setInterval(() => {
            if(timeToStart > 0)
                setTimeToStart(timeToStart-1)
            else
                startTest();
        }, 1000)     

        return () => {
            clearInterval(intervalId);
        }
    })

    return (
        <>
            <p className="display-3 just-center mt-3">Rules</p>
            <div className="just-center">
                <div className={`alert alert-${timeToStart>10 ? 'primary': 'danger'} just-center`}>
                    Starts in {timeToStart%60} secs
                </div>
                <ul>
                    <li>Tab/Window switching would lead to disqualification <strong>without warning</strong></li>
                    <li>Exiting full screen mode would lead to disqualification <strong>without warning</strong></li>
                    <li>The application uses face recognition as well as voice tracking, any unfair activity would lead to disqualification <strong>without warning</strong></li>
                    <li>Only one attempt per test is allowed</li>
                    <li>For any queries, contact us at <a href="mailto:akshat.oppspot@gmail.com">akshat.oppspot@gmail.com</a></li>
                </ul>
                <button className="btn btn-primary fl-rt" onClick={startTest}>Attempt</button>
                <button className="btn btn-outline-primary btn-sm" onClick={() => setScreen(1)}>Back</button>
            </div>
            
        </>
    )
}