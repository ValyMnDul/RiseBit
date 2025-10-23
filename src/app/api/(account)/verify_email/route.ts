import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendVerifyEmailCode } from "@/lib/mailerForEmailVerify";

export async function POST(req: Request) {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({}, { status: 200 });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();


    await prisma.passwordReset.deleteMany({ where: { email } });

    await prisma.passwordReset.create({
      data: { email, code },
    });

    await sendVerifyEmailCode(email, code);

    return NextResponse.json({}, { status: 200 });
}
