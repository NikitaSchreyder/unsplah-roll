import './auth.css';

function Auth ({authentication}) {
    return(
        <button className="authorization-btn" onClick={authentication}>Authentication via Unsplash</button>
    )
}

export default Auth