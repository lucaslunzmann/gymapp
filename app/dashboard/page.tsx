import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"


export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if(!session) {
        redirect('/api/auth/signin')
    }
    return(
        <main>
            <h1 className="text-2xl font-bold">Welcome back {session?.user?.name}!</h1>
            <h2 className="my-2">This is your personal dashboard where all of your programs and workouts will be saved.</h2>
            <MyPosts />
        </main>
    )
}