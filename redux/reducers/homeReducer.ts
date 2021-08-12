import { AnyAction } from "redux";
import { Ipost } from "../../types";
import { LOAD_ALL_POSTS } from "../actionTypes/types";

export const homeReducer = (state: Ipost[] = [], action: AnyAction) => {

    switch (action.type) {
        case LOAD_ALL_POSTS:
            return state = action.payload
        default:
            return state
    }

}