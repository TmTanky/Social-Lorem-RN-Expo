import axios from "axios"
import { useSelector } from "react-redux"
import { createPostGql, deletePostGql } from "../../gql/mutations"

// GQL
import { getAllPostsGql, getFollowGql, getUsernameGql, getUsersPostsGql } from "../../gql/queries"

// Helpers
import { PROD_URL } from "../../helpers/url"

// Types
import { Istate, Iuser, thunkDis } from "../../types"

// Action Types
import { AUTH, CREATE_POST, DELETE_POST, LOAD_ALL_POSTS, LOAD_MY_FOLLOW, LOAD_MY_NAMES, LOAD_MY_POSTS, LOGIN_USER, UN_AUTH } from "../actionTypes/types"

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

export const loadAllPosts = (token: string) => {

    return async (dispatch: thunkDis) => {

        const {data} = await axios.post(PROD_URL, {
            query: getAllPostsGql
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        dispatch({
            type: LOAD_ALL_POSTS,
            payload: data.data.getAllPosts
        })

    }

}

export const getUsername = (token: string, userID: string) => {

    return async (dispatch: thunkDis) => {

        const {data} = await axios.post(PROD_URL, {
            query: getUsernameGql,
            variables: {
                userID
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        dispatch({
            type: LOAD_MY_NAMES,
            payload: data.data.getUsername
        })

    }

}

export const getFollow = (token: string, userID: string) => {

    return async (dispatch: thunkDis) => {

        const {data} = await axios.post(PROD_URL, {
            query: getFollowGql,
            variables: {
                userID
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        dispatch({
            type: LOAD_MY_FOLLOW,
            payload: data.data.getFollow
        })

    }

}

export const getUsersPosts = (token: string, userID: string) => {

    return async (dispatch: thunkDis) => {

        const {data} = await axios.post(PROD_URL, {
            query: getUsersPostsGql,
            variables: {
                userID
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        console.log(data)

        dispatch({
            type: LOAD_MY_POSTS,
            payload: data.data.getUsersPosts
        })

    }

}

export const deletePost = (token: string, postID: string, userID: string) => {

    return async (dispatch: thunkDis) => {

        await axios.post(PROD_URL, {
            query: deletePostGql,
            variables: {
                postID
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        dispatch({
            type: DELETE_POST
        })
        dispatch(getUsersPosts(token, userID))

    }

}

export const createPost = (token: string, postBy: string, content: string) => {

    // return async (dispatch: thunkDis) => {

    //     await axios.post(PROD_URL, {
    //         query: createPostGql,
    //         variables: {
    //             postBy,
    //             content
    //         }
    //     }, {
    //         headers: {
    //             'authorization': `Bearer ${token}`
    //         }
    //     })

    //     return () => {
    //         dispatch(getUsersPosts(token, postBy))
    //         dispatch(loadAllPosts(token))
    //     }

    //     try {

    //         await axios.post(PROD_URL, {
    //             query: createPostGql,
    //             variables: {
    //                 postBy,
    //                 content
    //             }
    //         }, {
    //             headers: {
    //                 'authorization': `Bearer ${token}`
    //             }
    //         })

    //         dispatch(getUsersPosts(token, postBy))
    //         dispatch(loadAllPosts(token))
    //         return 'Done'
            
    //     } catch (error) {
    //         return 'Failed'
    //     }

    // }

    return async (dispatch: thunkDis) => {

        return new Promise((resolve, reject) => {

            axios.post(PROD_URL, {
                query: createPostGql,
                variables: {
                    postBy,
                    content
                }
            }, {
             headers: {
                 'authorization': `Bearer ${token}`
                }
            }).then(data => {
                dispatch(getUsersPosts(token, postBy))
                dispatch(loadAllPosts(token))
                return 'Done'
            }).catch(err => {
                return 'Failed'
            })

        })

    }


}