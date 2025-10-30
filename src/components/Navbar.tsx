
"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Navbar(){

    const router = useRouter();
    const { data: session } = useSession();

    return(
        <nav 
        className="select-none px-5 flex justify-between items-center w-full h-[60px] bg-white"
        >

            <div 
            className="flex gap-x-5"
            >
                <button
                onClick={()=>{
                    router.push(`/`);
                }} 
                className="px-4 py-2 rounded-xl font-semibold 
                            border border-indigo-400 text-indigo-500
                            hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                            hover:text-white hover:border-transparent
                            transition-all duration-300 cursor-pointer"
                >
                    Home
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

                <button 
                onClick={()=>{
                    router.push('/profiles');
                }} 
                className="px-4 py-2 rounded-xl font-semibold 
                            border border-indigo-400 text-indigo-500
                            hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                            hover:text-white hover:border-transparent
                            transition-all duration-300 cursor-pointer"
                >
                    Users
                </button>

            </div>

            {session?.user !== null && session?.user !== undefined ? 
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
                </div>
            : 
                <div
                className="flex gap-x-5"
                >
                    <button
                    onClick={()=>{
                        router.push('/register');
                    }} 
                    className="px-4 py-2 rounded-xl font-semibold 
                                border border-indigo-400 text-indigo-500
                                hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                                hover:text-white hover:border-transparent
                                transition-all duration-300 cursor-pointer"
                    >
                        Resister
                    </button>

                    <button 
                    onClick={() => {
                        router.push('/login');
                    }}
                    className="px-4 py-2 rounded-xl font-semibold 
                        border border-rose-400 text-rose-500
                        hover:bg-linear-to-r hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500 
                        hover:text-white hover:border-transparent
                        transition-all duration-300 cursor-pointer shadow-sm
                        hover:shadow-rose-500/30 active:scale-95"
                    >
                        Login
                    </button>
                </div>
            }

        </nav>
    )
}