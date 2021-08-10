import { AnyAction } from "redux";
import { LOGIN_USER, LOGOUT_USER } from "../actionTypes/types";

export const userReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case LOGIN_USER:
            return state = action.payload
        case LOGOUT_USER:
            return state = {}
        default:
            return state
    }

}