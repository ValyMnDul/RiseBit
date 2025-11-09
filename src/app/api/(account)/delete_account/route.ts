import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary";
import { URLToPublicId } from "@/lib/cloudinaryUrlToPublicId";

export const DELETE = async (req:Request)=>{

    const { email } = await req.json();

    const user = await prisma.user.findUnique({
        where:{
            email:email,
        },
        select:{
            profilePic:true,
        }
    });

    if(user === null){
        return NextResponse.json({message:"Email is required"},{status:400});
    }

    await prisma.user.delete({
        where:{
            email:email
        }
    });

    const profilePic = user.profilePic;
    
    if(profilePic){
        const profilePicPublicId = URLToPublicId(profilePic);
        
        if(profilePicPublicId){
            try{
                await cloudinary.uploader.destroy(profilePicPublicId);
            }
            catch(e){
                console.log(`Failed to delete the photo:${e}`)
            }
        }
    }

    return NextResponse.json({message:"Account deleted successfully"},{status:200})
}