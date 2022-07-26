import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Import actionCreators
import { 
  setUserData, 
  setImagesData, 
  setOpenImageData, 
  setLikedImagesPage, 
  setSearchImagesData, 
  setSearchImagesPage, 
  setSearchImagesQuery, 
  setUserLikedImagesData 
} from '../../../store/actions';
// Import unsplash api methods
import {
  authentication,
  getAuthenticationToken,
  getUserData,
  getImages,
  getImage,
  getUserLikedImages,
  changeImageLikeStatus,
  searchImages
} from '../../../services/unsplash'
// Import styles
import './App.css';
//Import components
import Auth from '../../dumb/auth/auth';
import Header from '../../dumb/header/header';
import ImagePage from '../../dumb/imagePage/imagePage';
import ImagesRoll from '../../dumb/imagesRoll/imagesRoll';
import Navigation from '../../dumb/navigation/navigation';
import UserProfile from '../../dumb/userProfile/userProfile';

function App(props) {
  const { 
    userData, 
    imagesData,  
    openImageData, 
    likedImagesPage, 
    searchImagesPage, 
    searchImagesData, 
    searchImagesQuery, 
    userLikedImagesData, 
    setUserData, 
    setImagesData, 
    setOpenImageData, 
    setLikedImagesPage, 
    setSearchImagesPage, 
    setSearchImagesData, 
    setSearchImagesQuery, 
    setUserLikedImagesData 
  } = props;
  const USER_AUTHENTICATION_TOKEN = localStorage.getItem('user_authentication_token');
  // Updating app
  const updateApp = () => {
    
    if(userData == null) {
      getUserDataHandler();
    }
    if(imagesData.length == 0) {
      getImagesHandler();
    }
    if(openImageData != null) {
      setOpenImageData(null)
    }
    setSearchImagesPage(1);
    setSearchImagesData([]);
    setSearchImagesQuery('')

    userData && (
      getUserLikedImages(userData.username, 1, userLikedImagesData, setUserLikedImagesData, setLikedImagesPage, USER_AUTHENTICATION_TOKEN)
    )
  }

  const getImageHandler = (id) => {
    getImage(id, setOpenImageData)
  }

  const getUserDataHandler = () => {
    getUserData(USER_AUTHENTICATION_TOKEN, setUserData);
  }

  const getImagesHandler = () => {
    getImages(imagesData, setImagesData)
  }

  const getUserLikedImagesHandler = () => {
    userData && (
      getUserLikedImages(userData.username, likedImagesPage, userLikedImagesData, setUserLikedImagesData, setLikedImagesPage, USER_AUTHENTICATION_TOKEN)
    )
  }

  const searchImagesHandler = (query) => {
    if(typeof query == 'string') {
      setSearchImagesData([]);
      setSearchImagesQuery(query);
      searchImages(query, 1, searchImagesData, setSearchImagesData, searchImagesPage, setSearchImagesPage);
      window.location.hash = '#search';
    } else {
      searchImages(searchImagesQuery, searchImagesPage, searchImagesData, setSearchImagesData, setSearchImagesPage)
    }
  }

  const changeImageLikeStatusHandler = () => {
    changeImageLikeStatus(openImageData, USER_AUTHENTICATION_TOKEN, imagesData, setOpenImageData)
  }

  const HomeComponent = () => {
    const { hash } = new URL(window.location.href);
    const imagesRoll = 
      (hash == '#liked') 
        ? <ImagesRoll loadImages={getUserLikedImagesHandler} imagesData={userLikedImagesData} /> :
      (hash == '#search') 
        ? <ImagesRoll loadImages={searchImagesHandler} imagesData={searchImagesData} /> :
      <ImagesRoll loadImages={getImagesHandler} imagesData={imagesData} />

    if (USER_AUTHENTICATION_TOKEN == null) {
      return <Auth authentication={authentication} />
    }
    if (USER_AUTHENTICATION_TOKEN != null) {
      return (
        <React.Fragment>
          { userData ? <UserProfile userData={userData} /> : null }
          <Navigation />
          {imagesRoll}
        </React.Fragment>
      )
    }
  };

  useEffect(() => {
    const location = window.location.href;
    if(USER_AUTHENTICATION_TOKEN != null) {
      updateApp();
    }
    if(location.includes('/?code=') && USER_AUTHENTICATION_TOKEN == null) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      getAuthenticationToken(code);
    }
  }, []);

  return (
    <div className="App">
      {
        userData && (
          <Header 
            searchImagesQuery={searchImagesQuery} 
            setSearchImagesData={setSearchImagesData} 
            setSearchImagesQuery={setSearchImagesQuery} 
            searchPhotos={searchImagesHandler} 
            userData={userData} />
        ) 
      }
      <BrowserRouter>
        <Switch>
          <Route exact={true} path={"/"} render={({match}) => HomeComponent(match)}/>
          <Route 
            exact={true} 
            path="/:id" 
            render={({match}) =>  
              <ImagePage 
                id={match.params.id}
                getImage={getImageHandler} 
                changeImageLikeStatus={changeImageLikeStatusHandler}
                imageData={openImageData} />
          } />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
// Передаем state в props компонента
const mapStateToProps = (state) => {
  return state;
};
// Передаем actionCreators в props компонента
const mapActionsToProps = (dispatch) => {
  return {
    setUserData: bindActionCreators(setUserData, dispatch),
    setImagesData: bindActionCreators(setImagesData, dispatch),
    setOpenImageData: bindActionCreators(setOpenImageData, dispatch),
    setLikedImagesPage: bindActionCreators(setLikedImagesPage, dispatch),
    setSearchImagesPage: bindActionCreators(setSearchImagesPage, dispatch),
    setSearchImagesData: bindActionCreators(setSearchImagesData, dispatch),
    setSearchImagesQuery: bindActionCreators(setSearchImagesQuery, dispatch),
    setUserLikedImagesData: bindActionCreators(setUserLikedImagesData, dispatch)
  }
};

export default connect(mapStateToProps, mapActionsToProps)(App);