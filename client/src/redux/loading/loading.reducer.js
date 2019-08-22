import LoadingActionTypes from './loading.types';

const INITIAL_STATE = {
	isLoading: false,
	message: ''
}

const loadingReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LoadingActionTypes.TOGGLE_LOADING:
			return {
				isLoading: !state.isLoading,
				message: action.payload,
				...state
			}
		default:
			return state
	}
}

export default loadingReducer;