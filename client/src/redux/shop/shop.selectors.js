import { createSelector } from 'reselect'

const selectShop = state => state.shop;

export const selectItemsMap = createSelector(
	[selectShop],
	shop => shop.collections.reduce((accum, item) => {
		accum[item.id] = item;
		return accum
	}, {})
)

export const selectCollectionsMap = createSelector(
	[selectShop],
	shop => shop.collections.reduce((accum, item) => {
		let category = accum[item.category];
		accum[item.category] = category
			? { ...category, items: [...category.items, item]}
			: { title: item.category, items: [item]}
		return accum
	}, {})
)

export const selectCollection = collectionUrlParam => createSelector(
	[selectCollectionsMap],
	collections => collections ? collections[collectionUrlParam] : null
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
	shop => !!shop.collections
)
