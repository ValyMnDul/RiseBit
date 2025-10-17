'use client'
import { redirect } from "next/navigation"


export default function EditProfileButton() {
    return(
        <button 
        className="h-[41px] border-2 hover:bg-gray-300 text-blue-600 border-blue-600 font-bold text-center px-4 rounded"
        onClick={()=>{
            redirect('/profile/edit');
        }}
        >
        Edit Profile
        </button>
    )
}