'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { use, useState } from "react"
import axios from "axios"
import toast from 'react-hot-toast'
import { AxiosError } from "axios"

type PostProps = {
    id?: string
}

type Comment = {
    postId?: string
    title: string
}

export default function AddComment({ id }: PostProps) {
        const [title, setTitle] = useState('')
        const [isDisabled, setIsDisabled] = useState(false)
        const queryClient = useQueryClient()

        const{mutate} = useMutation(
            async (data: Comment) => axios.post('/api/posts/addComment', {data}),
            {
                onSuccess: (data) => {
                    setTitle("")
                    setIsDisabled(false)
                    queryClient.invalidateQueries(['detail-post'])
                    toast.success("Added your comment")
                },
                onError: (error) => {
                    setIsDisabled(false)
                    if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message)}
                }
            }
        )

        const submitComment = async (e: React.FormEvent) => {
            e.preventDefault()
            setIsDisabled(true)
            mutate({title, postId: id })
        }

    return(
        <form onSubmit={submitComment} className="my-8">
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type='text'
                    name='title'
                    className="p-4 text-lg rounded-md my-2"
                />
            </div>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                    type='submit'
                >
                    Add a comment 💬
                </button>
        </form>
    )
}