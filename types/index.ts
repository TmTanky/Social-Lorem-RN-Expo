import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface Iuser {
    _id?: string
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    token?: string
    myPosts?: Ipost[]
    following?: Iuser[]
    followers?: Iuser[]
    username?: string
}

export interface Ipost {
    _id: string
    content: string
    postBy: Iuser
    likes: Iuser[]
    createdAt: string
    comments: Icomment[]
}

export interface Icomment {
    _id: string
    content: string
    commentBy: Iuser
    commentedOn: Ipost
}

export interface Istate {
    user: Iuser
    auth: boolean
    homeFeed: Ipost[]
    names: {
        firstName: string
        lastName: string
        username: string
    }
    follow: Ifollow
    myPosts: Ipost[]
}

export interface Ifollow {
    followers?: Iuser[]
    following?: Iuser[]
}

export type thunkDis = ThunkDispatch<Istate, null, AnyAction>