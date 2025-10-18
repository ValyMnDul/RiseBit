'use client';
import {useSession} from "next-auth/react";
import Image from "next/image";


export default function EditProfile(){

    const changePictureHandler = async () => {
        console.log("Change Picture clicked");
    }

    const {data: session} = useSession();

    const user = session?.user as {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        birthDate: string;
        createdAt: string;
        profilePic: string;
    };

    return(
        <main
        className="flex w-[100%] h-[100%] mt-16"
        >
            <div
            className="w-[30%] h-[100%] border-r-3 border-white"
            >
                <Image
                priority
                src={user?.profilePic || '/default-profile.png'}
                alt="Profile Picture"
                width={350}
                height={350}
                className="rounded-full mx-auto mt-8 border-4 border-white"
                ></Image>

                <label
                htmlFor="profilePicture"
                className="cursor-pointer flex items-center mx-auto mt-[30px] justify-center h-[48px] w-[170px] border-2 hover:bg-gray-300 text-blue-600 border-blue-600 font-bold text-center px-4 rounded"                >
                    Change Picture
                </label>
                <input
                onChange={changePictureHandler}
                id="profilePicture"
                type="file"
                accept="image/*"
                className="hidden"
                />

            </div>

            <div
            className="w-[70%] h-[100%]"
            >

            </div>
        </main>
    )
}