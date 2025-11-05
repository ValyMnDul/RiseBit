"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar(){
    const router = useRouter();
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const MenuIcon = () => <span className="text-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">☰</span>;
    const CloseIcon = () => <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-xl">✕</span>;

    return(
        <nav 
        className="select-none px-5 flex justify-between items-center w-full h-[60px] bg-white shadow-sm"
        >
            <div 
            className="flex items-center"
            >
                <span 
                className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-xl md:hidden"
                >
                    RiseBit
                </span>

            </div>

            <div 
            className="hidden md:flex gap-x-5 flex-1 justify-between"
            >
                <div 
                className="flex gap-x-5"
                >
                    <button
                        onClick={()=>{ router.push(`/`); }} 
                        className="px-4 py-2 rounded-xl font-semibold text-center
                                    border border-indigo-400 text-indigo-500
                                    hover:bg-linear-to-r hover:from-indigo-500 
                                    hover:via-purple-500 hover:to-pink-500 
                                    hover:text-white hover:border-transparent
                                    transition-all duration-300 cursor-pointer"
                    >
                        Home
                    </button>

                    <button 
                        onClick={()=>{ router.push('/feed'); }} 
                        className="px-4 py-2 rounded-xl font-semibold 
                                    border border-indigo-400 text-indigo-500
                                    hover:bg-linear-to-r hover:from-indigo-500 
                                    hover:via-purple-500 hover:to-pink-500 
                                    hover:text-white hover:border-transparent
                                    transition-all duration-300 cursor-pointer"
                    >
                        Feed
                    </button>

                    <button 
                        onClick={()=>{ router.push('/profiles'); }} 
                        className="px-4 py-2 rounded-xl font-semibold 
                                    border border-indigo-400 text-indigo-500
                                    hover:bg-linear-to-r hover:from-indigo-500 
                                    hover:via-purple-500 hover:to-pink-500 
                                    hover:text-white hover:border-transparent
                                    transition-all duration-300 cursor-pointer"
                    >
                        Users
                    </button>

                </div>

                {session?.user ? 
                    <div className="flex gap-x-5">
                        <button
                            onClick={()=>{ router.push(`/profiles/${session?.user?.username}`); }} 
                            className="px-4 py-2 rounded-xl font-semibold 
                                        border border-indigo-400 text-indigo-500
                                        hover:bg-linear-to-r hover:from-indigo-500 
                                        hover:via-purple-500 hover:to-pink-500 
                                        hover:text-white hover:border-transparent
                                        transition-all duration-300 cursor-pointer"
                        >
                            Profile
                        </button>

                        <button 
                            onClick={() => { signOut({ callbackUrl: "/" }); }}
                            className="px-4 py-2 rounded-xl font-semibold 
                                border border-rose-400 text-rose-500
                                hover:bg-linear-to-r hover:from-rose-500 
                                hover:via-pink-500 hover:to-fuchsia-500 
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
                            onClick={()=>{ router.push('/register'); }} 
                            className="px-4 py-2 rounded-xl font-semibold 
                                        border border-indigo-400 text-indigo-500
                                        hover:bg-linear-to-r hover:from-indigo-500 
                                        hover:via-purple-500 hover:to-pink-500 
                                        hover:text-white hover:border-transparent
                                        transition-all duration-300 cursor-pointer"
                        >
                            Register
                        </button>

                        <button 
                            onClick={() => { router.push('/login'); }}
                            className="px-4 py-2 rounded-xl font-semibold 
                                border border-rose-400 text-rose-500
                                hover:bg-linear-to-r hover:from-rose-500 
                                hover:via-pink-500 hover:to-fuchsia-500 
                                hover:text-white hover:border-transparent
                                transition-all duration-300 cursor-pointer shadow-sm
                                hover:shadow-rose-500/30 active:scale-95"
                        >
                            Login
                        </button>

                    </div>
                }
            </div>

            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {isMenuOpen && (
                <div 
                className="absolute top-[60px] left-0 right-0 bg-white shadow-lg md:hidden z-50"
                >
                    <div 
                    className="flex flex-col p-4 space-y-3"
                    >
                        <button
                            onClick={()=>{ 
                                router.push(`/`); 
                                setIsMenuOpen(false);
                            }} 
                            className="px-4 py-3 rounded-xl font-semibold text-left
                                        border border-indigo-400 text-indigo-500
                                        hover:bg-linear-to-r hover:from-indigo-500 
                                        hover:via-purple-500 hover:to-pink-500 
                                        hover:text-white hover:border-transparent
                                        transition-all duration-300"
                        >
                            Home
                        </button>

                        <button 
                            onClick={()=>{ 
                                router.push('/feed'); 
                                setIsMenuOpen(false);
                            }} 
                            className="px-4 py-3 rounded-xl font-semibold text-left
                                        border border-indigo-400 text-indigo-500
                                        hover:bg-linear-to-r hover:from-indigo-500 
                                        hover:via-purple-500 hover:to-pink-500 
                                        hover:text-white hover:border-transparent
                                        transition-all duration-300"
                        >
                            Feed
                        </button>

                        <button 
                            onClick={()=>{ 
                                router.push('/profiles'); 
                                setIsMenuOpen(false);
                            }} 
                            className="px-4 py-3 rounded-xl font-semibold text-left
                                        border border-indigo-400 text-indigo-500
                                        hover:bg-linear-to-r hover:from-indigo-500 
                                        hover:via-purple-500 hover:to-pink-500 
                                        hover:text-white hover:border-transparent
                                        transition-all duration-300"
                        >
                            Users

                        </button>

                        <div className="border-t border-gray-200 my-2"></div>

                        {session?.user ? (
                            <>
                                <button
                                    onClick={()=>{ 
                                        router.push(`/profiles/${session?.user?.username}`); 
                                        setIsMenuOpen(false);
                                    }} 
                                    className="px-4 py-3 rounded-xl font-semibold text-left
                                                border border-indigo-400 text-indigo-500
                                                hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                                                hover:text-white hover:border-transparent
                                                transition-all duration-300"
                                >
                                    Profile
                                </button>

                                <button 
                                    onClick={() => { 
                                        signOut({ callbackUrl: "/" }); 
                                        setIsMenuOpen(false);
                                    }}
                                    className="px-4 py-3 rounded-xl font-semibold text-left
                                        border border-rose-400 text-rose-500
                                        hover:bg-linear-to-r hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500 
                                        hover:text-white hover:border-transparent
                                        transition-all duration-300"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={()=>{ 
                                        router.push('/register'); 
                                        setIsMenuOpen(false);
                                    }} 
                                    className="px-4 py-3 rounded-xl font-semibold text-left
                                                border border-indigo-400 text-indigo-500
                                                hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                                                hover:text-white hover:border-transparent
                                                transition-all duration-300"
                                >
                                    Register
                                </button>

                                <button 
                                    onClick={() => { 
                                        router.push('/login'); 
                                        setIsMenuOpen(false);
                                    }}
                                    className="px-4 py-3 rounded-xl font-semibold text-left
                                        border border-rose-400 text-rose-500
                                        hover:bg-linear-to-r hover:from-rose-500 hover:via-pink-500 hover:to-fuchsia-500 
                                        hover:text-white hover:border-transparent
                                        transition-all duration-300"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>

                </div>
            )}
        </nav>
    )
}