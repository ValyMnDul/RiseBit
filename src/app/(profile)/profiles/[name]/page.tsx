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
import FollowButton from "@/components/followButton";

export default function ProfilePage() {

  const {data:session} = useSession();
  const router = useRouter();
  const params = useParams();

  const formatDate = (date: Date | null) => date ? new Date(date).toLocaleDateString() : "Unknown";
  const usernameFromParams = params.name;
  
  const [isBioOpen, setIsBioOpen] = useState<boolean>(false);
  const [anotherUser, setAnotherUser] = useState<{
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    bio: string | null,
    profilePic: string | null,
    birthDate: Date | null,
    createdAt: Date | null,
    following: boolean | null,
    followersNumber: number,
    followingNumber: number
  }>({
    username: null,
    firstName: null,
    lastName: null,
    bio: null,
    profilePic: null,
    birthDate: null,
    createdAt: null,
    following: null,
    followersNumber: -1,
    followingNumber:-1
  });

  const [myFollowersNumber,setMyFollowersNumber] = useState<number>(-1);
  const [myFollowingNumber,setMyFollowingNumber] = useState<number>(-1);


  useEffect(() => {
    if (session === null) {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    if (!session?.user?.username) return;

    if (usernameFromParams !== session?.user?.username) {
      const getAnotherUser = async () => {
        try {
          const resAnotherUser = await fetch('/api/getAnotherUser', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: usernameFromParams,
              sessionUsername: session?.user?.username
            })
          });

          if (!resAnotherUser.ok) {
            setAnotherUser({
              username: null,
              firstName: null,
              lastName: null,
              bio: null,
              profilePic: null,
              birthDate: null,
              createdAt: null,
              following: null,
              followersNumber: 0,
              followingNumber: 0
            });
            return;
          }

          const theData = await resAnotherUser.json();
          
          if (!theData.data) {
            setAnotherUser({
              username: null,
              firstName: null,
              lastName: null,
              bio: null,
              profilePic: null,
              birthDate: null,
              createdAt: null,
              following: null,
              followersNumber: 0,
              followingNumber: 0
            });
            return;
          }
          
          setAnotherUser(theData.data);
        } catch (error) {
          console.error(error);
          setAnotherUser({
            username: null,
            firstName: null,
            lastName: null,
            bio: null,
            profilePic: null,
            birthDate: null,
            createdAt: null,
            following: null,
            followersNumber: 0,
            followingNumber: 0
          });
        }
      }
      getAnotherUser()
    }
    else {
      const getMyFlNumbers = async () => {
        const fetchRes = await fetch('/api/getMyFlNumbers', {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            sessionUsername: session?.user.username
          })
        });

        const followData = await fetchRes.json();

        setMyFollowersNumber(followData.followersNumber || 0);
        setMyFollowingNumber(followData.followingNumber || 0);
      }
      if(usernameFromParams && session?.user?.username !== undefined){
        getMyFlNumbers();
      }
    }
  }, [usernameFromParams, session?.user?.username])


  if (usernameFromParams === session?.user?.username && (myFollowingNumber === -1 || myFollowersNumber === -1)) {
    return <Loading />
  }

  if (session === undefined) {
    return <Loading />
  }

  if (usernameFromParams === session?.user?.username) {
    return (
      <main 
      className="flex flex-1 flex-col justify-center items-center px-4 sm:px-6 py-6 
      overflow-y-auto"
      >
        <div 
        className="flex flex-col items-center w-full max-w-2xl"
        >
          <div 
          className="relative w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 
          mb-4 sm:mb-6 shrink-0"
          >
            <Image
              priority
              className="rounded-full border-4 border-white shadow-lg object-cover 
              select-none"
              style={{ aspectRatio: "1 / 1" }}
              src={session?.user?.profilePic || "/defaultUser.png"}
              alt="Profile Picture"
              sizes="(max-width: 640px) 192px, (max-width: 768px) 208px, (max-width: 1024px) 
              224px, 256px"
              fill
            />

          </div>

          <div 
          className="bg-white shadow-lg rounded-2xl p-4 sm:p-5 md:p-7 w-full"
          >
            <div 
            className="flex flex-col sm:flex-row justify-between items-start 
            sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5"
            >
              <h2 
              className="text-xl sm:text-2xl md:text-3xl font-bold"
              >
                {session?.user?.firstName} {session?.user?.lastName}
              </h2>

              <div 
              className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap"
              >
                <p 
                className="cursor-pointer text-gray-700 text-xs sm:text-sm 
                md:text-base lg:text-lg font-medium bg-gray-100 px-2 sm:px-3 
                py-1 rounded-full inline-block shadow-sm whitespace-nowrap"
                onClick={()=>{
                  router.push(`/profiles/${usernameFromParams}/following`)
                }}
                >
                  {myFollowingNumber} following

                </p>

                <p 
                className="cursor-pointer text-gray-700 text-xs sm:text-sm 
                md:text-base lg:text-lg font-medium bg-gray-100 px-2 sm:px-3 
                py-1 rounded-full inline-block shadow-sm whitespace-nowrap"
                onClick={()=>{
                  router.push(`/profiles/${usernameFromParams}/followers`)
                }}
                >
                  {myFollowersNumber} followers
                </p>

              </div>

            </div>

            <div 
            className="flex flex-col gap-2 sm:gap-2.5 text-gray-800 text-sm 
            sm:text-base md:text-lg lg:text-xl"
            >
              <div 
              className="flex flex-col sm:flex-row justify-between border-b 
              border-gray-200 pb-2 gap-1"
              >
                <span 
                className="font-semibold"
                >
                  Username:
                </span>

                <span className="break-all">
                  {session?.user?.username}
                </span>

              </div>

              <div 
              className="flex flex-col sm:flex-row justify-between border-b 
              border-gray-200 pb-2 gap-1"
              >
                <span 
                className="font-semibold"
                >
                  Email:
                </span>

                <span className="break-all">
                  {session?.user?.email}
                </span>

              </div>

              <div 
              className="flex flex-col sm:flex-row justify-between border-b 
              border-gray-200 pb-2 gap-1"
              >
                <span 
                className="font-semibold"
                >
                  Birth Date:
                </span>

                <span>
                  {new Date(session!.user?.birthDate).toLocaleDateString()}
                </span>

              </div>

              <div 
              className="flex flex-col sm:flex-row justify-between border-b 
              border-gray-200 pb-2 gap-1"
              >
                <span 
                className="font-semibold"
                >
                  Account Created:
              </span>

                <span>
                  {new Date(session!.user?.createdAt).toLocaleDateString()}
                </span>

              </div>

            </div>

            <div 
            className="flex justify-center gap-3 sm:gap-4 md:gap-8 mt-4 sm:mt-5 flex-wrap"
            >
              <ViewBioButton 
              set={setIsBioOpen}
              />

              <EditAccountButton />

              <DeleteAccountButton 
              email={session!.user?.email}
              />

            </div>

          </div>

          <textarea
            readOnly
            className={`
              ${isBioOpen ? 'flex' : 'hidden'} 
              mt-4 sm:mt-6 px-4 sm:px-5 py-3 sm:py-4 w-full
              min-h-[200px] sm:min-h-[250px] md:min-h-[300px]
              max-h-[300px] sm:max-h-[400px]
              bg-gray-50 border border-gray-200 rounded-xl shadow-sm
              text-gray-700 leading-relaxed resize-none
              focus:outline-none focus:ring-2 focus:ring-gray-300
              transition-all duration-300 text-sm sm:text-base md:text-lg
            `}
            defaultValue={session?.user?.bio || "No biography provided."}
          />

        </div>
      </main>
    );
  }

  if (anotherUser.followersNumber === -1 && anotherUser.followingNumber === -1 && usernameFromParams !== session?.user?.username) {
    return <Loading />
  }

  if (anotherUser.username === null && usernameFromParams !== session?.user?.username) {
    return (
      <main 
      className="flex flex-1 flex-col justify-center items-center h-full px-4"
      >
        <p 
        className="text-6xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[200px] 
        font-bold font-mono text-center"
        >
          Oops!
        </p> 

        <p 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-mono 
        text-center mt-4"
        >
          404 - User Not Found
        </p>

        <p 
        className="text-base sm:text-lg md:text-xl mt-4 font-mono text-center"
        >
          The user you are looking for does not exist.
        </p>

        <button 
          className="font-mono text-lg sm:text-xl md:text-2xl mt-8 sm:mt-10 md:mt-12 
          px-6 py-3 bg-blue-600 text-white rounded-2xl cursor-pointer 
          hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95" 
          onClick={() => router.push('/')}
        >
          Go to Home
        </button>
        
      </main>
    )
  }
  
  return (
    <main 
    className="flex flex-1 flex-col justify-center items-center px-4 sm:px-6 py-6 
    overflow-y-auto"
    >
      <div 
      className="flex flex-col items-center w-full max-w-2xl"
      >
        <div 
        className="relative w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 
        mb-4 sm:mb-6 shrink-0"
        >
          <Image
            priority
            className="rounded-full border-4 border-white shadow-lg object-cover select-none"
            style={{ aspectRatio: "1 / 1" }}
            src={anotherUser?.profilePic || "/defaultUser.png"}
            alt="Profile Picture"
            sizes="(max-width: 640px) 192px, (max-width: 768px) 208px, (max-width: 1024px) 224px, 256px"
            fill
          />

        </div>

        <div 
        className="bg-white shadow-lg rounded-2xl p-4 sm:p-5 md:p-7 w-full"
        >
          <div 
          className="flex flex-col sm:flex-row justify-between items-start 
          sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5"
          >
            <h2 
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            >
              {anotherUser?.firstName} {anotherUser?.lastName}

            </h2>

            <div 
            className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap"
            >
              <p 
              className="cursor-pointer text-gray-700 text-xs sm:text-sm 
              md:text-base lg:text-lg font-medium bg-gray-100 px-2 sm:px-3 
              md:px-4 py-1 rounded-full inline-block shadow-sm whitespace-nowrap"
              onClick={()=>{
                router.push(`/profiles/${usernameFromParams}/following`);
              }}
              >
                {anotherUser.followingNumber} following
              </p>
              
              <p 
              className="cursor-pointer text-gray-700 text-xs sm:text-sm 
              md:text-base lg:text-lg font-medium bg-gray-100 px-2 sm:px-3 
              md:px-4 py-1 rounded-full inline-block shadow-sm whitespace-nowrap"
              onClick={()=>{
                router.push(`/profiles/${usernameFromParams}/followers`);
              }}
              >
                {anotherUser.followersNumber} followers
              </p>

            </div>

          </div>

          <div 
          className="flex flex-col gap-2 sm:gap-2.5 text-gray-800 text-sm 
          sm:text-base md:text-lg lg:text-xl"
          >
            <div 
            className="flex flex-col sm:flex-row justify-between border-b 
            border-gray-200 pb-2 gap-1"
            >
              <span 
              className="font-semibold"
              >
                Username:
              </span>

              <span className="break-all">
                {anotherUser?.username}
              </span> 

            </div>

            <div 
            className="flex flex-col sm:flex-row justify-between border-b 
            border-gray-200 pb-2 gap-1"
            >
              <span 
              className="font-semibold"
              >
                Birth Date:
              </span>

              <span>
                {formatDate(anotherUser.birthDate)}
              </span>

            </div>

            <div 
            className="flex flex-col sm:flex-row justify-between border-b 
            border-gray-200 pb-2 gap-1"
            >
              <span 
              className="font-semibold"
              >
                Account Created:
              </span>

              <span>
                {formatDate(anotherUser.createdAt)}
              </span>

            </div>

          </div>
 
          <div 
          className="flex justify-between gap-3 sm:gap-4 md:gap-8 mt-4 sm:mt-5 flex-wrap"
          >
            <ViewBioButton 
            set={setIsBioOpen} 
            />

            <FollowButton 
              following={anotherUser.following ?? false} 
              sessionUsername={session!.user!.username} 
              postUsername={anotherUser!.username!} 
            />

          </div>

        </div>

        <textarea
          readOnly
          className={`
            ${isBioOpen ? 'flex' : 'hidden'} 
            mt-4 sm:mt-6 px-4 sm:px-5 py-3 sm:py-4 w-full
            min-h-[200px] sm:min-h-[250px] md:min-h-[300px]
            max-h-[300px] sm:max-h-[400px]
            bg-gray-50 border border-gray-200 rounded-xl shadow-sm
            text-gray-700 leading-relaxed resize-none
            focus:outline-none focus:ring-2 focus:ring-gray-300
            transition-all duration-300 text-sm sm:text-base md:text-lg
          `}
          defaultValue={anotherUser?.bio || "No biography provided."}
        />

      </div>
    </main>
  )
}