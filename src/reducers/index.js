import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import featureReducer from './feature_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  featureMessage: featureReducer
});

export default rootReducer;
