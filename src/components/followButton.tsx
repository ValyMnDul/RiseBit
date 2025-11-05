'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function FollowButton({ sessionUsername, postUsername, following }: {
    sessionUsername: string,
    postUsername: string,
    following: boolean
}) {

    const { data:session } = useSession();
    const router = useRouter()
    

    const [isFollowing, setIsFollowing] = useState<boolean>(following)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsFollowing(following)
    }, [following])

    const followButtonHandler = async (e: React.MouseEvent) => {

        e.stopPropagation()


        if(session === undefined || isLoading){
            return
        }
        
        if(session === null){
            router.push('/login');
        }

        setIsLoading(true)

        try {
            await fetch('/api/follow', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sessionUsername,
                    postUsername,
                    action: isFollowing ? "unfollow" : "follow"
                })
            })

            setIsFollowing(prev => !prev)

        } catch (error) {
            console.error("Follow error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (sessionUsername === postUsername) {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/profiles/${sessionUsername}`)
                }}
                className="px-4 py-1.5 rounded-lg font-semibold text-transparent bg-clip-text 
                    bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                    border border-indigo-300 hover:border-pink-400 
                    transition-all duration-300 hover:scale-105 active:scale-95"
            >
                View Profile
            </button>
        )
    }

    return (
        <button
            onClick={followButtonHandler}
            disabled={isLoading}
            className={`px-4 py-1.5 rounded-lg font-semibold text-transparent bg-clip-text 
                bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                border border-indigo-300 hover:border-pink-400 
                transition-all duration-300 hover:scale-105 active:scale-95
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isLoading ? "..." : (isFollowing ? "Unfollow" : "Follow")}
        </button>
    )
}