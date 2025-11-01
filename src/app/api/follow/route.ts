import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { sessionUsername, postUsername, action } = await req.json()

    try {
        if (action === "follow") {
            await prisma.user.update({
                where: { username: sessionUsername },
                data: { followingList: { push: postUsername } }
            })

            await prisma.user.update({
                where: { username: postUsername },
                data: { followersList: { push: sessionUsername } }
            })

            return NextResponse.json({ success: true, following: true })

        } else if (action === "unfollow") {
            const [currentUser, targetUser] = await Promise.all([
                prisma.user.findUnique({
                    where: { username: sessionUsername },
                    select: { followingList: true }
                }),
                prisma.user.findUnique({
                    where: { username: postUsername },
                    select: { followersList: true }
                })
            ])

            await prisma.user.update({
                where: { username: sessionUsername },
                data: {
                    followingList: currentUser?.followingList.filter(u => u !== postUsername) || []
                }
            })

            await prisma.user.update({
                where: { username: postUsername },
                data: {
                    followersList: targetUser?.followersList.filter(u => u !== sessionUsername) || []
                }
            })

            return NextResponse.json({ success: true, following: false })
        }

    } catch (error) {
        console.error("Follow error:", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}