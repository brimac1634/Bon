import { createSelector } from 'reselect';

const selectMenu = state => state.menu;

export const selectMenuState = createSelector(
	[selectMenu],
	menu => menu.menuIsOpen
)