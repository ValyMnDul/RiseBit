
"use client";
import { signOut } from "next-auth/react";


export default function Navbar(){
    return(
        <nav className="px-[20px] flex justify-between items-center w-[100%] h-[70px] bg-white">
            <button onClick={()=>global.location.href="/profile"} className="flex items-center text-start text-black border-black border-2 p-[5px] rounded-[4px] font-mono cursor-pointer">Profile</button>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center text-start text-red-500 border-red border-2 p-[5px] rounded-[4px] font-mono cursor-pointer">Log Out</button>
        </nav>
    )
}