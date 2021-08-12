import { AnyAction } from "redux";
import { LOAD_MY_NAMES } from "../actionTypes/types";

export const namesReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case LOAD_MY_NAMES:
            return state = action.payload
        default:
            return state
    }

}