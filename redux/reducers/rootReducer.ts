import { combineReducers } from "redux";

// Types
import { Istate } from "../../types";

// Reducers
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { homeReducer } from "./homeReducer";
import { namesReducer } from "./namesReducer";
import { followReducer } from "./followReducer";
import { myPostReducer } from "./postReducer";

export const rootReducer = combineReducers<Istate>({
    user: userReducer,
    auth: authReducer,
    homeFeed: homeReducer,
    names: namesReducer,
    follow: followReducer,
    myPosts: myPostReducer
})