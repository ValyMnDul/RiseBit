import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const {email} =await req.json();

    const code=await prisma.passwordReset.findFirst({ where: { email} });

    return NextResponse.json({code: code?.code}, {status:200});
}