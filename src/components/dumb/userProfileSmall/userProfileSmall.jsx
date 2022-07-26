import './userProfileSmall.css'

function UserProfileSmall ({userLink, userAvatar, username}) {
    return (
        <>
            <a className="header__content_user-profile" href={userLink}>
                <img className="header__content_user-profile--user-avatar" src={userAvatar} alt=""/>
                {username}
            </a>
        </>
    )
}

export default UserProfileSmall;