export interface IPostResponse {
    id: string
    content: string
    authorId: string
    createdAt: string
    images: Image[]
    author: Author
    comments: Comment[]
    isMine: boolean
    reactionStats: ReactionStats
    myReactionType: string
    totalReactions: number
}

export interface Image {
    id: string
    url: string
    postId: string
    createdAt: string
}

export interface Author {
    id: string
    email: string
    name: string
}

export interface Comment {
    id: string
    content: string
    postId: string
    authorId: string
    parentId: any
    createdAt: string
    author: Author
    replies: Reply[]
}


export interface Reply {
    id: string
    content: string
    postId: string
    authorId: string
    parentId: string
    createdAt: string
    author: Author
}



export interface ReactionStats {
    LIKE: number
    LOVE: number
    HAHA: number
    WOW: number
    SAD: number
    ANGRY: number
}


export interface ICreatePostRequest {
    content: string
    images: string[]
}