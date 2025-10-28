import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import DeleteAccountButton from "@/components/deleteAccountButton";
import EditAccountButton from "@/components/editAccountButton";
import ViewBioButton from "@/components/viewBioButton";

export default async function ProfilePage() {

  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

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
    className="flex flex-col items-center justify-center flex-1 h-full w-full overflow-auto px-4 py-6 -mb-5"
    >
      <div 
      className="relative w-75 h-75 mb-6 shrink-0"
      >
        <Image
          priority
          className="rounded-full border-4 border-white shadow-lg object-cover"
          style={{ aspectRatio: "1 / 1" }}
          src={user.profilePic || "/defaultUser.png"}
          alt="Profile Picture"
          sizes="(max-width: 768px) 128px, 224px"
          fill
        />
      </div>


      <div 
      className="bg-white shadow-lg rounded-2xl p-7 w-full max-w-2xl shrink-0"
      >
        <div
        className="flex justify-between items-center text-center mb-5"
        >
          <h2 
          className="text-3xl font-bold  text-center"
          >
            {user.firstName} {user.lastName}
          </h2>

          <p 
          className="text-gray-700 text-lg font-medium bg-gray-100 px-3 py-1 rounded-full inline-block shadow-sm"
          >
            0 followers
          </p>

        </div>

        <div 
        className="flex flex-col gap-2.5 text-gray-800 text-xl"
        >
          <div 
          className="flex justify-between border-b border-gray-200 pb-2"
          >
            <span className="font-semibold">Username:</span>
            <span>{user.username}</span>

          </div>

          <div 
          className="flex justify-between border-b border-gray-200 pb-2"
          >
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>

          </div>

          <div 
          className="flex justify-between border-b border-gray-200 pb-2"
          >
            <span className="font-semibold">Birth Date:</span>
            <span>{new Date(user.birthDate).toLocaleDateString()}</span>

          </div>

          <div 
          className="flex justify-between border-b border-gray-200 pb-2"
          >
            <span className="font-semibold">Account Created:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>

          </div>

        </div>

        <div 
        className="flex justify-center gap-8 mt-5 flex-wrap"
        >
          <ViewBioButton bio={user.bio || "No bio provided."} />
          <EditAccountButton />
          <DeleteAccountButton email={user.email} />

        </div>

      </div>

    </main>

  );
}
