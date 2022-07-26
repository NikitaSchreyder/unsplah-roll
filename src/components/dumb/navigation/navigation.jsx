import './navigation.css'

function Navigation () {
    const url = new URL(window.location.href);
    const {hash} = url;
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className={`navigation__list-item ${hash == '' ? 'item-selected' : ''}`}>
                    <a className="navigation__list-item--link" href="/">Все</a>
                </li>
                <li className={`navigation__list-item ${hash == '#liked' ? 'item-selected' : ''}`}>
                    <a className="navigation__list-item--link" href="#liked">Понравилось</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;