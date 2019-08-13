import GalleryActionTypes from './gallery.types';

const INITIAL_STATE ={
	gallery: null,
	isFetching: false,
	error: null
}

const galleryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GalleryActionTypes.FETCH_GALLERY_START:
			return {
				...state,
				isFetching: true
			}
		case GalleryActionTypes.FETCH_GALLERY_SUCCESS:
			return {
				...state,
				gallery: action.payload,
				isFetching: false,
				error: null
			}
		case GalleryActionTypes.FETCH_GALLERY_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		default:
			return state;
	}
}

export default galleryReducer;