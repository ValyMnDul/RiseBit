import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
    const {email,newPassword} = await req.json();

    
}