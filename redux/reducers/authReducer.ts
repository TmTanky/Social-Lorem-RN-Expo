import { AnyAction } from "redux";
import { AUTH, UN_AUTH } from "../actionTypes/types";

export const authReducer = (state = false, action: AnyAction) => {

    switch(action.type) {
        case AUTH:
            return state = true
        case UN_AUTH:
            return state = false
        default:
            return state
    }

}