'use client'

import { Image as ImageIcon} from 'lucide-react'
import { X } from 'lucide-react'
import { useSession } from "next-auth/react";
import { useEffect, useRef ,useState } from "react";
import { useRouter } from "next/navigation";
import imageCompression from 'browser-image-compression'

import Loading from "@/components/loading";

export default function CreatePostPage(){

    const messageRef = useRef<HTMLParagraphElement>(null);

    const {data:session} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(session === null){
            router.push('/login');
        }
    },[session,router]);


    ////

    const [photos,setPhotos] = useState<Array<File>>([]);
    const [previewURLs,setPreviewURLs] = useState<Array<string>>([])

    useEffect(() => {
        return () => {
            previewURLs.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previewURLs]);

    const onFileChenge = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.files){

            const selectedPhotos = Array.from(e.target.files).slice(0, 6);
            
            const compressedPhotos = []
            const urls = []

            for (const photo of selectedPhotos) {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                }
                
                try {
                    const compressedFile = await imageCompression(photo, options);
                    compressedPhotos.push(compressedFile)
                    urls.push(URL.createObjectURL(compressedFile));
                } 
                catch (error) {
                    console.error('Compression error:', error);
                }
            }

            setPhotos(compressedPhotos);
            setPreviewURLs(urls);
        }

        e.target.value = '';
    }

    const removePhoto = (iToRemove:number) => {

        URL.revokeObjectURL(previewURLs[iToRemove]);

        setPreviewURLs(previewURLs.filter((_,i)=>( i !== iToRemove )));
        setPhotos(photos.filter((_,i) => ( i !== iToRemove )));
    }

 
    const createPost = async (e:React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        
        if(messageRef.current){
            messageRef.current.textContent="Creating post...";
        }
        
        if(!session?.user?.username){
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        formData.set('username',session?.user?.username);

        photos.forEach(( photo )=> {
            formData.append('photo', photo )
        })

        const res = await fetch('/api/createPost',{
            method:"POST",
            body:formData
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

    if(session === undefined){
        return <Loading/>;
    }

    return(
        <form 
        className="w-full h-full flex flex-col items-center justify-center 
        px-4 sm:px-6"
        onSubmit={createPost}
        >
            <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r 
            from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent 
            drop-shadow-md select-none lg:mt-18 mt-10"
            >
            Create Post
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

            <div
            className="grid grid-cols-3 gap-4 mt-10 mb-5 select-none"
            >
                {
                    previewURLs.map(((url,i) => (
                        <div
                        key={url}
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
                            onClick={() => { removePhoto(i); }}
                            className="absolute top-1 right-1 bg-red-400 text-white 
                            rounded-full w-5 h-5 flex items-center justify-center 
                            hover:bg-red-500 cursor-pointer"
                            >
                                <X width={14} height={14}/>
                            </div>

                        </div>
                    )))
                }
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
    );
}