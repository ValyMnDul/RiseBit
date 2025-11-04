import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {

    const {sessionUsername , postUsername} = await req.json();

    const followingList = (await prisma.user.findUnique({
        where:{
            username:postUsername,
        },
        select:{
            followingList:true,
        }
    }))?.followingList;

    /// console.log(followersList); /// [ '', '' ]

    const usersPromise = followingList?.map( async (u) => {

        const myFollowingList = (await prisma.user.findUnique({
            where:{
                username:sessionUsername,
            },
            select:{
                followingList:true,
            }
        }))?.followingList;


        const user = await prisma.user.findUnique({
            where:{
                username:u
            },
            select:{
                profilePic:true,
                followersList:true,
            }
        });

        const profilePic = user?.profilePic;
        const followersNumber = user?.followersList.length;

        
        return {
            username:u,
            profilePic:profilePic,
            followersNumber:followersNumber,
            following: myFollowingList?.includes(u) ? true : false 
        }
    })

    const users = await Promise.all(usersPromise || []);

    /// console.log(users) /// [{},{}...{}]

    return NextResponse.json({users},{status:200});
}