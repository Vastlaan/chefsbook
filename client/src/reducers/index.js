import {combineReducers} from 'redux'
import addMember from './addReducer';
import recepiesReducer from './recepiesReducer'
import memberReducers from './memberReducers'

export default combineReducers({
	addMember,
	fetchRecepies: recepiesReducer,
	openMember: memberReducers
})