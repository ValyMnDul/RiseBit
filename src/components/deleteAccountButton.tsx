
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
            className="text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
            Delete Account
            </button>
            
            <div 
            ref={warningRef} 
            className={`${open ? "fixed":"hidden"} fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center items-center flex-col z-50 p-4 w-[400px] h-[200px] bg-white border-4 border-red-600 rounded-2xl`}
            >
                <p 
                className="text-[22px] font-bold text-center mt-[7px]"
                >
                    Are you sure you want to delete your account?
                </p>

                <div
                className="flex justify-evenly items-center mt-4 text-center"
                >
                    <button
                    onClick={()=>{
                        warningRef.current?.classList.add("hidden");
                        warningRef.current?.classList.remove("flex");
                        setOpen(false);
                    }} 
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mt-4 "
                    >
                    CANCEL
                    </button>

                    <button
                    onClick={deleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 text-center"
                    >
                    DELETE
                    </button>
                </div>
            </div>
        </>
    )
}
