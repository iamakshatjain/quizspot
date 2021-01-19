import {useState} from 'react';
import {Login} from './Login';
import {Tests} from './Tests';
import {Rules} from './Rules';
import {Questions} from './Questions';
import {Completed} from './Completed';

import {User, Test, SelectedScreen} from './types';

// TODO: apply routing till tests page (user must not be able to reach test with a link)
// TODO: apply redux - priority
const selectedScreen: SelectedScreen  = (screen, setScreen, userDetails, setUserDetails) => {
    switch(screen){
        case 0: return <Login setScreen={setScreen} setUserDetails={setUserDetails}/>;
        case 1: return <Tests setScreen={setScreen} userDetails={userDetails} setUserDetails={setUserDetails}/>;
        case 2: return <Rules setScreen={setScreen}/>;
        case 3: return <Questions setScreen={setScreen} userDetails={userDetails} setUserDetails={setUserDetails}/>;
        case 4: return <Completed/>;
        default: return <Login setScreen={setScreen} setUserDetails={setUserDetails}/>
    }
}

export const App = () => {
    const [screen, setScreen] = useState<number>(0);
    const [userDetails, setUserDetails] = useState<User>({} as User);

    return (<div className="container">
                {selectedScreen(screen, setScreen, userDetails, setUserDetails)}
            </div>);
}