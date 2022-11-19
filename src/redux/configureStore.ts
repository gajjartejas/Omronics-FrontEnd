import { Store, createStore, applyMiddleware, Action } from "redux";
import { useDispatch } from "react-redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./reducers";

import { initialState } from "./system/SystemState";

function configureStore(initialState: any): Store<any> {
	const composeEnhancers = composeWithDevTools({});
	const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
	return store;
}

export const store = configureStore(initialState);
export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
