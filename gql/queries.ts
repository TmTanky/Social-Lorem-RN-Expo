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