import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { URLToPublicId } from "@/lib/cloudinaryUrlToPublicId";
import cloudinary from "@/lib/cloudinary";

export const DELETE = async (req:Request) => {

    const { username, updatedAt} = await req.json();

    try {

        const photos = (await prisma.post.findMany({
            where:{
                username:username,
                updatedAt:updatedAt
            },
            select:{
                photos:true
            }
        }))[0].photos;

        await prisma.post.deleteMany({
            where:{
                username:username,
                updatedAt:updatedAt
            }
        });

        for(const photo of photos){

            const publicID = URLToPublicId(photo);

            try {
                await cloudinary.uploader.destroy(publicID);
            }
            catch(e){
                console.log(e)
            }
        }

    }
    catch(e){
        console.log(e);
    }

    return NextResponse.json({},{status : 200})
}