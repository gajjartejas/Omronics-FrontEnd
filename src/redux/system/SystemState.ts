import { Account, AccountState } from "../../model/account/account";

export interface SystemState {
	account: AccountState;
}

const accountJson = localStorage.getItem("account");
const account: Account =
	accountJson !== null
		? JSON.parse(accountJson)
		: {
				accountGuid: "",
				password: "",
				email: "",
				firstName: "",
				lastName: "",
		  };

export const initialState: SystemState = {
	account: {
		account: account,
		error: null,
		isLoading: false,
	},
};
