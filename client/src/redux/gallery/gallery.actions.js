import GalleryActionTypes from './gallery.types';

export const fetchGalleryStart = () => ({
	type: GalleryActionTypes.FETCH_GALLERY_START
})

export const fetchGallerySuccess = gallery => ({
	type: GalleryActionTypes.FETCH_GALLERY_SUCCESS,
	payload: gallery
})

export const fetchGalleryFailure = error => ({
	type: GalleryActionTypes.FETCH_GALLERY_FAILURE,
	payload: error
})