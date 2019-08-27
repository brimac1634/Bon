import { createSelector } from 'reselect'

const selectShop = state => state.shop;

export const selectCollection = createSelector(
	[selectShop],
	shop => shop.collection
)

export const selectItemsMap = createSelector(
	[selectShop],
	shop => shop.collection.reduce((accum, item) => {
		accum[item.productID] = item;
		return accum
	}, {})
)

export const selectProduct = productUrlParam => createSelector(
	[selectItemsMap],
	items => items ? items[productUrlParam] : null
)

export const selectIsCollectionFetching = createSelector(
	[selectShop],
	shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
	[selectShop],
	shop => !!shop.collection
)
