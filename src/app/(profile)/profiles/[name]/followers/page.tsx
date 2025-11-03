'use client'

import { useSession } from "next-auth/react";
import Profile from "@/components/profile";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/loading";

export default function FollowersPage(){

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
        const fetchFollowers = async () => {
            const res = await fetch('/api/getAllFollowers',{
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
            fetchFollowers();
        }

    },[sessionUsername,postUsername])

    if(isLoading === true){
        return <Loading/>
    }

    return (
        <div>
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
    )
}