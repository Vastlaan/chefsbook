import { HIDE_POPUP } from '../actions/types'


const initialState ={
	cookiesPopup:'block'
}

export default function(state = initialState, action){

	switch(action.type){
		case HIDE_POPUP:
			return {...state,
				cookiesPopup:action.payload}
		default:
			return state
	}
}