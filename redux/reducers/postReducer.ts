import { AnyAction } from "redux";
import { Ipost } from "../../types";
import { LOAD_MY_POSTS } from "../actionTypes/types";

export const myPostReducer = (state: Ipost[] = [], action: AnyAction) => {

    switch(action.type) {

        case LOAD_MY_POSTS:
            return state = action.payload
        default:
            return state

    }

}