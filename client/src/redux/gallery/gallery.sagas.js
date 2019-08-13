import { takeLatest, call, put, all } from 'redux-saga/effects';

import { fetchGallerySuccess, fetchGalleryFailure } from './gallery.actions';

import GalleryActionTypes from './gallery.types';

const getMediaList = () => {
	// return fetch(mediaUrl).then(res => res.json())
	// 	.then(list => list)
	// 	.catch(err => err)
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