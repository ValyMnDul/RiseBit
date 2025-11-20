import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { URLToPublicId } from "@/lib/cloudinaryUrlToPublicId";

export const POST = async (req:Request) => {
    try {
        const session = await getServerSession(authOptions);

        if(!session?.user.username){
            return NextResponse.json({message:"Unauthorized"},{status:401});
        }
        

        const formData = await req.formData();

        const postId = formData.get('postId') as string;
        const subtitle = formData.get('subtitle') as string;
        const content = formData.get('content') as string;
        const oldPhotos = JSON.parse(formData.get('oldPhotos') as string) as string[];
        const newPhotos = formData.getAll('newPhotos') as File[];

        if (!subtitle || !content) {
            return NextResponse.json({message:"Title and content are required"},{status:400});
        }

        const post = await prisma.post.findUnique({
            where:{
                id:parseInt(postId)
            }
        });

        if(!post){
            return NextResponse.json({message:"Post not found"},{status:404});
        }
        
        if(post.username !== session.user.username){
            return NextResponse.json({message:"Unauthorized"},{status:403});
        }

        const photosToDelete = post.photos.filter((photo) => (!oldPhotos.includes(photo)));

        for(const photoUrl of photosToDelete){
            try {
                const publicId = URLToPublicId(photoUrl);
                if(publicId){
                    await cloudinary.uploader.destroy(publicId);
                }
            }
            catch(e){
                console.error('V'+e)
            }
        }

        const uploadedPhotos: string[] = [];

        for(const photo of newPhotos){

            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResponse = await new Promise<{secure_url: string}>((resolve, reject) => {

                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'posts',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else if (result) resolve(result);
                        else reject(new Error('Upload failed'));
                    }
                );
                uploadStream.end(buffer);
            });

            uploadedPhotos.push(uploadResponse.secure_url);
        }

        const finalPhotos = [...oldPhotos,...uploadedPhotos];

        if(finalPhotos.length > 6){
            return NextResponse.json({message:"Maximum 6 photos allowed"},{status:400});
        }

        await prisma.post.update({
            where:{
                id:parseInt(postId)
            },
            data:{
                subtitle,
                content,
                photos:finalPhotos,
                updatedAt:new Date()
            }
        });

        return NextResponse.json({message:"Post updated successfully!"},{status:200});
    }
    catch(e){
        console.error("V:Error updating post:" + e );
        return NextResponse.json({message:"Error updating post"},{status:500}); 
    }
}