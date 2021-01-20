import {useEffect, useState} from 'react';
import './Assets/index.css';
import { QuestionProps, QuestionsProps } from './types';

// TODO: maintain selected answers in local storage - with redux
// TODO: add text formatting to code and stuff for questions and answers

const Question: React.FC<QuestionProps> = ({questionData, questionNumber, userDetails, setUserDetails, remainingTime, disabled}) => {
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
        <div className="card mb-3" key={questionNumber}>
            <div className="card-header">Question {questionNumber}</div>
            <div className="card-body">
                <p className="display-5">{ques}</p>
                {
                    options.map((option, index) => (
                        <div key={`${questionNumber}O${index}`} className={`card mb-2 option ${option === selectedOption ? 'bg-primary text-white' : '' }`} 
                            onClick={() => {if(!disabled) selectOption(questionNumber, option)}}>
                            <div className="card-body">
                                {option}
                            </div>
                        </div>

                    ))
                }
                <button className="btn btn-warning btn-sm" onClick={() => {if(!disabled) selectOption(questionNumber, "")}}>Clear Selection</button>
            </div>
        </div>    
    )
}

const goFullScreen = () => {
    const element = document.documentElement;
    element.requestFullscreen()
    .then((res) => {
        console.log('Full Screen Enabled');
    })
    .catch(e => console.error(e));
};

export const Questions: React.FC<QuestionsProps> = ({setScreen, userDetails, setUserDetails}) => {
    // time in seconds

    // set the remaining time for the test
    const [timeToEnd, setTimeToEnd] = useState<number>(userDetails.pendingTests[0].remainingTime);
    const [violation, setViolation] = useState<string>("");
    const [violationCount, setViolationCount] = useState<number>(0);

    const endTest = () => {

        // move test to past tests
        const updatedUserDetails = { ...userDetails};
        const newPastTest = updatedUserDetails.pendingTests[0];
        newPastTest.remainingTime = 0;
        updatedUserDetails.pendingTests = [];
        updatedUserDetails.pastTests.push(newPastTest);

        // change screen
        setScreen(4);

        // update user details
        setUserDetails(updatedUserDetails);
        
        // TODO: make changes on the DB

        // TODO: evaluate test using user Details
        // evaluateTest(userDetails)
    }

    useEffect(() => {
        // TODO: retrieve selected answers by the user from local storage
        // TODO: retrieve selected answers and remaining time from DB if not in local storage
        // Prevent Ctrl+S, Ctrl+C & Ctrl+V
        document.onkeydown = function (e) {
            e = e || window.event; //Get event
            if (e.ctrlKey) {
                var c = e.code; //Get key code
                if (['KeyS', 'KeyC', 'KeyV'].includes(c)) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Violation : Ctrl + S, Ctrl+C, Ctrl+V not allowed');
                }
            }
        };
    
        // detect tab switching
        document.addEventListener('visibilitychange', (event) => {
            if (document.visibilityState !== 'visible') {
                console.log('Violation : Tab or Window switching');
                // set only if violationCount is zero
                if(violationCount === 0)
                    setViolation("Tab or Window Switching");
                else
                    endTest();
            }
        });

        // full screen detection - chrome (TODO: some error correct it later)
        document.addEventListener('fullscreenchange', function () {
            // full screen disabled
            if (!document.fullscreenElement) {
                console.log('violation : Exiting Full Screen');
                if(violationCount === 0)
                    setViolation("Exiting Full Screen");
                else
                    endTest();
            }
        });

        window.addEventListener('blur', () => {
            if(violationCount === 0)
                    setViolation("Tab or Window Switching");
                else
                    endTest();
        })
  

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
            {violation && <div id="modal" className="center" style={{zIndex: 1000, width: 'fit-content'}}>
                <div className="card">
                    <div className="card-header">Violation</div>
                    <div className="card-body">
                        <p>{violation} Not Allowed!</p>
                        <p><strong>Last Warning</strong></p>
                        <div className="just-center">
                            <button className="btn btn-danger just-center" 
                            onClick={() => {
                                goFullScreen();
                                setViolationCount(violationCount+1);
                                setViolation("");
                                }}>I Agree</button>
                        </div>
                    </div>
                </div>
            </div>}
            <div className={`mt-3 mb-4 flx ${violation ? 'overlay' : ''}`}>
                <div className={`alert alert-${timeToEnd>10 ? 'primary': 'danger'} just-center algn-center`}>
                    Ends in {Math.floor(timeToEnd/60)} mins and {timeToEnd%60} secs
                </div>
                <button className="btn btn-danger fl-rt algn-center" onClick={endTest} disabled={!!violation}>End Test</button>
            </div>
            
            <div className={`${violation ? 'overlay' : ''}`}>
                {userDetails.pendingTests[0].questions.map(({id, ques, options}, index) => <Question questionData={{id, ques, options, selectedAnswer: ""}} questionNumber={index+1} userDetails={userDetails} setUserDetails={setUserDetails} remainingTime={timeToEnd} disabled={!!violation}/>)}
            </div>
        </>
    )
}