import logo from "./Assets/logo_circle.png";
import './Assets/index.css';

interface SetScreenAction {
    setScreen: React.Dispatch<React.SetStateAction<number>>
}


export const Login = ({setScreen}: SetScreenAction) => {

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: check for existing user else create new
        // TODO: update user info in local state of the app
        setScreen(1);
    }

    return (
        <>
            <div style={{width: `${0.1* Math.max(window.innerWidth, window.innerHeight)}px`, margin: "20vh auto 5vh"}}>
                <img src={logo} style={{width: "100%"}} alt="OppSpot-logo"/>
            </div>
            <form className="card card-shadow" onSubmit={onSubmit}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input type="text" className="form-control" id="nameInput" aria-describedby="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enter</button>
                </div>
            </form>
        </>
    )
}