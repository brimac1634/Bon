import LoadingActionTypes from './loading.types';

export const toggleLoading = message => ({
	type: LoadingActionTypes.TOGGLE_LOADING,
	payload: message
})