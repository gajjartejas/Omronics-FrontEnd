import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

const appReducer = combineReducers({
	account: accountReducer,
});

const rootReducer = (state: any, action: any) => {
	return appReducer(state, action);
};

export default rootReducer;
