import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import {
	fetchCollectionsSuccess,
	fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
	try {
		const { data } = yield axios.get('get-collection');
		yield put(fetchCollectionsSuccess(data));
	} catch (err) {
		console.log(err)
		yield put(fetchCollectionsFailure(err.message))
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(
		ShopActionTypes.FETCH_COLLECTIONS_START, 
		fetchCollectionsAsync
	)
}

export function* shopSagas() {
	yield all([call(fetchCollectionsStart)])
}