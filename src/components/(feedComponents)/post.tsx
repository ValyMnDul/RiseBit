'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"


export default function Post({
    username,
    subtitle,
    content,
    updatedAt,
    profilePic
}:{
    username:string,
    subtitle:string,
    content:string,
    updatedAt:string,
    profilePic:string
}) {

    const router = useRouter()

    return (
        <div
        className="border p-4 rounded-2xl shadow-md h-auto w-[60%] mt-6"
        >
            <div
            className=" flex justify-between items-center"
            >
                <div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => {
                    router.push(`/profiles/${username}`);
                }}
                >
                    <Image
                    src={profilePic}
                    alt="Profile Picture"
                    width={50}
                    height={50}
                    className="select-none border border-white object-cover rounded-full"
                    style={{ aspectRatio: "1 / 1" }} 
                    />

                    <div 
                    className="flex flex-col"
                    >

                        <h2 
                        className="text-lg font-semibold">
                            {username}
                        </h2>

                        <p
                        className="text-sm text-gray-500"
                        >
                            0 followers
                        </p>

                    </div>

                </div>

                <button
                className="px-4 py-1.5 rounded-lg font-semibold text-transparent bg-clip-text 
                            bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                            border border-indigo-300 hover:border-pink-400 
                            transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    Follow
                </button>
    
            </div>

            <div 
            className="mt-3"
            >
                <h3 
                className="text-md font-medium"
                >
                    {subtitle}
                </h3>

                <p 
                className="mt-2 text-gray-800 whitespace-pre-wrap leading-relaxed"
                >
                    {content}
                </p>

                <p 
                className="mt-2 text-sm text-gray-500"
                >
                    Posted on: {updatedAt.toLocaleString()}
                </p>

            </div>
            
        </div>
    )
}