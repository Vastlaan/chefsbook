import { FETCH_RECEPIES } from "../actions/types";

const initialState = {
	recepies: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_RECEPIES:
			return { ...state, recepies: action.payload };
		default:
			return state;
	}
}
