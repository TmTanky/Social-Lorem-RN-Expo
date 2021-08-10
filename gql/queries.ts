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