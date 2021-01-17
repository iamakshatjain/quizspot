import {useEffect, useState} from 'react';
import './Assets/index.css';

interface SetScreenAction {
    setScreen: React.Dispatch<React.SetStateAction<number>>
}

const goFullScreen = () => {
    const element = document.body;
    var requestMethod =
      element.requestFullscreen;
    requestMethod.call(element);
  };

export const Rules = ({setScreen}: SetScreenAction) => {
    // time in seconds
    const [timeToStart, setTimeToStart] = useState(60);

    const startTest = () => {
        setScreen(3);
    }
    
    useEffect(() => {
        // TODO: make full screen

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

        // TODO: retrieve test data
        // TODO: retrieve and set questions for the user
        // TODO: set remaining time on DB 
        // TODO: set remaining time and selected answers on the local storage
    })

    return (
        <>
            <p className="display-3 just-center mt-3">Rules</p>
            <div className="just-center">
                <div className={`alert alert-${timeToStart>10 ? 'primary': 'danger'} just-center`}>
                    Starts in {timeToStart%60} secs
                </div>
                <ul>
                    <li>Something loremSomething loremSomething loremSomething lorem</li>
                    <li>Something lormSomething lorem thing loremthing lorem</li>
                    <li>Something loremSomething lororem</li>
                    <li>Something loremSomething loremSomething loremSomething lorem</li>
                    <li>Something lormSomething lorem thing loremthing lorem</li>
                    <li>Something loremSomething lororem</li>
                </ul>
                <button className="btn btn-primary fl-rt" onClick={startTest}>Attempt</button>
            </div>
            
        </>
    )
}