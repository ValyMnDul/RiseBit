'use client'
import {useEffect ,useState} from "react"

import Post from "@/components/(feedComponents)/post"


export default function Feed(){

    /// Get Posts

    const [posts, setPosts] = useState<Array<{
        username:string,
        subtitle:string,
        content:string,
        updatedAt:string
    }>>([]);

    useEffect(() => {
        const getPosts = async () =>{

            const res=await fetch('/api/getPosts',{method:"GET"});
            
            const data=await res.json(); 
            setPosts(data);
        }
        getPosts();
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
            className="cursor-pointer select-none relative mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={()=>{
                window.location.href='/create';
            }}
            >
                Create Post
                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
            </button>

            {
                posts.length > 0 ? 
                    
                    posts.map((post, i) => {
                        return (
                            <Post
                            key={i}
                            username={post.username}
                            subtitle={post.subtitle}
                            content={post.content}
                            updatedAt={post.updatedAt} 
                            />
                        );
                    })

                : null
            }
    
        </main>
    )
}