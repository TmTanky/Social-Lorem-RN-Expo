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
}