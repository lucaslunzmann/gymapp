'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import Toggle from "../components/Toggle"
import axios from "axios"
import toast from "react-hot-toast"



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
                <Image className="rounded-full" width={32} height={32} src={avatar} alt="avatar" />
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-gray-700">{comments?.length} Comments</p>
                <button onClick={(e) => {
                    setToggle(true)
                }}
                className="text-sm font-bold text-red-500">Delete</button>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
    </>
    )
}