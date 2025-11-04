import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendResetEmail } from "@/lib/mailer";

export async function POST(req: Request) {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ 
        where: { 
          email : email
        } 
    });

    if (!user) {
      return NextResponse.json({message:"The code has been sent to your email!"}, { status: 200 });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    await prisma.passwordReset.deleteMany({ 
      where:{ 
        email:email 
      } 
    });

    await prisma.passwordReset.create({
      data: { 
        email:email, 
        code:code
      },
    });

    await sendResetEmail(email, code);

    return NextResponse.json({message:"The code has been sent to your email!"}, { status: 200 });
}
