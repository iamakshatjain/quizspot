import {useState} from 'react';
import {Login} from './Login';
import {Tests} from './Tests';
import {Rules} from './Rules';
import {Questions} from './Questions';
import {Completed} from './Completed';

// TODO: apply routing and redux later
const selectedScreen = (screen: number, 
    setScreen: React.Dispatch<React.SetStateAction<number>>) => {
    switch(screen){
        case 0: return <Login setScreen={setScreen}/>;
        case 1: return <Tests setScreen={setScreen}/>;
        case 2: return <Rules setScreen={setScreen}/>;
        case 3: return <Questions setScreen={setScreen}/>;
        case 4: return <Completed/>;
        default: return <Login setScreen={setScreen}/>
    }
}

export const App = () => {
    const [screen, setScreen] = useState<number>(0);

    return (<div className="container">
                {selectedScreen(screen, setScreen)}
            </div>);
}