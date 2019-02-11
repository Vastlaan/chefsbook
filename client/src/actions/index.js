import { ADD_MEMBER } from "./types";

export const openWindowAction = () => dispatch => {
	console.log("1122");
	dispatch({
		type: ADD_MEMBER,
		payload: "block"
	});
};

export const closeWindowAction = () => dispatch => {
	console.log("2211");
	dispatch({
		type: ADD_MEMBER,
		payload: "none"
	});
};
