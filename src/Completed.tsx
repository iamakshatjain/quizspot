import logo from "./Assets/logo_circle.png";
import './Assets/index.css';

// TODO: create a feedback system here
export const Completed = () => {
    return (
        <>
            <div style={{width: `${0.1* Math.max(window.innerWidth, window.innerHeight)}px`, margin: "20vh auto 5vh"}}>
                <img src={logo} style={{width: "100%"}} alt="OppSpot-logo"/>
            </div>
            <p className="display-6 just-center mt-3">Your score is 55/60</p>
            <p className="display-5 just-center mt-3">Thanks for Attempting</p>
            <div className="footer container" style={{width: "100%"}}>
                <p className="just-center">For any issues, please email us at <a href="mailto:akshat.oppspot@gmail.com">akshat.oppspot@gmail.com</a></p>
            </div>
        </>
    )
}