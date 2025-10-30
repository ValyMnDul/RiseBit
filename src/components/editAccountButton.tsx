'use client'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditProfileButton() {

    const router = useRouter();
    const {data:session} = useSession();

    return(
        <button 
        className="px-4 py-2 rounded-xl font-semibold 
                    border border-indigo-400 text-indigo-500
                    hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
                    hover:text-white hover:border-transparent
                    transition-all duration-300 cursor-pointer"
        onClick={()=>{
            router.push(`/${session?.user.username}/edit`);
        }}
        >
        Edit Profile
        </button>
    )
}