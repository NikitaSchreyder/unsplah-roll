export const reducer = (state, action) => {
    const {payload} = action
    switch (action.type) {
        case 'SET_IMAGES_DATA':
            return {
                ...state,
                imagesData: payload
            }
        case 'SET_LIKED_IMAGES_PAGE':
            return {
                ...state,
                likedImagesPage: payload
            }
        case 'SET_SEARCH_IMAGES_PAGE':
            return {
                ...state,
                searchImagesPage: payload
            }
        case 'SET_OPEN_IMAGE_DATA':
            return {
                ...state,
                openImageData: payload
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: payload
            }
        case 'SET_USER_LIKED_IMAGES_DATA':
            return {
                ...state,
                userLikedImagesData: payload
            }
        case 'SET_SEARCH_IMAGES_DATA':
            return {
                ...state,
                searchImagesData: payload
            }
        case 'SET_SEARCH_IMAGES_QUERY':
            return {
                ...state,
                searchImagesQuery: payload
            }
        default:
            return state
    }
}