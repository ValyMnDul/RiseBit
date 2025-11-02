'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Post from "@/components/post"
import Loading from "@/components/loading"

export default function Feed(){
    const { data: session, status } = useSession()
    const sessionUsername = session?.user?.username || ""

    const [posts, setPosts] = useState<Array<{
        username: string,
        subtitle: string,
        content: string,
        updatedAt: string,
        profilePic: string,
        following: boolean, 
        followersNumber:number
    }>>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/getPosts', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sessionUsername })
                })
                const postsData = await res.json()
                setPosts(postsData)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (status === "loading") {
            return
        }

        if (sessionUsername) {
            fetchData()
        } else {
            setLoading(false)
        }
    }, [sessionUsername, status])

    if (loading || status === "loading") {
        return <Loading />
    }

    return (
        <main className="w-full h-full flex flex-col items-center">
            <input
                name="searchBar"
                type="text"
                placeholder="Search for posts..."
                className="mt-6 px-4 py-2 border border-gray-400 rounded w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                className="cursor-pointer select-none relative mt-4 px-6 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => {
                    window.location.href='/create'
                }}
            >
                Create Post
                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
            </button>

            {posts.length > 0 ? 
                posts.map((post, i) => (
                    <Post
                        key={post.username + i}
                        username={post.username}
                        subtitle={post.subtitle}
                        content={post.content}
                        updatedAt={post.updatedAt} 
                        profilePic={post.profilePic}
                        following={post.following}
                        sessionUsername={sessionUsername}
                        followersNumber={post.followersNumber}
                    />
                ))
            : <p className="mt-8 text-gray-500">No posts yet</p>}
        </main>
    )
}