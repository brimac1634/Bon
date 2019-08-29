export const addItemToCart = (cartItems, itemToAdd) => {
	const { item, quantity } = itemToAdd;
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === item.id
	)

	if (existingCartItem) {
		return cartItems.map(cartItem => {
			return cartItem.id === item.id
				? {...cartItem, quantity: cartItem.quantity + quantity}
				: cartItem
		})
	} else {
		return [...cartItems, { ...item, quantity: quantity }];
	}
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === itemToRemove.id
	)
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)
	}
	return cartItems.map(cartItem => {
		return cartItem.id === itemToRemove.id
			? 	{...cartItem, quantity: cartItem.quantity - 1}
			: 	cartItem
	})
}