import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { gallerySagas } from './gallery/gallery.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
	yield all([
		call(shopSagas),
		call(userSagas),
		call(gallerySagas),
		call(cartSagas)
	])
}