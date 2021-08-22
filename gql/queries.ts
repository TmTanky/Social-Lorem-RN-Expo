export const loginGql = `query loginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
        _id
        firstName
        lastName
        email
        token
        username
    }
}`

export const getAllPostsGql = `query getAllPosts {
    getAllPosts {
        _id
        content
        createdAt
        postBy {
            _id
            firstName
            lastName
            username
        }
        likes {
            _id
            firstName
            lastName
        }
        comments {
            _id
            content
            commentBy {
                _id
                firstName
                lastName
            }
        }
    }
}`

export const getUsernameGql = `query getUsername($userID: ID) {
    getUsername(userID: $userID) {
        firstName
        lastName
        username
    }
}`

export const getUsersPostsGql = `query getUsersPosts($userID: ID) {
    getUsersPosts(userID: $userID) {
        _id
        content
        createdAt
        postBy {
            _id
            firstName
            lastName
        }
        likes {
            _id
            firstName
            lastName
        }
        comments {
            _id
            content
            commentBy {
                _id
                firstName
                lastName
            }
        }
    }
}`

export const getFollowGql = `query getFollow($userID: ID) {
    getFollow(userID: $userID) {
        following {
            firstName
            lastName
        }
        followers {
            firstName
            lastName
        }
    }
}`

export const paginateGql = `query paginate($userID: ID, $limitCount: Int, $skipCount: Int) {
    paginate(userID: $userID, limitCount: $limitCount, skipCount: $skipCount) {
        _id
        content
        createdAt
        postBy {
            _id
            firstName
            lastName
        }
        likes {
            _id
            firstName
            lastName
        }
        comments {
            _id
            content
            commentBy {
                _id
                firstName
                lastName
            }
        }        
    }
}`

export const getUserByUsernameGql = `query getUserByUserName($username: String) {
    getUserByUsername(username: $username) {
        _id
        firstName
        lastName
        username
    }
}`

export const viewUserGql = `query viewUser($username: String) {
    viewUser(username: $username) {
        _id
        firstName
        lastName
        username
        following {
            _id
            firstName
            lastName
        }
        followers {
            _id
            firstName
            lastName
        }
    }
}`

export const viewUserPostsGql = `query viewUserPosts($username: String, $limitCount: Int) {
    viewUserPosts(username: $username, limitCount: $limitCount) {
        _id
        createdAt
        content
        postBy {
            firstName
            lastName
        }
        likes {
            _id
            firstName
            lastName
        }
        comments {
            _id
            content
            commentBy {
                _id
                firstName
                lastName
            }
        }
    }
}`

export const viewLikesGql = `query viewLikes($postID: ID) {
    viewLikes(postID: $postID) {
        likes {
            _id
            username
            firstName
            lastName
        }
    }
}`

export const viewCommentsGql = `query viewPostComments($postID: ID) {
    viewPostComments(postID: $postID) {
        _id
        content
        commentBy {
            firstName
            lastName
            username
        }
    }
}` 