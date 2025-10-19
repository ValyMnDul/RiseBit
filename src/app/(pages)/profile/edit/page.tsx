'use client';
import {useSession} from "next-auth/react";
import Image from "next/image";
import { useRef } from "react";

export default function EditProfile(){

    const changePictureButtonRef = useRef<HTMLLabelElement>(null);

    const {data: session,update } = useSession();


    const changePictureHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {

        changePictureButtonRef.current?.classList.add("border-gray-500");
        changePictureButtonRef.current!.textContent = "Uploading...";
        changePictureButtonRef.current!.style.pointerEvents = "none";

        const file = e.target.files?.[0];
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            formData.append("email",""+session?.user?.email);

            const res= await fetch("/api/change_profile_picture",{
                method:"POST",
                body: formData,
            });
            const data=await res.json();


            const updateRes=await update({
                ...session,
                user: {
                    ...session!.user,
                    profilePic: data.url 
                }
            });

            if(updateRes){
                setTimeout(()=>{
                    changePictureButtonRef.current?.classList.remove("border-gray-500");
                    changePictureButtonRef.current!.textContent = "Change Picture";
                    changePictureButtonRef.current!.style.pointerEvents = "auto";
                },500);
            }

        }

    }

    return(
        <main
        className="flex w-[100%] h-[100%] mt-16"
        >
            <div
            className="w-[30%] h-[100%] border-r-3 border-white"
            >
                <Image
                priority
                src={session?.user.profilePic || '/defaultUser.png'}
                alt="Profile Picture"
                width={350}
                height={350}
                className="rounded-full mx-auto mt-8 border-4 border-white"
                />

                <label
                ref={changePictureButtonRef}
                htmlFor="profilePicture"
                className="cursor-pointer flex items-center mx-auto mt-[30px] justify-center h-[48px] w-[170px] border-2 hover:bg-gray-300 text-blue-600 border-blue-600 font-bold text-center px-4 rounded"                >
                    Change Picture
                </label>
                <input
                onChange={(e) => changePictureHandler(e)}
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