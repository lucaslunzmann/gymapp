'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import Toggle from "../components/Toggle"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"



type EditProps = {
    id: string
    avatar: string
    name: string
    title: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

export default function EditPost({avatar, name, title, comments, id}: EditProps) {
    const [toggle, setToggle] = useState(false)
    const queryClient = useQueryClient()


    //Delete posts
    const {mutate} = useMutation(
        async (id: string) =>
        await axios.delete('/api/posts/deletePosts', { data: id }),
        {
            onError: (error) => {
                console.log(error)
                toast.error("Error in deleting that post")
            },
            onSuccess: (data) => {
                console.log(data)
                toast.success("Post has been deleted.")
                queryClient.invalidateQueries(["auth-posts"])
            }
        }
    )

    const deletePost = () => {
        mutate(id)
    }

    return(
    <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image className="rounded-full drop-shadow-lg mr-1" width={32} height={32} src={avatar} alt="avatar" />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8 font-bold text-xl">
                <span className="break-all bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">{title}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className="text-md text-gray-700">Total Workouts: {comments?.length}</p>
            <div>
                <button className="text-sm bg-transparent text-slate-700 mx-4 border-slate-700 py-1 px-2 rounded-lg hover:underline disabled:opacity-50 font-bold">
                    <Link href={`/post/${id}`}>
                            <p>Add Workouts</p>
                    </Link>
                </button>
                <button onClick={(e) => {
                    setToggle(true)
                }}
                className="text-sm font-bold text-red-500 hover:underline">Delete</button>
            </div>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
    </>
    )
}