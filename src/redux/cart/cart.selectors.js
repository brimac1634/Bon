import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
	[selectCart],
	cart => cart.cartItems
)

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((accumQuant, cartItem) => {
		return accumQuant + cartItem.quantity
	}, 0)
)

export const selectCartTotal = createSelector(
	[selectCartItems],
	cartItems => cartItems.reduce((accumPrice, cartItem) => {
		return accumPrice + cartItem.quantity * cartItem.price
	}, 0)
)