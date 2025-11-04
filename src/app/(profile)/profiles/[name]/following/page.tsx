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
    }

    const [isLoading,setIsLoading] = useState<boolean>(true);

    const [users,setUsers] = useState<User[]>([{
        username:"",
        profilePic:"",
        following:false,
        followersNumber:-1,
    }]);

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
            
            const { users } = await res.json()

            if(res.status===200){
                setUsers(users);
                setIsLoading(false);
            }
        }

        if(sessionUsername !== undefined && postUsername !== undefined ){
            fetchFollowing();
        }

    },[sessionUsername,postUsername])

    if(isLoading === true){
        return <Loading/>
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

            <div 
            className="w-full flex flex-wrap justify-center gap-x-10 mt-6"
            >
                {
                    users.map((u,i)=>{
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
            
        </main>
    )
}