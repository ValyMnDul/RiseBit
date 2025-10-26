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
                    className="rounded-full"
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
                className="px-4 py-2 bg-blue-500 text-white rounded-[6px] hover:bg-blue-600 transition cursor-pointer"
                >Follow</button>
    
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
                className="mt-2 text-gray-800 break-all whitespace-pre-wrap leading-relaxed"
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