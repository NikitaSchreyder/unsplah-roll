import { createApi } from 'unsplash-js';

const API_URL = 'https://api.unsplash.com';
const AUTH_URL = 'https://unsplash.com/oauth/authorize';
const OAUTH_URL = 'https://unsplash.com/oauth';
const ACCESS_KEY = 'FuoHarhp8SvzFZd00EL2iCR0jmAUROZGlkQmxiPMgnY';
const SECRET_KEY = 'xWfXAxIzsSuM8P7CqRZ0Iuq4Qvx63uTsmsYayPtbvHw';
const REDIRECT_URL = 'http://localhost:3000';
const IMAGES_PER_LOAD = 9;

const unsplash = createApi({
  accessKey: ACCESS_KEY,
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem('user_authentication_token')
  }
});

export const authentication = () => {
  const RESPONSE_TYPE = 'code';
  const SCOPE = 'public+read_user+write_likes';
  const URL = `${AUTH_URL}/?client_id=${ACCESS_KEY}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
  window.location.assign(URL)
};

export const getAuthenticationToken = (code) => {
  const GRANT_TYPE = 'authorization_code';
  const URL = `${OAUTH_URL}/token?client_id=${ACCESS_KEY}&client_secret=${SECRET_KEY}&redirect_uri=${REDIRECT_URL}&code=${code}&grant_type=${GRANT_TYPE}`;
  const params = {
    method: 'POST'
  }
  fetch(URL, params)
    .then(data => data.json())
    .then(data => {
      localStorage.setItem('user_authentication_token', data.access_token);
      window.location.assign('/')
    })
    .catch(err => console.error(err));
};

export const getUserData = (authenticationToken, setUserData) => {
    const URL = `${API_URL}/me`;
    const params = {
      headers: {
        Authorization: 'Bearer ' + authenticationToken
      }
    }
    fetch(URL, params)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        window.location.assign('/');
        setUserData(data)
      })
};

export const getImage = (id, setOpenImageData) => {
  unsplash.photos.get({ photoId: id })
    .then(data => {
      const image = data.response;
      setOpenImageData(image);
    })
    .catch(err => console.error(err))
};

export const getImages = (imagesData, setImagesData) => {
  unsplash.photos.getRandom({
    count: IMAGES_PER_LOAD
  })
    .then(data => {
      const images = data.response;
      setImagesData([...imagesData, ...images]);
    })
    .catch(err => console.error(err));
};

export const getUserLikedImages = (username, likedImagesPage, userLikedImagesData, setUserLikedImagesData, setLikedImagesPage, USER_AUTHENTICATION_TOKEN) => {
  const URL = `${API_URL}/users/${username}/likes?page=${likedImagesPage}&per_page=${IMAGES_PER_LOAD}`;
    const params = {
      headers: {
        Authorization: 'Bearer ' + USER_AUTHENTICATION_TOKEN
      }
    }
    fetch(URL, params)
      .then(data => data.json())
      .then(data => {
        if(likedImagesPage == 1) {
          setUserLikedImagesData(data)
          setLikedImagesPage(2)
        } else {
          setUserLikedImagesData([...userLikedImagesData, ...data])
          setLikedImagesPage(likedImagesPage + 1)
        }
      })
      .catch(err => console.error(err))
};

export const searchImages = (query, searchImagesPage, searchImagesData, setSearchImagesData, setSearchImagesPage) => {
  unsplash.search.getPhotos({
    query,
    page: searchImagesPage,
    perPage: IMAGES_PER_LOAD
  })
    .then(data => {
      const images = data.response.results;
      if(searchImagesPage == 1) {
        setSearchImagesData(images);
        setSearchImagesPage(2);
      } else {
        setSearchImagesData([...searchImagesData, ...images]);
        setSearchImagesPage(searchImagesPage + 1)
      }
    })
    .catch(err => console.error(err));
};

export const changeImageLikeStatus = (openImageData, USER_AUTHENTICATION_TOKEN, imagesData, setOpenImageData) => {
  const {id, liked_by_user} = openImageData
  const URL = `${API_URL}/photos/${id}/like`
  if (!liked_by_user) {
    fetch(URL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + USER_AUTHENTICATION_TOKEN
      }
    }) 
    .then(data => data.json())
    .then(data => {
      const {photo} = data;
      const images = [...imagesData]
      // updating image page
      images.filter(item => {
        if (item.id == photo.id) {
          item.likes = photo.likes
          item.liked_by_user = photo.liked_by_user
          setOpenImageData(item)
        }
      })
    })
  } else {
    fetch(URL, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + USER_AUTHENTICATION_TOKEN
      }
    })  
    .then(data => data.json())
    .then(data => {
      const {photo} = data;
      const images = [...imagesData]
      // updating image page
      images.filter(item => {
        if (item.id == photo.id) {
          item.likes = photo.likes
          item.liked_by_user = photo.liked_by_user
          setOpenImageData(item)
        }
      })
    })
  }
};