import React, {useState, useEffect} from 'react';
import './Assets/index.css';
import { TestCardProps, TestsProps, Test, UserTest } from './types';
import {getTestData, getUserQuestions} from './dataUtils';

const TestCard = ({title, desc, onClick, disabled}: TestCardProps) => {
    return (
        <div className="card card-shadow mb-2">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <button className="btn btn-primary" onClick={onClick} disabled={disabled}>Attempt</button>
            </div>
        </div>
    )
}

// TODO: add a search bar to the tests
export const Tests: React.FC<TestsProps> = ({setScreen, userDetails, setUserDetails}) => {
    
    const [pendingTests, setPendingTests] = useState<Test[]>([] as Test[]);
    const [availableTests, setAvailableTests] = useState<Test[]>([] as Test[]);
    const [isPendingTestsLoading, setIsPendingTestsLoading] = useState<boolean>(true);
    const [isAvailableTestsLoading, setIsAvailableTestsLoading] = useState<boolean>(true);

    const selectTest = (selectedTest: Test) => {
        
        // check if test is not pending test
        if(pendingTests.length === 0){
            // filter available tests
            const filteredAvailableTests = userDetails.availableTests.filter(test => test.id !== selectedTest.id);
            // set remaining time, marks obtained
            const newPendingTest: UserTest = {
                id: selectedTest.id,
                remainingTime: selectedTest.timeAllowed,
                marksObtained: 0,
                questions: []            
            }

            // get questions
            getUserQuestions(selectedTest)
            .then((res) => {
                newPendingTest.questions = res;
            })
            .catch((e) => console.error(e));

            // update user data locally
            const updatedUserDetails = { ...userDetails, availableTests: filteredAvailableTests, pendingTests: [newPendingTest]};
            setUserDetails(updatedUserDetails);

            // hereafter, we just update the last pending test

            // TODO: update user data on server and local-storage
        }
        // change screen
        setScreen(2);
    }

    useEffect(() => {
        // fetch test data and store in pending tests
        // test IDs
        const availableTestIDs = userDetails.availableTests.map(({id}: {id: string}) => id);
        // only one pending test is allowed
        const pendingTestIDs = userDetails.pendingTests.map(({id}: {id: string}) => id);

        // TODO: move tests to pastTests if expired
        // getting available tests data
        getTestData(availableTestIDs)
        .then((res) => {
            setAvailableTests(res);
            setIsAvailableTestsLoading(false);
        })
        .catch(e => {
            console.error(e); 
            setIsAvailableTestsLoading(false);
        });

        // getting Pending tests data
        getTestData(pendingTestIDs)
        .then((res) => {
            setPendingTests(res);
            setIsPendingTestsLoading(false);
        })
        .catch(e => {
            console.error(e); 
            setIsPendingTestsLoading(false);
        });

    }, [userDetails]);
    
    const {name} = userDetails;
    return(
        <>
            <p className="display-3 just-center">Hi, {name}</p>
            <div id="available-tests">
                <p className="display-5 mt-5">Available Tests</p>
                {isAvailableTestsLoading ? (<div className="spinner-border text-primary" role="status" />):
                // TODO: add data about question count, level and timeAllowed
                (availableTests && availableTests.length ? 
                    (<div className="row">
                        
                        {
                            availableTests.map((pendingTest, index) => {
                                const {compName, type: {label}, level}: {compName: string, type: {label: string}, level: number} = pendingTest;
                                return (
                                    <div className="col-xs-12 col-sm-6" key={index}>
                                        <TestCard title={`${label} Test`} desc={`Level ${level} test of ${label} for ${compName}`} onClick={() => selectTest(pendingTest)} disabled={pendingTests.length > 0}/>
                                    </div>
                                    )
                            })
                        }
                    </div>) : 
                    (<div className="display-6">{`None, Enjoy ;)`}</div>)
                )}
            </div>

            <div className="mt-3" id="pending-tests">
                <p className="display-5">Pending Tests</p>
                {isPendingTestsLoading ? (<div className="spinner-border text-primary" role="status" />):
                // TODO: add data about question count, level and timeAllowed
                (pendingTests && pendingTests.length ? 
                    (<div className="row">
                        {
                            pendingTests.map((pendingTest, index) => {
                                const {compName, type: {label}, level}: {compName: string, type: {label: string}, level: number} = pendingTest;
                                return (
                                    <div className="col-xs-12 col-sm-6" key={index}>
                                        <TestCard title={`${label} Test`} desc={`Level ${level} test of ${label} for ${compName}; Remaining Time: ${userDetails.pendingTests[0].remainingTime}`} onClick={() => selectTest(pendingTest)} disabled={false}/>
                                    </div>
                                    )
                            })
                        }
                    </div>) : 
                    (<div>{`None, Enjoy ;)`}</div>)
                )}
            </div>
            
            <button className="btn btn-outline-primary btn-sm mt-5" onClick={() => setScreen(0)}>Back</button>
        </>
    )
}