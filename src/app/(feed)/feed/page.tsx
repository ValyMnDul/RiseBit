'use client'
import { useEffect ,useState} from "react"

import Post from "@/components/(feedComponents)/post"
import Loading from "@/components/loading";


export default function Feed(){


    const [posts, setPosts] = useState<Array<{
        username:string,
        subtitle:string,
        content:string,
        updatedAt:string,

    }>>([]);

    const [userDetails, setUserDetails] = useState<Array<{
        username:string,
        profilePic:string,
    }>>([]);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resPosts = await fetch('/api/getPosts', { method: "GET" })
                const postsData = await resPosts.json()
                setPosts(postsData)

                if (postsData.length > 0) {
                    const resUsers = await fetch('/api/getUsers', {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ usernames: (postsData as Array<{ username: string }>).map(p => p.username) })
                    });
                    const usersData = await resUsers.json()
                    setUserDetails(usersData)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, []);

    if (loading) {
        return <Loading />
    }


    return (
        <main 
        className="w-full h-full flex flex-col items-center"
        >

            <input
            name="searchBar"
            type="text"
            placeholder="Search for posts..."
            className="mt-6 px-4 py-2 border border-gray-400 rounded w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
            className="cursor-pointer select-none relative mt-4 px-6 py-2.5 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={()=>{
                window.location.href='/create';
            }}
            >
                Create Post
                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
            </button>

            {
                posts.length > 0 ? 
                    
                    posts.map((post, i) => {
                        return (
                            <Post
                            key={i}
                            username={post.username}
                            subtitle={post.subtitle}
                            content={post.content}
                            updatedAt={post.updatedAt} 
                            profilePic={userDetails.find(user => user.username === post.username)?.profilePic || '/defaultUser.png'}
                            />
                        );
                    })

                : null
            }
    
        </main>
    )
}