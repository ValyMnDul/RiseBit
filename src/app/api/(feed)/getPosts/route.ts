import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    
    const { sessionUsername } = await request.json()

    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        const usernames = [...new Set(posts.map(p => p.username))]

        const users = await prisma.user.findMany({
            where: {
                username: { in: usernames }
            },
            select: {
                username: true,
                profilePic: true,
                followersList:true,
            }
        })

        let followingList: string[] = []
        if (sessionUsername) {
            const currentUser = await prisma.user.findUnique({
                where: { username: sessionUsername },
                select: { followingList: true }
            })
            followingList = currentUser?.followingList || []
        }

        const postsWithDetails = posts.map(post => {
            const user = users.find(u => u.username === post.username)
            return {
                ...post,
                profilePic: user?.profilePic || '/defaultUser.png',
                following: followingList.includes(post.username),
                followersNumber:user?.followersList.length
            }
        })

        return NextResponse.json(postsWithDetails, { status: 200 })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}