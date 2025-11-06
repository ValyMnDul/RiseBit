'use client'
import { useRef,useState,useEffect } from "react";
import { signOut } from "next-auth/react";

export default function DeleteAccountButton({email}:{email:string}) {

    const warningRef=useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const deleteAccount = async ()=>{
            await fetch('/api/delete_account',{
            method:"DELETE",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({email})
        })

        signOut({ callbackUrl: "/" });
    }


    function handleClickOutside(event: MouseEvent) {
        if (warningRef.current && !warningRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <>
            <button 
            onClick={()=>{
                warningRef.current?.classList.remove("hidden");
                warningRef.current?.classList.add("flex");
                setOpen(true);
            }} 
            className="px-3 sm:px-4 py-2 rounded-xl font-semibold text-sm sm:text-base
                border border-rose-400 text-rose-500
                hover:bg-linear-to-r hover:from-rose-500 hover:via-pink-500 
                hover:to-fuchsia-500 
                hover:text-white hover:border-transparent
                transition-all duration-300 cursor-pointer shadow-sm
                hover:shadow-rose-500/30 active:scale-95"
            >
            Delete Account
            </button>
            
            <div 
            ref={warningRef} 
            className={`${open ? "fixed":"hidden"} fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center items-center flex-col z-50 p-4 sm:p-6 w-[90%] sm:w-[400px] max-w-[400px] min-h-[180px] sm:h-[200px] bg-white border-4 border-red-600 rounded-2xl`}
            >
                <p 
                className="text-base sm:text-lg md:text-xl font-bold text-center"
                >
                    Are you sure you want to delete your account?
                </p>

                <div
                className="flex flex-col sm:flex-row justify-center sm:justify-evenly 
                items-center gap-3 sm:gap-4 mt-6 sm:mt-7 w-full"
                >
                    <button
                    onClick={()=>{
                        warningRef.current?.classList.add("hidden");
                        warningRef.current?.classList.remove("flex");
                        setOpen(false);
                    }} 
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold 
                    text-sm sm:text-base
                                border border-indigo-400 text-indigo-500 
                                hover:bg-linear-to-r hover:from-indigo-500 
                                hover:via-purple-500 hover:to-pink-500 
                                hover:text-white hover:border-transparent 
                                transition-all duration-300 cursor-pointer"
                    >
                    CANCEL
                    </button>

                    <button
                    onClick={deleteAccount}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold 
                    text-sm sm:text-base
                                border border-rose-400 text-rose-500
                                hover:bg-linear-to-r hover:from-rose-500 
                                hover:via-pink-500 hover:to-fuchsia-500 
                                hover:text-white hover:border-transparent
                                transition-all duration-300 cursor-pointer shadow-sm
                                hover:shadow-rose-500/30 active:scale-95"
                            >
                    DELETE
                    </button>
                </div>
            </div>
        </>
    )
}