'use client'

import React from "react";
import { useSession } from "next-auth/react";
import { useRef,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage(){

    const messageRef = useRef<HTMLParagraphElement>(null);

    const {data:session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(!session){
            router.push('/login');
        }
    },[session,router]);

    const createPost = async (e:React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        if(!session?.user?.username){
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        const subtitle = formData.get('subtitle') as string;
        const content = formData.get('content') as string;


        const res = await fetch('/api/createPost',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                subtitle:subtitle,
                content:content,
                username:session?.user?.username
            })
        });

        const {message} = await res.json();

        if(res.status === 201){

            if(messageRef.current){
                messageRef.current.textContent = message;
            }

            form.reset();

            globalThis.setTimeout(()=>{
                globalThis.location.href = '/feed';
            },1500)
        }
        else {

            if(messageRef.current){
                messageRef.current.textContent = message;
            }
        }
    }

    return(
        <form 
        className="h-full w-full flex flex-col items-center justify-center flex-1"
        onSubmit={createPost}
        >
            <h1
            className="text-5xl font-extrabold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md select-none mt-6"
            >
            Create Post
            </h1>

            <input
            name="subtitle"
            type="text"
            placeholder="Title"
            className="mt-6 text-xl px-4 py-2 border border-gray-400 rounded w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></input>

            <textarea
            name="content"
            placeholder="Content"
            className="mt-4 text-xl px-4 py-2 border border-gray-400 rounded w-[50%] h-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>

            <button
            type="submit"
            className="cursor-pointer select-none relative mt-4 mb-[50px] px-6 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
                Create
            </button>
            
            <p
            ref={messageRef}
            className="mt-3 text-2xl text-center  font-medium tracking-wide 
                        bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 
                        bg-clip-text text-transparent transition-all duration-300
                        animate-[pulse_3s_ease-in-out_infinite]"
            >
                Tell me something new!
            </p>

        </form>
    );
}