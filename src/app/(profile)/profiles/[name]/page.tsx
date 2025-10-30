'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";
import DeleteAccountButton from "@/components/deleteAccountButton";
import EditAccountButton from "@/components/editAccountButton";
import ViewBioButton from "@/components/viewBioButton";
import { useEffect ,useState} from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { useParams } from "next/navigation";

export default function ProfilePage() {

  const {data:session} = useSession();
  const router = useRouter();
  const params = useParams();

  const formatDate = (date: Date | null) => date ? new Date(date).toLocaleDateString() : "Unknown";
  const usernameFromParams = params.name;
  
  const [isBioOpen,setIsBioOpen] =useState<boolean>(false);
  const [anotherUser,setAnotherUser] = useState<{
    username: string | null,
    firstName:string | null,
    lastName:string | null,
    bio:string | null,
    profilePic:string | null,
    birthDate:Date | null,
    createdAt:Date | null,
  }>({
    username: null,
    firstName:null,
    lastName:null,
    bio:null,
    profilePic:null,
    birthDate:null,
    createdAt:null,
  });


  useEffect(()=>{
    if(session===null){
      router.push('/login');
    }
  },[session,router]);

  useEffect(()=>{
    if(usernameFromParams !== session?.user?.username){
      const getAnotherUser = async () => {
        const resAnotherUSer = await fetch('/api/getAnotherUser',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({username:usernameFromParams})
        });

        const theData = await resAnotherUSer.json();
        setAnotherUser(theData.anotherUser)
      }
      getAnotherUser()
    }
  },[usernameFromParams,session?.user?.username])


  if(session===undefined ){
    return <Loading/>
  }

  if(usernameFromParams === session?.user?.username)
  {
    return (
      <main
      className="flex justify-center items-center"
      >
        <div 
        className="flex flex-col items-center justify-center flex-1 max-w-220 px-4 py-6 -mb-5"
        >
          <div 
          className="relative w-75 h-75 mb-6 shrink-0"
          >
            <Image
              priority
              className="rounded-full border-4 border-white 
                shadow-lg object-cover select-none"
              style={{ aspectRatio: "1 / 1" }}
              src={session?.user?.profilePic || "/defaultUser.png"}
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
                {session?.user?.firstName} {session?.user?.lastName}
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
                <span>{session?.user?.username}</span>

              </div>

              <div 
              className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span className="font-semibold">Email:</span>
                <span>{session?.user?.email}</span>

              </div>

              <div 
              className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span className="font-semibold">Birth Date:</span>
                <span>{new Date(session!.user?.birthDate).toLocaleDateString()}</span>

              </div>

              <div 
              className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span className="font-semibold">Account Created:</span>
                <span>{new Date(session!.user?.createdAt).toLocaleDateString()}</span>

              </div>

            </div>

            <div 
            className="flex justify-center gap-8 mt-5 flex-wrap"
            >
              <ViewBioButton set={setIsBioOpen} />
              <EditAccountButton />
              <DeleteAccountButton email={session!.user?.email} />

            </div>

          </div>

        </div>

        <textarea
        readOnly
        className={`
          ${isBioOpen ? 'flex' : 'hidden'} 
          mt-6 px-5 py-4 w-90 max-w-2xl min-h-130 max-h-180
          bg-gray-50 border border-gray-200 rounded-xl shadow-sm
          text-gray-700  leading-relaxed resize-none
          focus:outline-none focus:ring-2 focus:ring-gray-300
          transition-all duration-300 text-[18px]
        `}
        defaultValue={session?.user?.bio || "No biography provided."}
      />
      </main>

    );
  }
 
  if(anotherUser===null)
  {
    return (
      <main 
      className="flex flex-1 flex-col justify-center items-center h-full"
      >
        <p 
        className="text-[200px] font-bold font-mono"
        >
            Oops!
        </p> 

        <p 
        className="text-[50px] font-semibold font-mono"
        >
            404 - User Not Found
        </p>

        <p 
        className="text-[20px] mt-4 font-mono"
        >
            The user you are looking for does not exist.
        </p>

        <button 
        className=" font-mono text-2xl mb-[60px] mt-[50px] px-6 py-3 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-blue-700" 
        onClick={() => {
            router.push('/');
        }}
        >
            Go to Home
        </button>

      </main>
    )
  }

  if(anotherUser.username === null) {
    return <Loading /> 
  }
  
  return(
    <main
    className="flex justify-center items-center"
    >
      <div 
      className="flex flex-col items-center justify-center flex-1 max-w-220 px-4 py-6 -mb-5"
      >
        <div 
        className="relative w-75 h-75 mb-6 shrink-0"
        >
          <Image
            priority
            className="rounded-full border-4 border-white 
              shadow-lg object-cover select-none"
            style={{ aspectRatio: "1 / 1" }}
            src={anotherUser?.profilePic || "/defaultUser.png"}
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
              {anotherUser?.firstName} {anotherUser?.lastName}
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
              <span>{anotherUser?.username}</span>

            </div>

            <div 
            className="flex justify-between border-b border-gray-200 pb-2"
            >
              <span className="font-semibold">Birth Date:</span>
              <span>{formatDate(anotherUser.birthDate)}</span>

            </div>

            <div 
            className="flex justify-between border-b border-gray-200 pb-2"
            >
              <span className="font-semibold">Account Created:</span>
              <span>{formatDate(anotherUser.createdAt)}</span>

            </div>

          </div>
 
          <div 
          className="flex justify-center gap-8 mt-5 flex-wrap"
          >
            <ViewBioButton set={setIsBioOpen} />

          </div>

        </div>

      </div>

      <textarea
      readOnly
      className={`
        ${isBioOpen ? 'flex' : 'hidden'} 
        mt-6 px-5 py-4 w-90 max-w-2xl min-h-130 max-h-180
        bg-gray-50 border border-gray-200 rounded-xl shadow-sm
        text-gray-700  leading-relaxed resize-none
        focus:outline-none focus:ring-2 focus:ring-gray-300
        transition-all duration-300 text-[18px]
      `}
      defaultValue={anotherUser?.bio || "No biography provided."}
      />
      
    </main>
  )

}
