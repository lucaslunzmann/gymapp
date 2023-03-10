import Login from "./Login"
import Logged from "./Logged"
import Link from "next/link"
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../../pages/api/auth/[...nextauth]'

export default async function Nav() {
    const session = await getServerSession(authOptions)
    return (
        <nav className="flex justify-between items-center py-8">
            <Link href={'/'}>
                <span className="font-bold text-slate-900 text-3xl hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500"
                
                >Gym App </span>
            </Link>
            <ul className="flex items-center gap-6">
                {!session?.user && <Login />}  
                {session?.user && <Logged image={session.user?.image || ""}/>}
            </ul>
        </nav>
    )
}