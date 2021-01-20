export const tests =  [
    {
        id: "123",
        compName: "Aventior",
        type: {identifier: "JAVA", label: "Java"},
        qCount: 2,
        timeAllowed: 600,
        level: 2
    },
    {
        id: "124",
        compName: "Aventior",
        type: {identifier: "VUEJS", label: "VueJs"},
        qCount: 15,
        timeAllowed: 15,
        level: 2
    },
    {
        id: "125",
        compName: "Aventior",
        type: {identifier: "NODEJS", label: "NodeJS"},
        qCount: 15,
        timeAllowed: 15,
        level: 2
    },
    {
        id: "126",
        compName: "Aventior",
        type: {identifier: "SWIFT", label: "Swift"},
        qCount: 15,
        timeAllowed: 15,
        level: 2
    }
];

export const userData = [
    {
        id: "131",
        name: "Akshat",
        email: "wastea33@gmail.com",
        availableTests: [{
            id: "123",
            questions: [],
            remainingTime: -1,
            marksObtained: -1
        },
        {
            id: "124",
            questions: [],
            remainingTime: -1,
            marksObtained: -1
        },
        {
            id: "125",
            questions: [],
            remainingTime: -1,
            marksObtained: -1
        },
        {
            id: "126",
            questions: [],
            remainingTime: -1,
            marksObtained: -1
        }],
        pendingTests: [],
        pastTests: []
    }
];

export const questions = [{
        id: "qJAVA1",
        ques: "What is your java1?",
        options: ["one", "two", "three", "four"],
        ans: "two",
        type: "MCQ",
        tag: "JAVA",
        level: 2
    },
    {
        id: "qJAVA2",
        ques: "What is your dog's JAVA2?",
        options: ["one", "two", "three", "four"],
        ans: "two",
        type: "MCQ",
        tag: "JAVA",
        level: 2
    },
    {
        id: "qJAVA3",
        ques: "What is your car's JAVA3?",
        options: ["one", "two", "three", "four"],
        ans: "two",
        type: "MCQ",
        tag: "JAVA",
        level: 2
    }];