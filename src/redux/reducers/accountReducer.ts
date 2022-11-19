import { LOGIN_USER, LOGIN_USER_SUCCESS } from "../constants";
import { AccountState } from "../../model/account/account";
import { AccountActionTypes } from "../types/accountActionTypes";
import { initialState } from "../system/SystemState";

export default function accountReducer(state = initialState.account, action: AccountActionTypes): AccountState {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
			};
		case LOGIN_USER_SUCCESS:
			return {
				...state,
			};

		default:
			return state;
	}
}
