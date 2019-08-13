import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { fetchGallerySuccess, fetchGalleryFailure } from './gallery.actions';

import GalleryActionTypes from './gallery.types';

const getMediaList = () => {
	axios({
		url: 'gallery',
		
	})
}

export function* fetchGalleryAsync() {
	try {
		const mediaList = yield getMediaList();
		console.log(mediaList)
	} catch (err) {
		yield put(fetchGalleryFailure(err.message))
	}
}

export function* fetchGalleryStart() {
	yield takeLatest(
		GalleryActionTypes.FETCH_GALLERY_START, 
		fetchGalleryAsync
	)
}

export function* gallerySagas() {
	yield all([call(fetchGalleryStart)])
}