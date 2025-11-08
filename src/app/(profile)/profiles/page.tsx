'use client';
import Loading from "@/components/loading";
import Profile from "@/components/profile";
import { useEffect,useState } from "react";
import { useSession } from "next-auth/react";


export default function ProfilesPage() {

  const {data:session, status} = useSession();
  const sessionUsername = session?.user?.username || "";

  const [users, setUsers] = useState<Array<{
    username: string, 
    profilePic: string,
    following:boolean,
    followersNumber:number
  }>>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [filteredUsers,setFilteredUsers] = useState<Array<{
    username:string,
    profilePic:string,
    following:boolean,
    followersNumber:number
  }>>([]);

  const [filter,setFilter] = useState<string>("");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await fetch('/api/getAllUsers', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sessionUsername })
        });

        const allUsers = (await res.json()).data;
        setUsers(allUsers);
      } 
      catch (error) {
        console.error("Error fetching users:", error);
      } 
      finally {
        setLoading(false);
      }
    }
    
    if(status !== "loading"){
      getAllUsers();
    }
    
  }, [sessionUsername, status]);

  useEffect(()=>{

    if(filter === ''){
      setFilteredUsers(users)
    }
    else{
      const filteredList = users.filter((user) => (
        user.username.toLowerCase().includes(filter.toLowerCase())
      ));
      setFilteredUsers(filteredList);
    }
  },[filter,users]);

  if (loading || status === "loading") {
    return <Loading />
  }
 
  return (
    <main 
    className="w-full flex flex-col flex-1 items-center px-4 sm:px-6 pb-6"
    >
      <input
      name="searchBar"
      type="text"
      placeholder="Search for users..."
      value={filter}
      onChange={(e)=>{
        setFilter(e.currentTarget.value);
      }}
      className="mt-6 px-4 py-2 border border-gray-400 rounded w-full 
      sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] focus:outline-none 
      focus:ring-2 focus:ring-blue-500"
      />

      {filteredUsers.length > 0 ? (
        <div 
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6"
        >
          {filteredUsers.map((user) => (
            <Profile 
            key={user.username} 
            username={user.username} 
            profilePic={user.profilePic || "/defaultUser.png"} 
            following={user.following}
            followersNumber={user.followersNumber}
            />
          ))}
        </div>
      ) : (
        <p 
        className="mt-8 text-gray-500 text-base sm:text-lg"
        >
          No users found
        </p>
      )}
    </main>
  );
}