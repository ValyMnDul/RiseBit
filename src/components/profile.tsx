import Image from "next/image";
import { useRouter } from "next/navigation";
import FollowButton from "./followButton";
import { useSession } from "next-auth/react";

export default function Profile({ 
    username, 
    profilePic , 
    following, 
    followersNumber
}: {
    username: string, 
    profilePic: string , 
    following:boolean , 
    followersNumber:number
}) {

    const {data:session} = useSession();
    const router = useRouter();

    const sessionUsername = session?.user?.username || "";

    return (
        <div
        className="border p-3 sm:p-4 rounded-2xl shadow-md h-auto w-full 
        cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => {
            router.push(`/profiles/${username}`);
        }}
        >
            <div
            className="flex justify-between items-center gap-2 sm:gap-4"
            >
                <div 
                className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1"
                >
                    <Image
                    src={profilePic}
                    alt="Profile Picture"
                    width={40}
                    height={40}
                    className="select-none border border-white object-cover rounded-full 
                    sm:w-[50px] sm:h-[50px] shrink-0"
                    style={{ aspectRatio: "1 / 1" }} 
                    />

                    <div 
                    className="flex flex-col min-w-0"
                    >

                        <h2 
                        className="text-sm sm:text-base md:text-lg font-semibold truncate"
                        >
                            {username}
                        </h2>

                        <p
                        className="text-xs sm:text-sm text-gray-500"
                        >
                            {followersNumber} followers
                        </p>

                    </div>

                </div>

                {sessionUsername && (
                    <div 
                    className="shrink-0"
                    >
                        <FollowButton 
                        sessionUsername={sessionUsername} 
                        postUsername={username} 
                        following={following}
                        />

                    </div>
                )}
    
            </div>
            
        </div>
    )
}