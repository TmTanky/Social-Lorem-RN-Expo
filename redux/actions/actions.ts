import axios from "axios"
import { changePasswordGql, changeUsernameGql, createCommentGql, createPostGql, deletePostGql, editPostGql, reactToPostGql } from "../../gql/mutations"

// GQL
import { getAllPostsGql, getFollowGql, getUsernameGql, getUsersPostsGql, paginateGql } from "../../gql/queries"

// Helpers
import { PROD_URL } from "../../helpers/url"

// Types
import { Iuser, thunkDis } from "../../types"
// export type Stack = 'myprofilestack' | 'homestack' | 'viewprofile'
enum Stack {
    myprofilestack = 'myprofilestack',
    homestack = 'homestack',
    viewprofile = 'viewprofile',    
}

// Action Types
import { AUTH, DARK, DELETE_POST, LIGHT, LOAD_ALL_POSTS, LOAD_MY_FOLLOW, LOAD_MY_NAMES, LOAD_MY_POSTS, LOGIN_USER, LOGOUT_USER, UN_AUTH } from "../actionTypes/types"

export const loginUser = (data: Iuser) => {

    return {
        type: LOGIN_USER,
        payload: data
    }

}

export const logoutUser = () => {

    return {
        type: LOGOUT_USER
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

export const toggleLight = () => {
    
    return {
        type: LIGHT
    }

}

export const toggleDark = () => {
    
    return {
        type: DARK
    }

}

export const logoutAll = () => {

    return async (dispatch: thunkDis) => {

        dispatch(logoutUser())
        dispatch(unAuthUser())

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

        dispatch({
            type: LOAD_MY_POSTS,
            payload: data.data.getUsersPosts
        })

    }

}

export const deletePost = (token: string, postID: string, userID: string) => {

    return async (dispatch: thunkDis) => {

        return new Promise((resolve, reject) => {

            axios.post(PROD_URL, {
                query: deletePostGql,
                variables: {
                    postID
                }
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then(data => {
                dispatch({ type: DELETE_POST })
                dispatch(getUsersPosts(token, userID))
                return resolve('Successfully Deleted')
            }).catch(err => {
                return reject('Failed')
            })

        })

    }

}

export const createPost = (token: string, postBy: string, content: string) => {

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
                return resolve('Done')
            }).catch(err => {
                return reject('Failed')
            })

        })

    }

}

export const paginate = (token: string, userID: string, limitCount: number, skipCount: number) => {

    return async (dispatch: thunkDis) => {

        return new Promise (async(resolve, reject): Promise<any> => {

            await axios.post(PROD_URL, {
                query: paginateGql,
                variables: {
                    userID,
                    limitCount,
                    skipCount
                }
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then(res => {
                dispatch({
                    type: LOAD_MY_POSTS,
                    payload: res.data.data.paginate
                })
                resolve(true)
            }).catch(err => {
                reject()
            })

        })

    }

}

export const reactToPost = (postID: string, userID: string, token: string, stack: string) => {

    return async (dispatch: thunkDis) => {

        await axios.post(PROD_URL, {
            query: reactToPostGql,
            variables: {
                postID,
                userID
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        stack === Stack.homestack || Stack.myprofilestack ? dispatch(getUsersPosts(token, userID)) : null
        stack === Stack.homestack || Stack.myprofilestack ? dispatch(loadAllPosts(token)) : null

    }

}

export const createComment = (postID: string, content: string, userID: string, token: string, stack: string) => {

    return async (dispatch: thunkDis) => {

        await axios.post(PROD_URL, {
            query: createCommentGql,
            variables: {
                postID,
                content,
                userID
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

        stack === Stack.homestack || Stack.myprofilestack ? dispatch(getUsersPosts(token, userID)) : null
        stack === Stack.homestack || Stack.myprofilestack ? dispatch(loadAllPosts(token)) : null
        

    }

}

export const editPost = (postID: string, content: string, token: string, userID: string) => {
    
    return async (dispatch: thunkDis) => {

        return new Promise((resolve, reject) => {

            axios.post(PROD_URL, {
                query: editPostGql,
                variables: {
                    postID,
                    content
                }
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then(res => {
                dispatch(getUsersPosts(token, userID))
                return resolve('Done')
            }).catch(err => {
                return reject('Failed')
            }) 

        })

    }

}

export const changeUsername = (userID: string, username: string, token: string) => {

    return async (dispatch: thunkDis) => {

        return new Promise((resolve, reject) => {

            axios.post(PROD_URL, {
                query: changeUsernameGql,
                variables: {
                    userID,
                    newUsername: username
                }
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }).then(res => {
                dispatch(getUsername(token, userID))
                return resolve('Username Changed Successfully')
            }).catch(err => {
                return reject('Failed')
            })

        })

    }

}

export const changePassword = (userID: string, newPass: string, token: string) => {

    return async (dispatch: thunkDis) => {

        await axios.post(PROD_URL, {
            query: changePasswordGql,
            variables: {
                userID,
                newPass
            }
        }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })

    }

}