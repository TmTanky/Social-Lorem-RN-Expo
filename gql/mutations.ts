export const deletePostGql = `mutation deletePost($postID: ID!) {
    deletePost(postID: $postID)
}`

export const createPostGql = `mutation createPost($content: String!, $postBy: ID!) {
    createPost(content: $content, postBy: $postBy) {
        _id
        content
    }
}`

export const reactToPostGql = `mutation reactToPost($postID: ID!, $userID: ID!) {
    reactToPost(postID: $postID, userID: $userID)
}`

export const createCommentGql = `mutation createComment($postID: ID!, $content: String!, $userID: ID!) {
    createComment(postID: $postID, content: $content, userID: $userID)
}`

export const editPostGql = `mutation editPost($postID: ID!, $content: String!) {
    editPost(postID: $postID, content: $content) 
}`