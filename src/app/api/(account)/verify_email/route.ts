import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { sendVerifyEmailCode } from "@/lib/mailerForEmailVerify"

export const POST = async (req: Request) => {
    const { email } = await req.json()

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return NextResponse.json({ }, { status: 400 })
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString()

    await prisma.passwordReset.deleteMany({
        where: { email }
    })

    await prisma.passwordReset.create({
        data: { email, code }
    })

    await sendVerifyEmailCode(email, code)

    return NextResponse.json({ message: "Code sent" }, { status: 200 })
}
