import React, {useState} from 'react';
import logo from "./Assets/logo_circle.png";
import './Assets/index.css';
import {LoginProps} from './types';
import { getUserData } from './dataUtils';

// TODO: add authentication - for now add only the students who must attend
export const Login: React.FC<LoginProps> = ({setScreen, setUserDetails}) => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [overlay, setOverlay] = useState<boolean | undefined>(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // apply overlay till no user data
        setOverlay(true);

        // TC: no empty email and name
        if(name !== '' || email !== ''){
            // get user details
            getUserData(name, email)
            .then((res => {
                // if Error
                if(res.err){
                    alert(res.err)
                } else {
                    // update user info in local state of the app
                    setUserDetails(res);
                    // move to next screen
                    setScreen(1);
                }
                // remove overlay
                setOverlay(false);
            }))
            .catch(e => console.error(e));
        }
        else{
            // TODO: create proper toast message here
            alert("Can't make request with empty email or name");
            // remove overlay
            setOverlay(false);
            return;
        }
    }

    return (
        <>
            <div style={{width: `${0.1* Math.max(window.innerWidth, window.innerHeight)}px`, margin: "20vh auto 2vh"}}>
                <img src={logo} className="wdt-100" alt="OppSpot-logo"/>
            </div>
            <div className="wdt-100" >
                <p className="display-5 just-center">OppSpot</p>
            </div>
            <form className="card card-shadow" onSubmit={onSubmit}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input type="text" className="form-control" id="nameInput" aria-describedby="name" disabled={overlay} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" disabled={overlay} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary fl-rt" disabled={overlay}>Enter</button>
                </div>
            </form>
        </>
    )
}