export type PostType = {
    title: string
    id: string
    createAt: string
    user: {
        name: string
        image: string
    }
    comments?: {
        createdAt: string
        id: string
        postedId: string
        userId: string
    }[]
}
