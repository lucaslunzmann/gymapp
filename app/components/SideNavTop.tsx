import Login from "../auth/Login" 
import Logged from "../auth/Logged" 
import Link from "next/link"
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../../pages/api/auth/[...nextauth]'

export default async function SideNavTop() {
  const session = await getServerSession(authOptions)
  return(
    <div className="fixed flex flex-col w-64 bg-white h-full border-r">
      <div className="flex items-center h-14 border-b mx-4 gap-2">
                    <ul className="flex gap-6">
                {!session?.user && <Login />}  
                {session?.user && <Logged image={session.user?.image || ""}/>}
                
            </ul>
            <p className="">{session?.user?.name}</p>
      </div>
  </div>
  )
}
