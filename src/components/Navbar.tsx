
"use client";
import { signOut } from "next-auth/react";


export default function Navbar(){
    return(
        <nav 
        className="select-none px-[20px] flex justify-between items-center w-[100%] h-[60px] bg-white"
        >

            <div 
            className="flex gap-x-[20px]"
            >
                <button
                onClick={()=>{
                    global.location.href="/profile";
                }} 
                className="px-4 py-2 rounded-xl font-semibold 
                            border border-indigo-400 text-indigo-500
                            hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                            hover:text-white hover:border-transparent
                            transition-all duration-300 cursor-pointer"
                >
                    Profile
                </button>

                <button 
                onClick={()=>{
                    global.location.href="/feed";
                }} 
                className="px-4 py-2 rounded-xl font-semibold 
                            border border-indigo-400 text-indigo-500
                            hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                            hover:text-white hover:border-transparent
                            transition-all duration-300 cursor-pointer"
                >
                    Feed
                </button>

            </div>

            <button 
            onClick={() => {
                signOut({ callbackUrl: "/" });
            }}
            className="px-4 py-2 rounded-xl font-semibold 
                border border-rose-400 text-rose-500
                hover:bg-gradient-to-r hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500 
                hover:text-white hover:border-transparent
                transition-all duration-300 cursor-pointer shadow-sm
                hover:shadow-rose-500/30 active:scale-95"
            >
            Log Out
            </button>

        </nav>
    )
}