'use client'
import {useEffect } from "react"


export default function Feed(){

    useEffect(() => {
        const getPosts = async () =>{
            const res=await fetch('/api/getPosts',{method:"GET"})
            
            const data=await res.json()
                        
        }
        getPosts()
    }, [])

    return (
        <main 
        className="w-[100%] h-[100%] flex flex-col items-center"
        >

            <input
            type="text"
            placeholder="Search for posts..."
            className="mt-6 px-4 py-2 border border-gray-400 rounded w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
            >
                Create Post
            </button>


            <h1 
            className="text-7xl mt-[100px] "
            >
                No posts for now!
            </h1>
            
        </main>
    )
}