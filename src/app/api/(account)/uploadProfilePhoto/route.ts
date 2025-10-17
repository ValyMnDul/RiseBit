import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const POST=async (req:Request)=>{
    
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if(file===null){
        return NextResponse.json({message:"No file selected!"},{status:400});
    }

    const  buffer = Buffer.from(await file.arrayBuffer());
    const base64String=buffer.toString("base64");
    const base64Image=`data:${file.type};base64,${base64String}`;

    const res=await cloudinary.uploader.upload(base64Image,{
        folder:"ReseBit_Profile_Images",
        resource_type:"image",
        transformation:[{width:800,crop:"limit"}]
    })

    const imageURL = res.secure_url;

    return NextResponse.json({url:imageURL},{status:200})

}