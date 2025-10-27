'use client'
import Image from "next/image"
import { useEffect,useState } from "react"


export default function Post({
    username,
    subtitle,
    content,
    updatedAt
}:{
    username:string,
    subtitle:string,
    content:string,
    updatedAt:string
}) {

    const [user,setUser] = useState<{
        profilePic: string;
        followers: number
    }|null>(null);

    useEffect(()=>{

        const getUserDetails = async () => {
            const res = await fetch('/api/getUser',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({username})
            });

            const userData = await res.json();
            setUser(userData);
        }

        getUserDetails();

    },[username]);

    return (
        <div
        className="border p-4 rounded-2xl shadow-md h-auto w-[60%] mt-6"
        >
            <div
            className=" flex justify-between items-center"
            >
                <div 
                className="flex items-center gap-4"
                >
                    <Image
                    src={user?.profilePic || '/defaultUser.png'}
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