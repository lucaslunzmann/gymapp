'use client'

import Image from "next/image"
import Link from "next/link"

type PostProps = {
    id: string
    avatar: string
    name: string
    postTitle: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function Post({avatar, name, postTitle, id, comments}: PostProps) {
    return(
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image 
                className="rounded-full drop-shadow-lg mr-1"
                width={32} height={32} src={avatar} alt='avatar' />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8 font-bold text-xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">{postTitle}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="gap-4">
                    <p className="text-md text-gray-700">Total Workouts: {comments?.length}</p>
                </div>
                <button className="text-sm bg-transparent text-slate-700 border-2 transition-colors duration-200 border-slate-700 py-2 px-6 rounded-lg disabled:opacity-50 hover:border-orange-500 font-bold">
                    <Link href={`/post/${id}`}>
                            <p>Add Workouts</p>
                    </Link>
                </button>
            </div>
        </div>
    )
}