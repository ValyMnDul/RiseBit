'use client'

import {ImageIcon} from 'lucide-react'
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function UpdatePost(){

    const searchParams = useSearchParams();

    const usernameFromSearchParams = searchParams.get("username");
    const updatedAtFromSearchParams = searchParams.get("updatedAt");

    const messageRef = useRef<HTMLParagraphElement>(null);
    const [post,setPost] = useState<{
        id:number,
        content:string,
        createdAt:string,
        photos:Array<string>,
        subtitle:string,
        updatedAt:string,
        username:string
    }>();

    useEffect(()=>{
        const fetchPost = async () => {
            const res = await fetch('/api/getPostToEdit',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    usernameFromSearchParams,
                    updatedAtFromSearchParams
                })
            });

            const {postToEdit} = await res.json();
            setPost(postToEdit);
        }
        
        if(usernameFromSearchParams && updatedAtFromSearchParams){
            fetchPost();
        }
        
    },[usernameFromSearchParams,updatedAtFromSearchParams])

    const onFileChenge = (e:React.ChangeEvent<HTMLInputElement>) => {
        
    }

    const updatePost = () => {

    }

    return (
        <form
        className="w-full h-full flex flex-col items-center justify-center 
        px-4 sm:px-6"
        onSubmit={updatePost}
        >
            <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r 
            from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent 
            drop-shadow-md select-none lg:mt-18 mt-10"
            >
            Update Post
            </h1>

            <input
            name="subtitle"
            type="text"
            placeholder="Title"
            className="mt-6 text-base sm:text-lg md:text-xl px-4 py-2 border 
            border-gray-400 rounded w-full sm:w-[80%] md:w-[70%] lg:w-[60%] 
            xl:w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={post?.subtitle || ''}
            ></input>

            <textarea
            name="content"
            placeholder="Content"
            className="mt-4 text-base sm:text-lg md:text-xl px-4 py-2 border 
            border-gray-400 rounded w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 
            h-[200px] sm:h-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500 
            resize-none"
            defaultValue={post?.content}
            ></textarea>

            <div
            className="mt-6 text-base sm:text-lg md:text-xl px-4 py-2 border 
            border-gray-400 rounded w-full sm:w-[80%] md:w-[70%] lg:w-[60%] 
            xl:w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

                <div
                className='hover:bg-gray-300 h-full w-8 flex flex-1 justify-center
                items-center rounded-full'
                >

                    <label
                    className='cursor-pointer '
                    htmlFor="photos"
                    >
                        <ImageIcon width={25} height={25}/>
                    </label>

                    <input
                    onChange={(e)=>{
                        onFileChenge(e);
                    }}
                    type="file"
                    id='photos'
                    name="photos"
                    className='hidden'
                    multiple
                    accept="image/*"
                    ></input>

                </div>

            </div>

            <button
            type="submit"
            className="cursor-pointer select-none relative mt-4 mb-8 sm:mb-12 px-6 
            py-2.5 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 
            to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/30 
            hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 
            active:scale-95"
            >
                Create
            </button>
            
            <p
            ref={messageRef}
            className="mt-3 text-base sm:text-lg md:text-xl text-center font-medium tracking-wide 
                        bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 
                        bg-clip-text text-transparent transition-all duration-300
                        animate-[pulse_3s_ease-in-out_infinite] px-4"
            >
                Tell me something new!
            </p>

        </form>
    )
}