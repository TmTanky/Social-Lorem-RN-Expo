export const deletePostGql = `mutation deletePost($postID: ID!) {
    deletePost(postID: $postID)
}`

export const createPostGql = `mutation createPost($content: String!, $postBy: ID!) {
    createPost(content: $content, postBy: $postBy) {
        _id
        content
    }
}`