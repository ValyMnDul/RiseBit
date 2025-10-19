'use server'

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();

  if(await prisma.user.findUnique({where: { email: data.email }})){
    return NextResponse.json({},{ status: 402 });
  }

  if(data.password!==data.cPassword){
    return NextResponse.json({},{ status: 400 });
  }

  if(await prisma.user.findUnique({where: { username: data.userName }})){
    return NextResponse.json({},{ status: 409 });
  }

  if(data.email.length>100 || data.firstName.length>50 || data.lastName.length>50 || data.password.length>200){
    return NextResponse.json({},{ status: 401 });
  }

  if(!data.birth || isNaN(Date.parse(data.birth))){
    return NextResponse.json({},{ status: 403 });
  }

  const birthDate = new Date(data.birth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear = today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  const actualAge = hasHadBirthdayThisYear ? age : age - 1; 

  if(actualAge < 13){
    return NextResponse.json({},{ status:422 });
  }
  if (actualAge > 150) {
    return NextResponse.json({}, { status: 408 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return NextResponse.json({}, { status: 405 });
  }

  if(data.firstName.length===0 || data.lastName.length===0 || data.password.length===0){
    return NextResponse.json({},{ status: 406 });
  }


  await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      birthDate: new Date(data.birth),
      profilePic: data.profilePhoto || null,
      username: data.userName
    },
  }); 

  return NextResponse.json({},{status: 201 });

}
