import UserActionTypes from './user.types';

const INITIAL_STATE ={
	currentUser: null,
	isFetching: false,
	error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.CHECK_USER_SESSION:
		case UserActionTypes.GOOGLE_SIGN_IN_START:
		case UserActionTypes.EMAIL_SIGN_IN_START:
		case UserActionTypes.SIGN_OUT_START:
			return {
				...state,
				isFetching: true
			}
		case UserActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				isFetching: false,
				error: null
			}
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				isFetching: false,
				error: null
			}
		case UserActionTypes.SIGN_IN_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		default:
			return state;
	}
}

export default userReducer;