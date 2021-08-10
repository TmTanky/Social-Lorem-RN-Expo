// Types
import { Iuser } from "../../types"

// Action Types
import { AUTH, LOGIN_USER, UN_AUTH } from "../actionTypes/types"

export const loginUser = (data: Iuser) => {

    return {
        type: LOGIN_USER,
        payload: data
    }

}

export const authUser = () => {

    return {
        type: AUTH
    }

}

export const unAuthUser = () => {

    return {
        type: UN_AUTH
    }

}