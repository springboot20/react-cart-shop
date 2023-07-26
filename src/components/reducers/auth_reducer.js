import { SIGNUP, SIGNIN, LOGOUT, SIGNIN_ERROR, SIGNUP_ERROR, LOGOUT_ERROR } from '../actions/actions';
import jwt_decode from 'jwt-decode';

const auth_reducer = (state, action) => {
	switch (action.type) {
		case SIGNUP:
			return { ...state, signupMsg: action.payload, isLoggedIn: true };
		case SIGNUP_ERROR:
			return { ...state, isLoggedIn: false, signupErrMsg: action.payload };
		case SIGNIN:
			const accessToken = action.payload.tokens.accessToken;
			let tokens = action.payload.tokens;
			return { ...state, user: action.payload, isLoggedIn: true, signinMsg: action.payload, auth: jwt_decode(accessToken, { header: true }), tokens };
		case SIGNIN_ERROR:
			return { ...state, isLoggedIn: false, signinErrMsg: action.payload };
		case LOGOUT:
			return { ...state, isLoggedIn: false, logoutMsg: action.payload };
		case LOGOUT_ERROR:
			return { ...state, isLoggedIn: false, logoutErrMsg: action.payload };
		default:
			return state;
	}
};

export default auth_reducer;
