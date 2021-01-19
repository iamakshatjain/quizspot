import {useEffect, useState} from 'react';
import './Assets/index.css';
import { QuestionProps, QuestionsProps } from './types';

// TODO: maintain selected answers in local storage
// TODO: add text formatting to code and stuff for questions and answers

const Question: React.FC<QuestionProps> = ({questionData, questionNumber, userDetails, setUserDetails, remainingTime}) => {
    const {ques, options} = questionData;
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const selectOption = (questionNumber: number, selectedOption: string) => {
        const index = questionNumber - 1;
        // update selected option on state
        const updatedUserDetails = { ...userDetails};
        updatedUserDetails.pendingTests[0].questions[index].selectedAnswer = selectedOption;
        updatedUserDetails.pendingTests[0].remainingTime = remainingTime;
        setUserDetails(updatedUserDetails);

        // TODO: store selected answers to local storage and DB - using question number
        setSelectedOption(selectedOption);
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

export const Questions: React.FC<QuestionsProps> = ({setScreen, userDetails, setUserDetails}) => {
    // time in seconds

    // set the remaining time for the test
    const [timeToEnd, setTimeToEnd] = useState<number>(userDetails.pendingTests[0].remainingTime);

    const endTest = () => {
        // move test to past tests
        const updatedUserDetails = { ...userDetails};
        const newPastTest = updatedUserDetails.pendingTests[0];
        newPastTest.remainingTime = 0;
        updatedUserDetails.pendingTests = [];
        updatedUserDetails.pastTests.push(newPastTest);
        setUserDetails(updatedUserDetails);
        console.log(updatedUserDetails);
        // TODO: make changes on the DB

        // TODO: evaluate test using user Details
        // evaluateTest(userDetails)

        // change screen
        setScreen(4);
    }

    useEffect(() => {
        // TODO: retrieve selected answers by the user from local storage
        // TODO: retrieve selected answers and remaining time from DB if not in local storage
        // TODO: event listener to full screen

        // start a timer to call startTest after 1 minute
        const intervalId = setInterval(() => {
            if(timeToEnd > 0)
                setTimeToEnd(timeToEnd-1)
            else
                endTest();
        }, 1000)     

        return () => {
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
            {userDetails.pendingTests[0].questions.map(({id, ques, options}, index) => <Question questionData={{id, ques, options, selectedAnswer: ""}} questionNumber={index+1} userDetails={userDetails} setUserDetails={setUserDetails} remainingTime={timeToEnd}/>)}
        </>
    )
}