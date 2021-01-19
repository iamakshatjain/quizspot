export type Question = {
    id: string,
    ques: string,
    options: string[],
    ans: string,
}

export type UserQuestion = {
    id: string,
    ques: string,
    options: string[],
    selectedAnswer: string
}

export type UserTest = {
    id: string,
    remainingTime: number,
    marksObtained: number,
    questions: UserQuestion[],
}

// TODO: later add more details about how many questions from what tech stack etc.
export type Test = {
    id:string,
    compName: string,
    type: {label: string, identifier: string},
    qCount: number,
    timeAllowed: number,
    level: number
}

export type User = {
    id: string,
    name: string,
    email: string,
    availableTests: UserTest[],
    pendingTests: UserTest[],
    pastTests: UserTest[]
}

export type Err = {
    err: string
}

// App.tsx
export interface SelectedScreen {
    (screen: number, 
    setScreen: React.Dispatch<React.SetStateAction<number>>, 
    userDetails: User,
    setUserDetails: React.Dispatch<React.SetStateAction<User>>) : JSX.Element
}  

// Login.tsx
export interface LoginProps {
    setScreen: React.Dispatch<React.SetStateAction<number>>,
    setUserDetails: React.Dispatch<React.SetStateAction<User>>
}

// Tests.tsx
export interface TestCardProps{
    title: string, 
    companyName: string, 
    level: number,
    remainingTime?: number,
    timeAllowed?: number,
    questionCount: number,
    onClick: () => void,
    disabled: boolean
}

export interface TestsProps{
    setScreen: React.Dispatch<React.SetStateAction<number>>,
    userDetails: User,
    setUserDetails: React.Dispatch<React.SetStateAction<User>>
}

// Rules.tsx
export interface RulesProps {
    setScreen: React.Dispatch<React.SetStateAction<number>>
}

// Questions.tsx
export interface QuestionProps{
    questionData: UserQuestion,
    questionNumber: number,
    userDetails: User, 
    setUserDetails: React.Dispatch<React.SetStateAction<User>>,
    remainingTime: number,
    disabled: boolean
}

export interface QuestionsProps {
    setScreen: React.Dispatch<React.SetStateAction<number>>,
    userDetails: User,
    setUserDetails: React.Dispatch<React.SetStateAction<User>>
}