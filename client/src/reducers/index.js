import {combineReducers} from 'redux'
import addMember from './addReducer';
import recepiesReducer from './recepiesReducer'
import memberReducers from './memberReducers'
import profileReducer from './profileReducers'

export default combineReducers({
	addMember,
	fetchRecepies: recepiesReducer,
	openMember: memberReducers,
	fetchProfile: profileReducer
})