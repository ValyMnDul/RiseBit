'use client'

import { useSession } from "next-auth/react";
import Profile from "@/components/profile";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";

export default function FollowingPage(){

    const { data:session } = useSession();
    const params = useParams()

    const sessionUsername = session?.user?.username;
    const postUsername = params.name;

    type User = {
        username:string;
        profilePic:string;
        following:boolean;
        followersNumber:number;
    };

    const [isLoading,setIsLoading] = useState<boolean>(true);

    const [users,setUsers] = useState<Array<User>>([]);

    const [filteredUsers,setFilteredUsers] = useState<Array<User>>([]);

    const [filter,setFilter] = useState<string>('');

    useEffect(()=>{
        const fetchFollowing = async () => {
            const res = await fetch('/api/getAllFollowing',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    sessionUsername:sessionUsername,
                    postUsername:postUsername
                })
            });
            
            const { users } = await res.json();

            if(res.status === 200){
                setUsers(users);
                setIsLoading(false);
            }
        }

        if(sessionUsername !== undefined && postUsername !== undefined ){
            fetchFollowing();
        }

    },[sessionUsername,postUsername])

    useEffect(()=>{
        if(filter === ''){
            setFilteredUsers(users);
        }
        else{
            const filteredList = users.filter((user) => (
                user.username.toLowerCase().includes(filter.toLowerCase())
            ));
            setFilteredUsers(filteredList);
        }

    },[filter,users]);

    if(isLoading === true){
        return <Loading/>
    }

    return (
        <main
        className="w-full flex-1 flex flex-col items-center px-4 sm:px-6 
        overflow-y-auto"
        >
            <input
            name="searchBar"
            type="text"
            placeholder="Search for users..."
            value={filter}
            onChange={(e) => {
                setFilter(e.currentTarget.value);
            }}
            className="mt-6 px-4 py-2 border border-gray-400 rounded w-full 
            sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] focus:outline-none focus:ring-2
            focus:ring-blue-500"
            />

            {filteredUsers.length > 0 ? (
                <div 
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                xl:grid-cols-4 gap-4 sm:gap-6 mt-6 mb-6"
                >
                    {
                        filteredUsers.map((u,i)=>{
                            return <Profile
                            key={i+u.username}
                            username={u.username}
                            profilePic={u.profilePic || "/defaultUser.png"}
                            following={u.following}
                            followersNumber={u.followersNumber}
                            />
                        })
                    }
                </div>
            ) : (
                <p 
                className="mt-8 text-gray-500 text-base sm:text-lg"
                >
                    No following
                </p>
            )}
            
        </main>
    )
}