'use server'

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {

  const isValidUsername = (username:string) :boolean => {
    const regex = /^[a-zA-Z0-9._-]+$/;
    return regex.test(username);
  }

  const data = await req.json();

  if(await prisma.user.findUnique({where: { email: data.email }})){
    return NextResponse.json({message:"An account with this email already exists."},{ status: 400 });
  }

  if(data.password!==data.cPassword){
    return NextResponse.json({message:"Passwords do not match."},{ status: 400 });
  }

  if(await prisma.user.findUnique({where: { username: data.userName }})){
    return NextResponse.json({message:"An account with this username already exists."},{ status: 400 });
  }

  if(!isValidUsername(data.userName)){
    return NextResponse.json({message:"Username contains invalid characters."},{ status: 400 });
  }

  if(data.email.length>100 || data.firstName.length>50 || data.lastName.length>50 || data.password.length>200){
    return NextResponse.json({message:"One or more fields exceed the maximum length."},{ status: 400 });
  }

  if(!data.birth || isNaN(Date.parse(data.birth))){
    return NextResponse.json({message:"Invalid date of birth."},{ status: 400 });
  }

  const birthDate = new Date(data.birth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear = today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  const actualAge = hasHadBirthdayThisYear ? age : age - 1; 

  if(actualAge < 13){
    return NextResponse.json({message:"You must be at least 13 years old to register."},{ status:400 });
  }
  if (actualAge > 150) {
    return NextResponse.json({message:"I don't think you're that old. Please enter a valid date of birth."}, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return NextResponse.json({message:"Invalid email format."}, { status: 400 });
  }

  if(data.firstName.length===0 || data.lastName.length===0 || data.password.length===0){
    return NextResponse.json({message:"One or more required fields are empty."},{ status: 400 });
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

  return NextResponse.json({message:"Account created successfully."},{status: 201 });

}
