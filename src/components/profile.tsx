
import Image from "next/image";
import { useRouter } from "next/navigation";
import FollowButton from "./followButton";
import { useSession } from "next-auth/react";

export default function Profile({username, profilePic , following,followersNumber}: {username: string, profilePic: string , following:boolean , followersNumber:number}) {

    const {data:session} = useSession();
    const router = useRouter();

    const sessionUsername = session?.user?.username || "";

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
                            {followersNumber} followers
                        </p>

                    </div>

                </div>

                <FollowButton sessionUsername={sessionUsername} postUsername={username} following={following}/>
    
            </div>
            
        </div>
    )
}