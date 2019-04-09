import { ADD_MEMBER } from "./types";
import { OPEN_MEMBER } from "./types";
import { FETCH_RECEPIES } from "./types";
import { FETCH_PROFILE } from "./types";

export const openWindowAction = () => dispatch => {
	dispatch({
		type: ADD_MEMBER,
		payload: "block"
	});
};

export const closeWindowAction = () => dispatch => {
	dispatch({
		type: ADD_MEMBER,
		payload: "none"
	});
};

export const openMemberAction = () => dispatch => {
	dispatch({
		type: OPEN_MEMBER,
		payload: "block"
	});
};

export const closeMemberAction = () => dispatch => {
	dispatch({
		type: OPEN_MEMBER,
		payload: "none"
	});
};

export const fetchRecepies = () => async dispatch =>{

	const res = await fetch('/api/current_user/recepies',{credentials: 'include'});
	const content = await res.json()

	dispatch({
		type: FETCH_RECEPIES,
		payload: content
	})
}

export const fetchProfile = () => async dispatch =>{

	const res = await fetch('/api/current_user',{credentials: 'include'});
	const content = await res.json()

	dispatch({
		type: FETCH_PROFILE,
		payload: content
	})
}