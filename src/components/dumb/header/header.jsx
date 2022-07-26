import React from 'react';
import SearchForm from '../searchForm/searchForm';
import UserProfileSmall from '../userProfileSmall/userProfileSmall';

import './header.css'

function Header({userData, searchPhotos, setSearchImagesQuery, setSearchImagesData}) {
    const {pathname} = window.location;
    const backButton = pathname != '/' ? <a className="header__content--back-button" href="/">back</a> : null
    const searchForm = pathname == '/' ? <SearchForm setSearchImagesData={setSearchImagesData} setSearchImagesQuery={setSearchImagesQuery} searchPhotos={searchPhotos} /> : null
    return (
        <div className="header">
            <div className="header__content">
                { backButton }
                <a className="header__content--logo" href="/">Insplash</a>
                { searchForm }
                <UserProfileSmall 
                    userAvatar={userData.profile_image.small}
                    username={userData.username}
                    userLink={userData.links.html}
                />
            </div>
        </div>  
    )
}

export default Header;