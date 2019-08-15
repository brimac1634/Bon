import { createSelector } from 'reselect';

const selectGallery = state => state.gallery;

export const selectGalleryItems = createSelector(
	[selectGallery],
	gallery => gallery.gallery
)

export const selectGalleryIsLoaded = createSelector(
	[selectGallery],
	gallery => !!gallery.gallery
)