import {useEffect} from 'react'
import logo from "./Assets/logo_circle.png";
import './Assets/index.css';

// TODO: create a feedback system here
// TODO: get user details here and display the score (To Be discussed)

const getOffFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
          .then(() => console.log("Document Exited form Full screen mode"))
          .catch((err) => console.error(err))
      }
}

export const Completed = () => {

    useEffect(() => {
        getOffFullScreen();
    }, [])

    return (
        <>
            <div style={{width: `${0.1* Math.max(window.innerWidth, window.innerHeight)}px`, margin: "20vh auto 5vh"}}>
                <img src={logo} className="wdt-100" alt="OppSpot-logo"/>
            </div>
            {/* <p className="display-6 just-center mt-3">Your score is 55/60</p> */}
            <p className="display-5 just-center mt-3">Thanks for Attempting</p>
            <p className="just-center">We try to make our platform better everyday, kindly share your valuable feedback at: <a href="mailto:akshat.oppspot@gmail.com">akshat.oppspot@gmail.com</a></p>
        </>
    )
}