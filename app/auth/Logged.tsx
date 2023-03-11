'use client'

import Image from "next/image"
import {signOut} from 'next-auth/react'
import Link from "next/link"

type User = {
    image: string
}

export default function Logged({image}: User){
    return(
        <li className="">
            <Link href={'/dashboard'}>
                <Image 
                className="rounded-full drop-shadow-lg hover:scale-110 transition duration-500 ease-in-out"
                width={40} height={40} src={image} alt='' priority />
            </Link>
        </li>
    )
}