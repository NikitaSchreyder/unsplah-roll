import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {createStore} from 'redux';

import './index.css';
import {reducer} from './store/reducer'

import App from './components/smart/app/App';

// Начальный state приложения
const preloadedState = 
localStorage.getItem('reduxState')
? JSON.parse(localStorage.getItem('reduxState'))
: {
    userData: null,
    imagesData: [],
    openImageData: null,
    likedImagesPage: 1,
    searchImagesPage: 1,
    searchImagesData: [],
    searchImagesQuery: '',
    userLikedImagesData: []
}

const store = createStore(reducer, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);