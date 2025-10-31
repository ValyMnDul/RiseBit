'use client'

import React from "react";
import {useRouter} from "next/navigation";

export default function FollowButton({ sessionUsername ,postUsername}:{
    sessionUsername:string,
    postUsername:string
}) {

    const router = useRouter();

    const followButtonHandler = (e:React.MouseEvent) => {

        e.stopPropagation();

        
    }

    if(sessionUsername === postUsername){
        return (
        <button
        onClick={()=>{
            router.push(`/profiles/${sessionUsername}`);
        }}
        className="px-4 py-1.5 rounded-lg font-semibold text-transparent bg-clip-text 
                    bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                    border border-indigo-300 hover:border-pink-400 
                    transition-all duration-300 hover:scale-105 active:scale-95"
        >
            View Profile
        </button>
    )
    }

    return (
        <button
        onClick={(e)=>{followButtonHandler(e)}}
        className="px-4 py-1.5 rounded-lg font-semibold text-transparent bg-clip-text 
                    bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                    border border-indigo-300 hover:border-pink-400 
                    transition-all duration-300 hover:scale-105 active:scale-95"
        >
            Follow
        </button>
    )
}