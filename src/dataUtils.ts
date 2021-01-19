import {userData, tests, questions} from './mock-data';
import { User, Test, Err, UserQuestion } from './types';

const wait = (data: any, time = 0) => {
    return new Promise<typeof data>((resolve) => setTimeout(() => resolve(data), time));
}

// get user data
export const getUserData = (name: string, email: string) => {
    // only the user which exists in the databse is allowed to take the tests
    // find user with details
    // TODO: handle this with DB later
    for(let i=0; i<userData.length; i++){
        let user = userData[i];
        if(user['name'] === name && user['email'] === email){
            return wait(user as User);
        }
    }
    return wait({err : "Invalid User"} as Err);
}

// get Tests data
export const getTestData = (testIDs: string[]) => {
    // console.log('retrieving data for' + testIDs);
    // TODO: get tests from DB based on testIDs
    var testsData = [];
    for(let j=0; j<testIDs.length; j++){
        let id = testIDs[j];
        for(let i=0; i<tests.length; i++){
            let pendingTest = tests[i];
            if(pendingTest.id === id){
                testsData.push(pendingTest);
            }
        }
    }
    
    return wait(testsData as Test[]);
}

export const getUserQuestions = (test: Test) => {
    const {type:{identifier: questionType}, qCount: questionCount, level: questionLevel} = test;
    // TODO: find the questions randomly from DB with the above specifications
    // TODO: add multiple questionTypes, counts and levels later
    // TODO: need of an entire algorithm for question selection

    const userQuestions = [];
    for(let i=0; i<questions.length && userQuestions.length < questionCount; i++){
        const {id, tag, level, ques, options} = questions[i];
        if(tag === questionType && level === questionLevel){
            userQuestions.push({id, ques, options, selectedAnswer: ""});
        }
    }
    return wait(userQuestions as UserQuestion[]);
} 