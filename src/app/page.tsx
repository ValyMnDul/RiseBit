import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Main() {
  const session = await getServerSession(authOptions);

  if(session){
    redirect('/profile');
  }

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-between">
      <div className="flex flex-col w-[100%] h-[90%] justify-center items-center gap-y-[10px]">
        <div className="flex gap-x-[20px]">
          <Image className="border-4 rounded-2xl cursor-pointer" src="/logo.png" width={600} height={600} alt="RiceBit Logo"></Image>
          <div className="flex flex-col justify-evenly">
            <Link href="/login" className="flex justify-center items-center text-[40px] w-[200px] h-[70px] font-bold bg-white rounded-2xl text-center cursor-pointer">Login</Link>
            <Link href="/register" className="flex justify-center items-center text-[40px] w-[200px] h-[70px] font-bold bg-black text-white rounded-2xl text-center cursor-pointer">Register</Link>
          </div>
        </div>
        <h2 className="text-[50px] font-bold">Small connections create big changes!</h2>
      </div>
      <Footer/>
    </div>
  );
}
