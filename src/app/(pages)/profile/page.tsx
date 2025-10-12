
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const user = session.user as {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    createdAt: string;
  };

  return (
    <main className="flex flex-col items-center justify-evenly w-[100%] h-[100%]">
      <h1 className="cursor-default text-4xl  font-bold">Welcome, {user.firstName} {user.lastName}</h1>
      <Image className="select-none border-[4px] border-white rounded-[50%]" src="/me.png" width={350} height={350} alt="Profile Image"></Image>
      <div>
        <p className="text-2xl font-bold">Account details:</p>
        <p className="text-xl">Email: {user.email}</p>
        <p className="text-xl">Birth Date: {new Date(user.birthDate).toLocaleDateString()}</p>
        <p className="text-xl">Account Created: {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </main>
  );
}
