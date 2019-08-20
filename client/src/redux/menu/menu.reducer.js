import MenuActionTypes from './menu.types';

const INITIAL_STATE = {
	menuIsOpen: false
}

const menuReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MenuActionTypes.TOGGLE_MENU:
			return {
				...state,
				menuIsOpen: !state.menuIsOpen
			}
		default:
			return state
	}
}

export default menuReducer;