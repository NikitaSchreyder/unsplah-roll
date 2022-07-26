import React, {useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import UserProfileSmall from '../userProfileSmall/userProfileSmall'

import './imagePage.css'

function ImagePage({id, openImageData, getImage, changeImageLikeStatus}) {
    useEffect(() => getImage(id), []);
    return (
        <section className="image-block">
            {
                openImageData && (
                    <>
                        <img className="image-block__image" src={openImageData.urls.regular} alt={openImageData.alt_description}/>
                        <div className="image-block__details">
                            <div className="image-block__details--username-wrapper">
                                <UserProfileSmall 
                                    userAvatar={openImageData.user.profile_image.medium}
                                    userLink={openImageData.user.links.html}
                                    username={
                                        openImageData.user.username.length > 15
                                        ? openImageData.user.username.slice(0,15) + '...'
                                        : openImageData.user.username
                                    }
                                />
                                <p className="image-block__details--public-date">{new Date(openImageData.promoted_at).toLocaleDateString()}</p>
                            </div>
                            <p className="image-block__details--description">{openImageData.description != null ? openImageData.description : openImageData.alt_description}</p>
                            <button className="image-block__details--like-btn" onClick={changeImageLikeStatus}>{openImageData.likes}</button>
                        </div>
                    </>
                )
            }
        </section>
    )
}

const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(withRouter(ImagePage));