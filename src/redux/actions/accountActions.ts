import { LOGIN_USER, LOGIN_USER_SUCCESS } from "../constants";
import { AccountActionTypes } from "../types/accountActionTypes";

export function loginUser(): AccountActionTypes {
	return {
		type: LOGIN_USER,
	};
}

export function loginUserSuccess(data: any): AccountActionTypes {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: data,
	};
}
