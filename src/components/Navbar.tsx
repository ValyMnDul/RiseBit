
"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Navbar(){

    const {data:session} = useSession();
    const router = useRouter();

    return(
        <nav 
        className="select-none px-5 flex justify-between items-center w-full h-[60px] bg-white"
        >

            <div 
            className="flex gap-x-5"
            >
                <button
                onClick={()=>{
                    router.push(`/profiles/${session?.user?.username}`);
                }} 
                className="px-4 py-2 rounded-xl font-semibold 
                            border border-indigo-400 text-indigo-500
                            hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                            hover:text-white hover:border-transparent
                            transition-all duration-300 cursor-pointer"
                >
                    Profile
                </button>

                <button 
                onClick={()=>{
                    router.push('/feed');
                }} 
                className="px-4 py-2 rounded-xl font-semibold 
                            border border-indigo-400 text-indigo-500
                            hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
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
                hover:bg-linear-to-r hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500 
                hover:text-white hover:border-transparent
                transition-all duration-300 cursor-pointer shadow-sm
                hover:shadow-rose-500/30 active:scale-95"
            >
            Log Out
            </button>

        </nav>
    )
}