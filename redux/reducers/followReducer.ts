import { AnyAction } from "redux";
import { Iuser } from "../../types";
import { LOAD_MY_FOLLOW } from "../actionTypes/types";

type State = {
    followers?: Iuser[]
    following?: Iuser[]
}

export const followReducer = (state: State = {}, action: AnyAction) => {

    switch(action.type) {
        case LOAD_MY_FOLLOW:
            return state = action.payload
        default:
            return state
    }

}