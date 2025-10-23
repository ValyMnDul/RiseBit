import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const { email, newEmail, inputCode } = await req.json()

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return NextResponse.json({ message3: "User not found", newEmail }, { status: 404 })
    }

    if (!inputCode || inputCode.length !== 5) {
        return NextResponse.json({ message3: "Invalid code length", newEmail }, { status: 400 })
    }

    const userCode = await prisma.passwordReset.findFirst({
        where: { email: newEmail }
    })

    if (!userCode || userCode.code !== inputCode) {
        return NextResponse.json({ message3: "Invalid code", newEmail }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newEmail)) {
        return NextResponse.json({ message3: "Invalid email format", newEmail }, { status: 400 })
    }

    try {
        await prisma.user.update({
            where: { email },
            data: { email: newEmail }
        })
        await prisma.passwordReset.deleteMany({ where: { email: newEmail } })
    } catch (e) {
        if(e){}
        return NextResponse.json({ message3: "Email already in use", newEmail }, { status: 400 })
    }

    return NextResponse.json({ message3: "Email updated successfully", newEmail }, { status: 200 })
}
