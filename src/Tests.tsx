import React from 'react';
import './Assets/index.css';
import {pendingTests} from "./mock-data";

interface SetScreenAction {
    setScreen: React.Dispatch<React.SetStateAction<number>>
}

interface TestCardProps{
    title: string, 
    desc: string, 
    onClick: () => void
}

const TestCard = ({title, desc, onClick}: TestCardProps) => {
    return (
        <div className="card card-shadow mb-2">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <button className="btn btn-primary" onClick={onClick}>Attempt</button>
            </div>
        </div>
    )
}

export const Tests = ({setScreen}: SetScreenAction) => {
    return(
        <>
            <p className="display-3 just-center">Hi, Akshat</p>
            <p className="display-5 mt-5 just-center">Pending Tests</p>
            {pendingTests && pendingTests.length ?(<div className="row">
                
                    {
                        pendingTests.map(({companyName, type: {label}, level}: {companyName: string, type: {label: string}, level: number}) => {
                            return (
                                <div className="col-sm-6">
                                    <TestCard title={`${label} Test`} desc={`Level ${level} test of ${label} for ${companyName}`} onClick={() => setScreen(2)}/>
                                </div>
                                )
                        })
                    }
            </div>) : 
            (<div className="just-center display-6">
                None, Enjoy ;)
            </div>)
            }
        </>
    )
}