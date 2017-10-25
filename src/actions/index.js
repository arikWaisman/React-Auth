import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const API_URL = 'http://localhost:3090';

export const signinUser = (formValues, history) => {

	return (dispatch) => {
		//Submit email/password to the ser`ver
		axios.post(`${API_URL}/signin`,{
			email: formValues.email,
			password: formValues.password
		})
		.then( (response) => {
			//If request is good...
			// - update state to indicate user is authenticated
			dispatch({ type: AUTH_USER });

			// - save the jwt token
			localStorage.setItem('token', response.data.token);

			// - redirect to the route '/feature'
			history.push('/feature');

		})
		.catch( () => {
			//If request is bad...
			// - show and error to the user	
			dispatch( authError('Bad Login Info') );
		});
	}

}

export const signupUser = (formValues, history) => {

	return (dispatch) => {
		axios.post(`${API_URL}/signup`,{
			email: formValues.email,
			password: formValues.password
		})
		.then( (response) => {

			dispatch({ type: AUTH_USER });

			// - save the jwt token
			localStorage.setItem('token', response.data.token);

			// - redirect to the route '/feature'
			history.push('/feature');

		})
		.catch( (error) => {
			//If request is bad...
			// - show and error to the user	
			dispatch( authError(error.response.data.error) );

		});

	}
}


export const signoutUser = () => {

	return (dispatch) => {
		localStorage.removeItem('token');
		dispatch({ type: UNAUTH_USER });
	}

}


export const authError = (error) => {

	return {
		type: AUTH_ERROR,
		payload: error
	}
	
}

export const fetchMessage = () => {

	return (dispatch) => {

		axios.get(API_URL, {
			headers: { authorization: localStorage.getItem('token') }
		})
		.then( (response) => {
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			})			
		});

	} 

}