import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertGalleryData } from '../../firebase/firebase.utils';

import { fetchGallerySuccess, fetchGalleryFailure } from './gallery.actions';

import GalleryActionTypes from './gallery.types';


export function* fetchGalleryAsync() {
	try {
		const galleryRef = firestore.collection('gallery');
		const snapshot = yield galleryRef.get();
		const gallery = yield call(convertGalleryData, snapshot)
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