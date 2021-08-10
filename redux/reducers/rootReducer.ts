import { combineReducers } from "redux";

// Types
import { Istate } from "../../types";

// Reducers
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers<Istate>({
    user: userReducer,
    auth: authReducer
})