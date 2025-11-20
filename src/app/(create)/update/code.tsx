'use client'

import {ImageIcon} from 'lucide-react'
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import imageCompression from 'browser-image-compression'

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

    const [photos,setPhotos] = useState<Array<string>>([]);
    const [newPhotos,setNewPhotos] = useState<Array<File>>([]);
    const [newPreviewURLs,setNewPreviewURLs] = useState<Array<string>>([]);

    useEffect(()=>{
        return () => {
            newPreviewURLs.forEach((url)=>(URL.revokeObjectURL(url)));
        }
    },[newPreviewURLs]);

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
            setPhotos(postToEdit.photos)
        }
        
        if(usernameFromSearchParams && updatedAtFromSearchParams){
            fetchPost();
        }
        
    },[usernameFromSearchParams,updatedAtFromSearchParams]);

    const onFileChenge = async (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){

            const totalPhotos = photos.length + newPhotos.length;
            const availableSlots = 6 - totalPhotos;

            if (availableSlots <= 0) {
                if(messageRef.current){
                    messageRef.current.textContent = "Maximum 6 photos allowed!";
                }
                globalThis.setTimeout(() => {
                    if(messageRef.current){
                        messageRef.current.textContent = "Tell me something new!";
                    }
                }, 2000);
                return;
            }

            const selectedPhotos = Array.from(e.target.files).slice(0, availableSlots);

            const compressedPhotos = [];
            const urls = [];

            for(const photo of selectedPhotos){

                const options = {
                    maxSizeMB:2,
                    maxWidthOrHeight:1920,
                    useWebWorker:true,
                    initialQuality:0.95
                }

                try {
                    const compressedFile = await imageCompression(photo,options);

                    if(compressedFile.size > 8 * 1024 * 1024){

                        if(messageRef.current){
                            messageRef.current.textContent = "Some images were too large (max 30MB each).";
                        }

                        globalThis.setTimeout(()=>{
                            if(messageRef.current){
                                messageRef.current.textContent="Tell me something new!";
                            }
                        },2000);

                        continue;
                    }

                    compressedPhotos.push(compressedFile);
                    urls.push(URL.createObjectURL(compressedFile));
                }
                catch(e){
                    console.error("V:"+ e);
                }
            }

            setNewPhotos([...newPhotos, ...compressedPhotos]);
            setNewPreviewURLs([...newPreviewURLs, ...urls]);
        }

        e.target.value = '';
    }

    const removePhoto = (iToRemove:number, isNewPhoto:boolean) => {

        if(isNewPhoto){
            URL.revokeObjectURL(newPreviewURLs[iToRemove]);
            setNewPreviewURLs(newPreviewURLs.filter((_,i) => (i !== iToRemove)));
            setNewPhotos(newPhotos.filter((_,i) => (i !== iToRemove)));
        }
        else {
            setPhotos(photos.filter((_,i)=>( i !== iToRemove )));
        }
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

            <div
            className="grid grid-cols-3 gap-4 mt-10 mb-5 select-none"
            >
                {
                    photos.map(((url,i) => (
                        <div
                        key={'old'+url}
                        className='relative'
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                            width={200}
                            height={200}
                            src={url}
                            alt={`Preview ${i + 1}`}
                            style={{aspectRatio:"1 / 1"}}
                            className="w-full h-32 object-cover rounded-lg border border-gray-400
                            border-solid"
                            onClick={()=>{
                                globalThis.open(url)
                            }}
                            />

                            <div
                            onClick={() => { 
                                removePhoto(i,false); 
                            }}
                            className="absolute top-1 right-1 bg-red-400 text-white 
                            rounded-full w-5 h-5 flex items-center justify-center 
                            hover:bg-red-500 cursor-pointer"
                            >
                                <X width={14} height={14}/>
                            </div>

                        </div>
                    )))
                }
                {
                    newPreviewURLs.map((url, i) => (
                    <div key={`new-${url}`} className='relative'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            width={200}
                            height={200}
                            src={url}
                            alt={`New ${i + 1}`}
                            style={{aspectRatio:"1 / 1"}}
                            className="w-full h-32 object-cover rounded-lg border border-gray-400 border-solid"
                            onClick={() => { globalThis.open(url) }}
                        />
                        <div
                            onClick={() => { removePhoto(i, true); }}
                            className="absolute top-1 right-1 bg-red-400 text-white 
                            rounded-full w-5 h-5 flex items-center justify-center 
                            hover:bg-red-500 cursor-pointer"
                        >
                            <X width={14} height={14}/>
                        </div>
                    </div>
                ))}
            </div>

            <button
            type="submit"
            className="cursor-pointer select-none relative mt-4 mb-8 sm:mb-12 px-6 
            py-2.5 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 
            to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/30 
            hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 
            active:scale-95"
            >
                Update
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