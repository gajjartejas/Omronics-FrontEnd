import { LOGIN_USER, LOGIN_USER_SUCCESS } from "../constants";
import { Account } from "../../model/account/account";

interface LoginUserAction {
	type: typeof LOGIN_USER;
}

interface LoginUserSuccessAction {
	type: typeof LOGIN_USER_SUCCESS;
	payload: Account;
}

export type AccountActionTypes = LoginUserAction | LoginUserSuccessAction;
