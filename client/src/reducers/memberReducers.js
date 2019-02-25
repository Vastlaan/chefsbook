import { OPEN_MEMBER } from "../actions/types";

const initialState = {
	displayMember: 'none'
};

export default function(state = initialState, action) {
	switch (action.type) {
		case OPEN_MEMBER:
			return { ...state, displayMember: action.payload };
		default:
			return state;
	}
}