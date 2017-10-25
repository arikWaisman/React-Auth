import { FETCH_MESSAGE } from '../actions/types';

export default ( state = {}, action ) => {

	switch(action.type){

		case FETCH_MESSAGE:
			return { ...state, msg: action.payload }

	}

	return state

}