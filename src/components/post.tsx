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
    followersNumber,
    photos
}:{
    username: string,
    subtitle: string,
    content: string,
    updatedAt: string,
    profilePic: string,
    following: boolean,
    sessionUsername: string,
    followersNumber:number,
    photos:Array<string>
}) {
    const router = useRouter()
    
    const validPhotos = photos?.filter((photo) => (photo && photo.trim() !== '')) || []

    return (
        <div 
        className="border p-3 sm:p-4 md:p-5 rounded-2xl shadow-md h-auto w-full 
        sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[40%] mt-4 sm:mt-6 bg-white"
        >
            <div 
            className="flex justify-between items-center gap-2"
            >
                <div 
                    className="flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer 
                    min-w-0 flex-1"
                    onClick={() => {
                        router.push(`/profiles/${username}`);
                    }}
                >
                    <Image
                        src={profilePic}
                        alt="Profile Picture"
                        width={45}
                        height={45}
                        className="select-none border-2 border-gray-200 object-cover 
                        rounded-full w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] 
                        md:w-[55px] md:h-[55px] shrink-0 hover:opacity-90 transition-opacity"
                        style={{ aspectRatio: "1 / 1" }} 
                    />

                    <div 
                    className="flex flex-col min-w-0"
                    >
                        <h2 className="text-sm sm:text-base md:text-lg font-semibold 
                        truncate hover:underline"
                        >
                            {username}
                        </h2>

                        <p 
                        className="text-xs sm:text-sm text-gray-500"
                        >
                            {followersNumber} {followersNumber === 1 ? 'follower' : 'followers'}
                        </p>
                    </div>
                </div>

                {
                    sessionUsername && sessionUsername !== username && (
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
                className="text-base sm:text-lg md:text-xl font-semibold text-gray-900"
                >
                    {subtitle}
                </h3>

                <p 
                className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-700 
                whitespace-pre-wrap leading-relaxed wrap-break-word"
                >
                    {content}
                </p>

                {validPhotos.length > 0 && (
                    <div 
                    className="mt-3 sm:mt-4"
                    >
                        {validPhotos.length === 1 && (
                            <div 
                            className="grid grid-cols-1 gap-1 sm:gap-2"
                            >
                                <div 
                                className="relative w-full aspect-square overflow-hidden rounded-lg"
                                >
                                    <Image
                                    src={validPhotos[0]}
                                    fill
                                    alt={`${username}'s post image`}
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                            </div>
                        )}

                        {validPhotos.length === 2 && (
                            <div 
                            className="grid grid-cols-2 gap-1 sm:gap-2"
                            >
                                {validPhotos.map((photo, index) => (
                                    <div 
                                    key={index} 
                                    className="relative w-full aspect-square overflow-hidden rounded-lg"
                                    >
                                        <Image
                                        src={photo}
                                        fill
                                        alt={`${username}'s post image ${index + 1}`}
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {validPhotos.length === 3 && (
                            <div 
                            className="grid grid-cols-3 gap-1 sm:gap-2"
                            >
                                {validPhotos.map((photo, index) => (
                                    <div 
                                    key={index} 
                                    className="relative w-full aspect-square overflow-hidden rounded-lg"
                                    >
                                        <Image
                                        src={photo}
                                        fill
                                        alt={`${username}'s post image ${index + 1}`}
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        )} 

                        {validPhotos.length === 4 && (
                            <div 
                            className="grid grid-cols-2 gap-1 sm:gap-2"
                            >
                                {validPhotos.map((photo, index) => (
                                    <div 
                                    key={index} 
                                    className="relative w-full aspect-square overflow-hidden rounded-lg"
                                    >
                                        <Image
                                        src={photo}
                                        fill
                                        alt={`${username}'s post image ${index + 1}`}
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {validPhotos.length === 5 && (
                            <div 
                            className="flex flex-col gap-1 sm:gap-2"
                            >
                                <div 
                                className="grid grid-cols-2 gap-1 sm:gap-2"
                                >
                                    {validPhotos.slice(0, 2).map((photo, index) => (
                                        <div 
                                        key={index} 
                                        className="relative w-full aspect-square overflow-hidden rounded-lg"
                                        >
                                            <Image
                                            src={photo}
                                            fill
                                            alt={`${username}'s post image ${index + 1}`}
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div 
                                className="grid grid-cols-3 gap-1 sm:gap-2"
                                >
                                    {validPhotos.slice(2, 5).map((photo, index) => (
                                        <div 
                                        key={index + 2} 
                                        className="relative w-full aspect-square overflow-hidden rounded-lg"
                                        >
                                            <Image
                                            src={photo}
                                            fill
                                            alt={`${username}'s post image ${index + 3}`}
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {validPhotos.length >= 6 && (
                            <div 
                            className="grid grid-cols-3 gap-1 sm:gap-2"
                            >
                                {validPhotos.slice(0, 6).map((photo, index) => (
                                    <div 
                                    key={index} 
                                    className="relative w-full aspect-square overflow-hidden rounded-lg"
                                    >
                                        <Image
                                        src={photo}
                                        fill
                                        alt={`${username}'s post image ${index + 1}`}
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                        />

                                        {index === 5 && validPhotos.length > 6 && (
                                            <div 
                                            className="absolute inset-0 bg-black/60 flex items-center justify-center"
                                            >
                                                <span 
                                                className="text-white text-xl sm:text-2xl font-bold"
                                                >
                                                    +{validPhotos.length - 6}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <p 
                className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500"
                >
                    Posted on: {updatedAt}
                </p>

            </div>

        </div>
    )
} 