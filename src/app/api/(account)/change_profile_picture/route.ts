import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { URLToPublicId } from "@/lib/cloudinaryUrlToPublicId";

export const POST = async (req: Request) => {

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const email = formData.get("email") as string;

    if (file === null) {
        return NextResponse.json({ message: "No file selected!" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            profilePic: true,
        }
    });

    const oldProfilePic = user?.profilePic;

    if (oldProfilePic) {
        const oldProfilePicPublicId = URLToPublicId(oldProfilePic);
        
        if (oldProfilePicPublicId) {
            try {
                await cloudinary.uploader.destroy(oldProfilePicPublicId);
            } catch (error) {
                console.error('Eroare la ștergere:', error);
            }
        }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64String = buffer.toString("base64");
    const base64Image = `data:${file.type};base64,${base64String}`;

    const res = await cloudinary.uploader.upload(base64Image, {
        folder: "ReseBit_Profile_Images",
        resource_type: "image",
        transformation: [{ width: 800, crop: "limit" }]
    });

    const imageURL = res.secure_url;

    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            profilePic: imageURL
        }
    });

    return NextResponse.json({ url: imageURL }, { status: 200 });
}