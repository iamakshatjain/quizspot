// TODO: later this file would move to backend
import {db} from './firebase';
import { User, Test, Err, UserQuestion } from '../types';

// const wait = (data: any, time = 10) => {
//     return new Promise<typeof data>((resolve) => setTimeout(() => resolve(data), time));
// }

// id of data is created while creating of resources

// get user data
export const getUserData = async (name: string, email: string) => {
    // only the user which exists in the databse is allowed to take the tests
    // find user with matching details
    try{
        const querySnapshot = await db.collection('users').where('name', '==', name).where('email', '==', email).get();
        const doc = querySnapshot.docs[0];
        if(doc.exists){
            // user details
            const user =  doc.data() as User;
            return user;
        } else{
            return {err: "Invalid User"} as Err;
        }
    } 
    catch (e) {
        return {err: "Server Error"} as Err;
    }   
    
}

export const updateUserDetails = (user: User) => {
    // TODO: send error state here if the user is not updated
    const {id} = user;
    try{
        db.collection('users').doc(id).set({...user})
        .then(() => {
            console.log('User details set');
        })
    }
    catch (e){
        console.error(e);
    }
}

// get Tests data
export const getTestData = async(testIDs: string[]) => {
    // for each testID find the data from the tests
    try{
        const tests: Test[] = [];
        const querySnapshot = await db.collection('tests').where('id', 'in', testIDs).get();
        querySnapshot.forEach(doc => {
            tests.push(doc.data() as Test);
        });
        return tests;
    } 
    catch (e) {
        //TODO: return error here 
        return [] as Test[];
    }   

}

// get questions for each user
export const getUserQuestions = async (test: Test) => {
    const {type:{identifier: questionType}, qCount: questionCount, level: questionLevel} = test;
    // TODO: find the questions randomly from DB with the above specifications
    // TODO: add multiple questionTypes, counts and levels later
    // TODO: need of an entire algorithm for question selection
    try{
        const userQuestions: UserQuestion[] = [];
        const querySnapshot = await db.collection('questions').where('tag', '==', questionType).where('level', '==', questionLevel).get();
        querySnapshot.forEach(doc => {
            if(userQuestions.length < questionCount){
                const {id, ques, options, selectedAnswer=""} = doc.data();
                userQuestions.push({id, ques, options, selectedAnswer} as UserQuestion);
            }
        });
        return userQuestions;
    } 
    catch (e) {
        //TODO: return error here 
        return [] as UserQuestion[];
    }
} 

export const evaluateTest = async(user: User) => {
    // TODO: evaluate the last past test of the user and store the data into past tests data
    if(user.pastTests === undefined || user.pastTests.length === 0)
        return;
        
    try{
        var questionAnswerMap: {[key: string]: string} = {};
        user.pastTests[user.pastTests.length - 1].questions.forEach(({id, selectedAnswer}) => questionAnswerMap[id]=selectedAnswer);
        const questionIDs = Object.keys(questionAnswerMap);

        // calculating marks
        var totalMarks: number = 0;
        const questionsSnapshot = await db.collection('questions').where('id', 'in', questionIDs).get();
        questionsSnapshot.forEach(doc => {
            let question = doc.data();
            if(question.ans === questionAnswerMap[question.id])
                totalMarks+=1;
        });

        // update marks on server
        const updatedUserDetails = {...user};
        updatedUserDetails.pastTests[updatedUserDetails.pastTests.length - 1].marksObtained = totalMarks;
        updateUserDetails(updatedUserDetails);
    }
    catch (e){
        console.error(e);
    }
}
