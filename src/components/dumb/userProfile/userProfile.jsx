import React from 'react';
import './userProfile.css'

function UserProfile ({userData}) {
    const {username, profile_image, name, instagram_username, twitter_username} = userData
    const userSocialLinks = () => {
        if(instagram_username || twitter_username != null) {
            return (
                <div className="user-profile__details_links">
                    {
                        instagram_username != null
                        ? <a className="user-profile__details_links--instagram" href={"https://www.instagram.com/" + instagram_username}>{instagram_username}</a>
                        : null
                    }
                    {
                        twitter_username != null
                        ? <a className="user-profile__details_links--twitter" href={"https://www.twitter.com/" + twitter_username}>{twitter_username}</a>
                        : null
                    }
                </div>
            )
        }
    }
    return (
        <section className="user-profile">
            <img className="user-profile__avatar" src={profile_image.large} alt="User avatar"/>
            <div className="user-profile__details">
                <p className="user-profile__details--username">@{username}</p>
                <p className="user-profile__details--name">{name}</p>
                {
                    userSocialLinks()
                }
            </div>
        </section>
    )
}

export default UserProfile;