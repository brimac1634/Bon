import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { fetchGallerySuccess, fetchGalleryFailure } from './gallery.actions';

import GalleryActionTypes from './gallery.types';

export function* fetchGalleryAsync() {
	try {
		const { data } = yield axios.get('get-gallery');
		const gallery = data.map(({ media_type, media_url, ...item }) => (
			{ mediaType: media_type, mediaUrl: media_url, ...item }
		))
		yield put(fetchGallerySuccess(gallery))
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