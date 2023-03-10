'use client'
import { useState } from "react"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import axios, { AxiosError } from 'axios'
import toast from "react-hot-toast"
import Dropdown from "./Dropdown"

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()



    //Create post
    const {mutate} = useMutation(
        async (title: string) =>
        await axios.post('/api/posts/addPost', { title }),
    {
        onError: (error) => {
            if(error instanceof AxiosError) {
            toast.error(error?.response?.data.message)
        }
            setIsDisabled(false)
        },
        onSuccess: (data) => {
            toast.success("Workout has been created 🎉")
            queryClient.invalidateQueries(['posts'])
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
        <form onSubmit={submitPost} className="drop-shadow-lg bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">

                    <textarea
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        value={title}
                        placeholder= "Name of program..."
                        className="resize-y p-4 text-lg rounded-md my-2 bg-gray-200"
                    ></textarea>
                
            </div>
            <div className="flex justify-end space-x-2 drop-shadow">
                <button
                    disabled={isDisabled}
                    className="text-sm bg-slate-700 text-white py-2 px-6 rounded-lg disabled:opacity-50"
                    type="submit"
                >
                    Create Program 
                </button>
                <Dropdown />
            </div>
        </form>
    )
}