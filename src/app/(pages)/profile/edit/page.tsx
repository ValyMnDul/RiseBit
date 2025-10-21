'use client';
import NewPassword from "@/app/(auth)/forgotten_password/code_verify/new_password/page";
import {useSession} from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function EditProfile(){

    /// Change Profile Picture

    const changePictureButtonRef = useRef<HTMLLabelElement>(null);

    const {data: session,update } = useSession();
    const message = useRef<HTMLParagraphElement>(null);


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

    /// Change Usernam

    const changeUsernameButtonRef = useRef<HTMLButtonElement>(null);
    const changeUsernameInputRef = useRef<HTMLInputElement>(null);

    const changeUsernameHandler = async () => {
        const resUsername = await fetch("/api/change_username",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session?.user.email,
                newUsername: changeUsernameInputRef.current?.value,
            })
        })

        const {newUsername} = await resUsername.json()

        await update({
            ...session,
            user: {
                ...session!.user,
                username: newUsername
            }
        });

        if(resUsername.status === 200){

            if(message.current){
                message.current.textContent = "Username updated successfully!";
                message.current.classList.remove("text-red-600");
                message.current.classList.add("text-green-600");
            }

            setTimeout(()=>{
                if(message.current){
                    message.current.textContent = "";
                }
            },3000);
        } 
        else {
            
            if(message.current && changeUsernameInputRef.current && changeUsernameButtonRef.current){

                message.current.textContent = "Username already taken";
                message.current.classList.remove("text-green-600");
                message.current.classList.add("text-red-600");

                changeUsernameInputRef.current.disabled = false;
                changeUsernameInputRef.current.focus();
                changeUsernameButtonRef.current.textContent = "Save";

                setTimeout(()=>{
                    if(message.current){
                        message.current.textContent = "";
                    }
                },3000);
            }
        } 
    }

    /// Change Email

    const changeEmailButtonRef = useRef<HTMLButtonElement>(null);
    const changeEmailInputRef = useRef<HTMLInputElement>(null);


    const changeEmailHandler = async ()=>{
        const resEmail = await fetch('/api/change_email',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:session?.user.email,
                newEmail:changeEmailInputRef.current?.value
            })
        });

        const {newEmail} = await resEmail.json();
    
        await update({
            ...session,
            user:{
                ...session?.user,
                email:newEmail
            }
        })

        if(resEmail.status===200){
            if(message.current){
                message.current.textContent="Email updated successfully!";
                message.current.classList.remove("text-red-600");
                message.current.classList.add("text-green-600");
            }
            setTimeout(()=>{
                if(message.current){
                    message.current.textContent=""
                }
            },3000)
        }
        else{
            if(message.current && changeEmailInputRef.current && changeEmailButtonRef.current){

                message.current.textContent="Email already in use";
                message.current.classList.remove("text-green-600");
                message.current.classList.add("text-red-600");

                changeEmailInputRef.current.disabled = false;
                changeEmailInputRef.current.focus();
                changeEmailButtonRef.current.textContent = "Save";

                setTimeout(()=>{
                    if(message.current){
                        message.current.textContent="";
                    }
                },3000);
            }
        }
    }

    /// Change Password

    const [open, setOpen] = useState<boolean>(false);
    const passwordMessage = useRef<HTMLParagraphElement>(null);

    const changePasswordButtonRef = useRef<HTMLButtonElement>(null);
    const changePasswordInputRef = useRef<HTMLInputElement>(null);

    const changePasswordHandler = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form=e.currentTarget;
        const formData = new FormData(e.currentTarget);

        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");
        const confirmNewPassword = formData.get("confirmNewPassword");



        const resPassword=await fetch('/api/change_password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:session?.user.email,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword,
                currentPassword: currentPassword
            })
        });

        const {message} = await resPassword.json();
        
        if(resPassword.status===200){
            if(passwordMessage.current){
                passwordMessage.current.textContent=message;
                passwordMessage.current.classList.remove("text-red-600");
                passwordMessage.current.classList.add("text-green-600");
                passwordMessage.current.classList.remove("italic");
            }

            setTimeout(()=>{
                if(passwordMessage.current){
                    setOpen(false);
                    form.reset();
                    passwordMessage.current.textContent="Use a strong password with at least 6 characters and less than 200 characters.";
                    passwordMessage.current.classList.remove("text-green-600");
                    passwordMessage.current.classList.add("text-gray-600");
                    passwordMessage.current.classList.add("italic");
                }
            },1500);

        }
        else{
            if(passwordMessage.current){
                passwordMessage.current.textContent=message;
                passwordMessage.current.classList.remove("text-green-600");
                passwordMessage.current.classList.add("text-red-600");
                passwordMessage.current.classList.remove("italic");
            }

            setTimeout(()=>{
                if(passwordMessage.current){
                    passwordMessage.current.textContent="Use a strong password with at least 6 characters and less than 200 characters.";
                    passwordMessage.current.classList.remove("text-red-600");
                    passwordMessage.current.classList.add("text-gray-600");
                    passwordMessage.current.classList.add("italic");
                }
            },3000);
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

                <p
                className="text-center mt-4 text-gray-600 italic"
                >
                    Recommended size: 800x800 pixels
                </p>

                <p
                ref={message}
                className="text-center mt-[100px] text-red-600"
                ></p>

            </div>

            <div
            className="w-[70%] h-[100%] flex flex-col items-center"
            >
                <div
                className="flex items-center mt-8"
                >
                    <label 
                    htmlFor="email"
                    className="text-lg font-bold text-gray-800 uppercase tracking-wide w-[120px]"
                    >
                        Email:
                    </label>

                    <input
                    id="email"
                    name="email"
                    ref={changeEmailInputRef}
                    type="text"
                    defaultValue={session?.user.email}
                    disabled={true}
                    className="focus:ring-2 outline-0 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 w-[700px] h-[48px] ml-8 border-2 border-gray-300 rounded px-4 text-xl"
                    />

                    <button
                    ref={changeEmailButtonRef}
                    className="cursor-pointer h-12 px-5 ml-8 w-[120px] border-2 border-blue-600 text-blue-600 font-bold rounded hover:bg-gray-300"
                    onClick={()=>{
                        if(changeEmailInputRef.current?.disabled && changeEmailButtonRef.current){

                            changeEmailInputRef.current.disabled = false;
                            changeEmailInputRef.current.focus();
                            changeEmailButtonRef.current.textContent = "Save";
                        } 
                        else {
                            changeEmailHandler();
                            if( changeEmailInputRef.current && changeEmailButtonRef.current){

                                changeEmailInputRef.current!.disabled = true;
                                changeEmailButtonRef.current!.textContent = "Edit";
                            }
                        }}}
                    >
                        Edit
                    </button>

                </div>

                <div
                className="flex items-center mt-8"
                >
                    <label 
                    htmlFor="username"
                    className="text-lg font-bold text-gray-800 uppercase tracking-wide w-[120px]"
                    >
                        Username:
                    </label>

                    <input
                    id="username"
                    name="username"
                    ref={changeUsernameInputRef}
                    type="text"
                    defaultValue={session?.user.username}
                    disabled={true}
                    className="focus:ring-2 outline-0 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 w-[700px] h-[48px] ml-8 border-2 border-gray-300 rounded px-4 text-xl"
                    />

                    <button
                    ref={changeUsernameButtonRef}
                    className="cursor-pointer h-12 px-5 ml-8 w-[120px] border-2 border-blue-600 text-blue-600 font-bold rounded hover:bg-gray-300"
                    onClick={()=>{
                        if(changeUsernameInputRef.current?.disabled){
                            changeUsernameInputRef.current.disabled = false;
                            changeUsernameInputRef.current.focus();
                            changeUsernameButtonRef.current!.textContent = "Save";
                        } else {
                            changeUsernameHandler();
                            changeUsernameInputRef.current!.disabled = true;
                            changeUsernameButtonRef.current!.textContent = "Edit";
                        }
                    }}
                    >
                        Edit
                    </button>

                </div>

                <div
                className="flex items-center mt-8"
                >
                    <label 
                    htmlFor="username"
                    className="text-lg font-bold text-gray-800 uppercase tracking-wide w-[120px]"
                    >
                        Password:
                    </label>

                    <input
                    id="password"
                    name="password"
                    ref={changePasswordInputRef}
                    type="password"
                    defaultValue="myStrongPassword123"
                    disabled={true}
                    className="focus:ring-2 outline-0 focus:ring-blue-400 disabled:bg-gray-100 disabled:text-gray-500 w-[700px] h-[48px] ml-8 border-2 border-gray-300 rounded px-4 text-xl"
                    />

                    <button
                    ref={changePasswordButtonRef}
                    className="cursor-pointer h-12 px-5 ml-8 w-[120px] border-2 border-blue-600 text-blue-600 font-bold rounded hover:bg-gray-300"
                    onClick={()=>{
                        if(open===false){
                            setOpen(true);
                        }
                    }}
                    >
                        Edit
                    </button>

                    <div
                        className={`${open ? "fixed":"hidden"} fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center items-center flex-col z-50 p-[20px] w-[700px] h-[430px] bg-white border-1 border-black rounded-2xl`}
                    >
                        <form 
                        onSubmit={changePasswordHandler}
                        >
                            <label
                            htmlFor="currentPassword"
                            className="text-lg font-bold text-gray-800 uppercase tracking-wide w-[120px]"
                            >
                                Current Password
                            </label>
                            
                            <input 
                            id="currentPassword"
                            name="currentPassword"
                            type="password" 
                            className="mt-[8px] border-2 border-gray-300 rounded px-4 py-2 w-[100%] mb-4"
                            ></input>

                            <label
                            htmlFor="newPassword"
                            className="text-lg font-bold text-gray-800 uppercase tracking-wide w-[120px]"
                            >
                                New Password
                            </label>

                            <input 
                            id="newPassword"
                            name="newPassword"
                            type="password" 
                            className="mt-[8px] border-2 border-gray-300 rounded px-4 py-2 w-[100%] mb-4"
                            ></input>
                            
                            <label
                            htmlFor="confirmNewPassword"
                            className="text-lg font-bold text-gray-800 uppercase tracking-wide w-[120px]"
                            >
                                Confirm New Password
                            </label>

                            <input 
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            type="password" 
                            className="mt-[8px] border-2 border-gray-300 rounded px-4 py-2 w-[100%] mb-4"
                            ></input>

                            <div 
                            className="flex justify-evenly mt-[10px]"
                            >
                                <button 
                                    type="button"
                                    onClick={()=>{
                                        setOpen(false);
                                        const form = document.querySelector('form');
                                        form?.reset();
                                        if(passwordMessage.current){
                                            passwordMessage.current.textContent="Use a strong password with at least 6 characters and less than 200 characters.";
                                            passwordMessage.current.classList.remove("text-red-600");
                                            passwordMessage.current.classList.add("text-gray-600");
                                            passwordMessage.current.classList.add("italic");
                                        }
                                    }}
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>

                                <button 
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Set password
                                </button>

                            </div>

                            <p
                            ref={passwordMessage}
                            className="text-[17px] mono mt-[20px] text-center italic text-gray-600"
                            >
                                Use a strong password with at least 6 characters and less than 200 characters.
                            </p>

                        </form>
                    </div>

                </div>

            </div>

        </main>
    )
}