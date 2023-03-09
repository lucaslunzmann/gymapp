'use client'
import { useState } from "react"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import axios from 'axios'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)


    //Create post
    const {mutate} = useMutation(
        async (title: string) => await axios.post('/api/posts/addPost', { title }),
    {
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
            setTitle("")
            setIsDisabled(false)
        },
    }
    )

        const submitPost = async (e: React.FormEvent) => {
            e.preventDefault()
            setIsDisabled(true)
            mutate(title)
        }

    return(
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea onChange={(e) => setTitle(e.target.value)} name="title" value={title} placeholder= "Build your program!"
                className="p-4 text-lg rounded-md my-2 bg-gray-200"
                ></textarea>
            </div>
            <div>
                <button
                    disabled={isDisabled}
                    className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-50"
                    type="submit"
                >
                    Create Workout
                </button>
            </div>
        </form>
    )
}