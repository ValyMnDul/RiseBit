'use client';
import Loading from "@/components/loading";
import Profile from "@/components/profile";
import { useEffect,useState } from "react";


export default function ProfilesPage() {

  const [users, setUsers] = useState<Array<{username: string, profilePic: string}>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await fetch('/api/getAllUsers');
      const allUsers = await res.json();
      setUsers(allUsers);
      setLoading(false);
    }
    getAllUsers();
  }, []);

  if (loading) {
    return <Loading />
  }
      
  return (
    <main 
    className="w-full h-full flex flex-col flex-1 items-center p-x-6"
    >
      <input
      name="searchBar"
      type="text"
      placeholder="Search for users..."
      className="mt-6 px-4 py-2 border border-gray-400 rounded w-[50%] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="w-full flex flex-wrap justify-center gap-x-10 mt-6">
        {users.map((user) => (
          <Profile key={user.username} username={user.username} profilePic={user.profilePic || "/defaultUser.png"} />
        ))}
      </div>

    </main>
  );
}
