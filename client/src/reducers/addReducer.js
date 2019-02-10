import { ADD_MEMBER } from '../actions/types'


const initialState ={
	display:'none'
}

export default function(state = initialState, action){

	switch(action.type){
		case ADD_MEMBER:
			return {...state,
				display:action.payload}
		default:
			return state
	}
}