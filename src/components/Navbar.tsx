
"use client";
import { signOut } from "next-auth/react";


export default function Navbar(){
    return(
        <nav className="px-[20px] flex justify-between items-center w-[100%] h-[70px] bg-white">
            <div className="flex gap-x-[20px]">
                <button onClick={()=>global.location.href="/profile"} className="bg-white hover:bg-gray-200 transition-colors ease-in-out duration-300 flex items-center text-start text-black border-black border-2 p-[5px] rounded-[4px] font-mono cursor-pointer">Profile</button>
                <button onClick={()=>global.location.href="/feed"} className="bg-white hover:bg-gray-200 transition-colors ease-in-out duration-300 flex items-center text-start text-black border-black border-2 p-[5px] rounded-[4px] font-mono cursor-pointer">Feed</button>
            </div>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="flex bg-white hover:bg-red-100 transition-colors duration-300 ease-in-out items-center text-start text-red-500 border-red border-2 p-[5px] rounded-[4px] font-mono cursor-pointer">Log Out</button>
        </nav>
    )
}