import {combineReducers} from 'redux'
import addMember from './addReducer';
import recepiesReducer from './recepiesReducer'

export default combineReducers({
	addMember,
	fetchRecepies: recepiesReducer
})