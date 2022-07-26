export const setUserData = (userData) => {
    return {
        type: 'SET_USER_DATA',
        payload: userData
    }
}

export const setImagesData = (imagesData) => {
    return {
        type: 'SET_IMAGES_DATA',
        payload: imagesData
    }
}

export const setOpenImageData = (openImageData) => {
    return {
        type: 'SET_OPEN_IMAGE_DATA',
        payload: openImageData
    }
}

export const setUserLikedImagesData = (userLikedImagesData) => {
    return {
        type: 'SET_USER_LIKED_IMAGES_DATA',
        payload: userLikedImagesData
    }
}

export const setLikedImagesPage = (pageNumber) => {
    return {
        type: 'SET_LIKED_IMAGES_PAGE',
        payload: pageNumber
    }
}

export const setSearchImagesPage = (pageNumber) => {
    return {
        type: 'SET_SEARCH_IMAGES_PAGE',
        payload: pageNumber
    }
}

export const setSearchImagesData = (searchImagesData) => {
    return {
        type: 'SET_SEARCH_IMAGES_DATA',
        payload: searchImagesData
    }
}

export const setSearchImagesQuery = (searchImagesQuery) => {
    return {
        type: 'SET_SEARCH_IMAGES_QUERY',
        payload: searchImagesQuery
    }
}