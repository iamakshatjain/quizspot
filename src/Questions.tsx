import { time } from 'console';
import {useEffect, useState} from 'react';
import {questions} from './mock-data';
import './Assets/index.css';

interface SetScreenAction {
    setScreen: React.Dispatch<React.SetStateAction<number>>
}

interface QuestionProps{
    questionData: {
        ques: string;
        options: string[];
        ans: string;
        type: string;
    }
    questionNumber: number
}

// TODO: create a function to shuffle an array - shuffle questions and options arrays (TBD on backend later)
// TODO: don't send answer data to front-end
// TODO: maintain selected answers in local storage
// TODO: add text formatting to code and stuff for questions and answers

const Question = ({questionData, questionNumber}: QuestionProps) => {
    const {ques, options} = questionData;
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const selectOption = (questionNumber: number, option: string) => {
        // TODO: update marks here (server)
        // TODO: store selected answers to local storage and DB - using question number
        setSelectedOption(option)
    }

    return (
        <div className="card mb-3">
            <div className="card-header">Question {questionNumber}</div>
            <div className="card-body">
                <p className="display-5">{ques}</p>
                {
                    options.map(option => (
                        <div className={`card mb-2 option ${option === selectedOption ? 'bg-primary text-white' : '' }`} 
                            onClick={() => selectOption(questionNumber, option)}>
                            <div className="card-body">
                                {option}
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>    
    )
}

export const Questions = ({setScreen}: SetScreenAction) => {
    // time in seconds
    // TODO: time to be provided by test data
    const [timeToEnd, setTimeToEnd] = useState(600);

    const endTest = () => {
        setScreen(4);
    }

    useEffect(() => {
        // TODO: retrieve selected answers by the user from local storage
        // TODO: retrieve selected answers from DB and remaining time
        // TODO: test full screen

        // start a timer to call startTest after 1 minute
        const intervalId = setInterval(() => {
            if(timeToEnd > 0)
                setTimeToEnd(timeToEnd-1)
            else
                endTest();
        }, 1000)     

        return () => {

            // TODO: final update the marks and stuff on DB
            // TODO: clear local storage
            clearInterval(intervalId);
        }
    })

    return (
        <>
            <div className="mt-3 mb-4 flx">
                <div className={`alert alert-${timeToEnd>10 ? 'primary': 'danger'} just-center algn-center`}>
                    Ends in {Math.floor(timeToEnd/60)} mins and {timeToEnd%60} secs
                </div>
                <button className="btn btn-danger fl-rt algn-center" onClick={endTest}>End Test</button>
            </div>
    
            {/* TODO: change later from local state of App.js */}
            {questions.map((question, index) => <Question questionData={question} questionNumber={index+1}/>)}
        </>
    )
}