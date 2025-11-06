'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import FollowButton from "./followButton"

export default function Post({
    username,
    subtitle,
    content,
    updatedAt,
    profilePic,
    following,
    sessionUsername,
    followersNumber
}:{
    username: string,
    subtitle: string,
    content: string,
    updatedAt: string,
    profilePic: string,
    following: boolean,
    sessionUsername: string,
    followersNumber:number
}) {
    const router = useRouter()

    return (
        <div 
        className="border p-3 sm:p-4 rounded-2xl shadow-md h-auto w-full sm:w-[90%] 
        md:w-[80%] lg:w-[70%] xl:w-[60%] mt-6"
        >
            <div 
            className="flex justify-between items-center gap-2"
            >
                <div 
                    className="flex items-center gap-2 sm:gap-4 cursor-pointer 
                    min-w-0 flex-1"
                    onClick={() => {
                        router.push(`/profiles/${username}`);
                    }}
                >
                    <Image
                        src={profilePic}
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        className="select-none border border-white object-cover 
                        rounded-full sm:w-[50px] sm:h-[50px] shrink-0"
                        style={{ aspectRatio: "1 / 1" }} 
                    />

                    <div 
                    className="flex flex-col min-w-0"
                    >
                        <h2 className="text-sm sm:text-base md:text-lg font-semibold 
                        truncate"
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

                {
                    sessionUsername && (
                        <div className="shrink-0">
                            <FollowButton 
                                following={following}
                                sessionUsername={sessionUsername}
                                postUsername={username} 
                            />
                        </div>
                    )
                }
            </div>

            <div 
            className="mt-3 sm:mt-4"
            >
                <h3 
                className="text-sm sm:text-base md:text-lg font-medium"
                >
                    {subtitle}
                </h3>

                <p 
                className="mt-2 text-sm sm:text-base text-gray-800 
                whitespace-pre-wrap leading-relaxed"
                >
                    {content}
                </p>

                <p 
                className="mt-2 text-xs sm:text-sm text-gray-500"
                >
                    Posted on: {updatedAt}
                </p>

            </div>

        </div>
    )
}