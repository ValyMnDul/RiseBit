
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import DeleteAccountButton from "@/components/deleteAccountButton";
import EditAccountButton from "@/components/editAccountButton";

export default async function ProfilePage() {

  const session = await getServerSession(authOptions);

  if (session===null) {
    redirect('/login');
  }

  const user = session.user as {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    createdAt: string;
    profilePic?: string | null;
    username: string;
    bio?: string | null;
  };
  


  return (
    <main 
    className="flex flex-col items-center justify-evenly w-full h-full flex-1"
    >
      <h1 
      className="cursor-default text-4xl text-center mt-2.5 font-bold"
      >
        Welcome, {user.firstName} {user.lastName}
      </h1>

      <Image
      priority
      className="select-none border-4 border-white object-cover rounded-full" 
      style={{ aspectRatio: "1 / 1" }} 
      src={user.profilePic || "/defaultUser.png"} 
      width={350} 
      height={350} 
      alt="Profile Image"
      ></Image>

      <div 
      className="text-center"
      >

        <p 
        className="text-2xl font-bold"
        >
          Account details:
        </p>

        <p
        className="text-xl"
        >
          Username: {user.username}
        </p>

        <p 
        className="text-xl"
        >
          Email: {user.email}
        </p>

        <p
        className="text-xl"
        >
          Bio: {user.bio || "No bio provided."}

        </p>

        <p 
        className="text-xl"
        >
          Birth Date: {new Date(user.birthDate).toLocaleDateString()}
        </p>

        <p 
        className="text-xl"
        >
          Account Created: {new Date(user.createdAt).toLocaleDateString()}
        </p>

      </div>
      
      <div 
      className=" flex justify-center items-center gap-x-5"
      >
        
        <EditAccountButton />
        <DeleteAccountButton email={user.email}/>

      </div>

    </main>
  );
}