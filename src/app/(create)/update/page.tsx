'use client'

import {ImageIcon} from 'lucide-react'
import React from 'react'

export default function UpdatePost(){

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
            ></input>

            <textarea
            name="content"
            placeholder="Content"
            className="mt-4 text-base sm:text-lg md:text-xl px-4 py-2 border 
            border-gray-400 rounded w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 
            h-[200px] sm:h-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500 
            resize-none"
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

        </form>
    )
}