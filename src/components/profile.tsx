
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profile({username, profilePic}: {username: string, profilePic: string}) {
    const router = useRouter();

    return (
        <div
        className="border p-4 rounded-2xl shadow-md h-auto w-[20%] mt-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => {
            router.push(`/profiles/${username}`);
        }}
        >
            <div
            className=" flex justify-between items-center"
            >
                <div 
                className="flex items-center gap-4"
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
                onClick={(e) => {e.stopPropagation(); console.log(`Followed ${username}`);}}
                >
                    Follow
                </button>
    
            </div>
            
        </div>
    )
}