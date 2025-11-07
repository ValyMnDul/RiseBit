'use client';
import {useSession} from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import Loading from "@/components/loading";

export default function EditProfile(){

    const {data: session,update } = useSession();
    const router = useRouter();
    const params = useParams();

    const usernameFromParams = params.name;

    useEffect(()=>{

        if(session===null){
            router.push('/login');
        }

        if(session?.user.username !== usernameFromParams){
            router.push(`/profiles/${usernameFromParams}`);
        }
        
    },[session,router,usernameFromParams,session?.user.username]);


    /// Get Password Length

    const [passwordLength,setPasswordLength] = useState<number>(0);

    useEffect(()=>{

        const getPasswordLength = async ()=>{

            if (!session?.user?.email) return;

            const resLength = await fetch('/api/get_password_length',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:session?.user.email
                })
            });

            const {passwordLength} = await resLength.json();

            setPasswordLength(passwordLength);
        }
        getPasswordLength();
    },[session]);

    const fakePassword = "*".repeat(passwordLength);

    /// Change Profile Picture


    const changePictureButtonRef = useRef<HTMLLabelElement>(null);

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

    /// Change Username

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

        if(resUsername.status === 200){

            await update({
                ...session,
                user: {
                    ...session!.user,
                    username: newUsername
                }
            });

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
                message.current.classList.add("text-red-red-600");

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

    const [openEmail, setOpenEmail] = useState<boolean>(false);

    const sendEmailCode = async () => {

        await fetch('/api/verify_email',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:changeEmailInputRef.current?.value
            })
        });
    }


    const changeEmailHandler = async (e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();
        const formDataEmail=e.currentTarget;
        const formDataEmailCode = new FormData(formDataEmail);
        const inputCode = formDataEmailCode.get("emailCode");

        const resEmail = await fetch('/api/change_email',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:session?.user.email,
                newEmail:changeEmailInputRef.current?.value,
                inputCode:inputCode
            })
        });

        const {newEmail,message3} = await resEmail.json();
    

        if(resEmail.status===200){

            setTimeout(()=>{
                formDataEmail.reset();
                setOpenEmail(false)
            },1500)

            await update({
                ...session,
                user:{
                    ...session?.user,
                    email:newEmail
                }
            })
                            
            if(message.current && changeEmailButtonRef.current){
                message.current.textContent=message3;
                message.current.classList.remove("text-red-600");
                message.current.classList.add("text-green-600");
                changeEmailButtonRef.current.disabled = false;
            }
            setTimeout(()=>{
                if(message.current){
                    message.current.textContent=""
                }
            },3000)
        }
        else{
            if(message.current && changeEmailInputRef.current && changeEmailButtonRef.current){

                message.current.textContent=message3;
                message.current.classList.remove("text-green-600");
                message.current.classList.add("text-red-600");

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


    /// Change Bio

    const changeBioButtonRef = useRef<HTMLButtonElement>(null);
    const changeBioInputRef = useRef<HTMLTextAreaElement>(null);

    const changeBioHandler = async ()=>{
        const resBio = await fetch('/api/change_bio',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:session?.user.email,
                newBio:changeBioInputRef.current?.value
            })
        }) 
        
        const {newBio,message2} = await resBio.json();


        if(resBio.status===200){

            await update({
                ...session,
                user:{
                    ...session?.user,
                    bio:newBio
                }
            });

            if(message.current){
                message.current.textContent=message2;
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
            if(message.current){
                message.current.textContent=message2;
                message.current.classList.remove("text-green-600");
                message.current.classList.add("text-red-600");

                if(changeBioInputRef.current && changeBioButtonRef.current){

                    changeBioInputRef.current.disabled = false;
                    changeBioInputRef.current.focus();
                    changeBioButtonRef.current.textContent = "Save";
                }
            }
            setTimeout(()=>{
                if(message.current){
                    message.current.textContent=""
                }
            },3000)
        }
    }

    if(session===undefined){
        return <Loading/>;
    }

    return(
        <main
        className="flex flex-col items-center lg:flex-row w-full mt-16 px-4 
        sm:px-6 lg:px-0 pb-20 lg:pb-0"
        >
            <div
            className="w-full lg:w-[30%] border-b-2 lg:border-b-0 lg:border-r-2 
            border-white pb-6 lg:pb-8 lg:flex lg:flex-col lg:justify-between 
            lg:min-h-[calc(100vh-4rem)]"
            >
                <div>
                    <Image
                    priority
                    src={session?.user.profilePic || '/defaultUser.png'}
                    alt="Profile Picture"
                    width={350}
                    height={350}
                    className="rounded-full object-cover mx-auto mt-6 lg:mt-8 
                    border-4 border-white w-64 h-64 sm:w-72 sm:h-72 md:w-80 
                    md:h-80 lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]"
                    style={{ aspectRatio: "1 / 1" }} 
                    />

                    <label
                    ref={changePictureButtonRef}
                    htmlFor="profilePicture"
                    className="
                        cursor-pointer flex items-center justify-center mx-auto 
                        mt-5 lg:mt-8 h-11 lg:h-12 w-44 lg:w-[170px]
                        px-4 py-2 rounded-xl font-semibold 
                        border-2 border-indigo-400 text-indigo-500 
                        hover:bg-gray-300
                        transition-all duration-300 text-center text-sm lg:text-base
                    ">
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
                    className="text-center mt-3 lg:mt-4 text-gray-600 italic text-xs 
                    sm:text-sm px-4"
                    >
                        Recommended size: 800x800 pixels
                    </p>
                </div>

                <p
                ref={message}
                className="text-center mt-6 lg:mt-0 lg:mb-8 text-red-600 px-4 text-sm 
                lg:text-base"
                ></p>

            </div>

            <div
            className="w-full  lg:w-[70%] flex flex-col lg:justify-between items-center 
            px-4 sm:px-6 lg:px-12 py-6 lg:py-8 lg:min-h-[calc(100vh-4rem)]"
            >
                <div className="w-full flex flex-col items-center space-y-5 lg:space-y-6">
                    <div
                    className="flex flex-col sm:flex-row items-start sm:items-center w-full 
                    max-w-5xl"
                    >
                        <label 
                        htmlFor="username"
                        className="text-base lg:text-lg font-bold text-gray-800 uppercase 
                        tracking-wide w-full sm:w-32 lg:w-36 mb-2 sm:mb-0 shrink-0"
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
                        autoComplete="username"
                        className="focus:ring-2 outline-0 focus:ring-blue-400 
                        disabled:bg-gray-100 disabled:text-gray-500 w-full sm:flex-1 
                        h-11 lg:h-14 sm:ml-6 lg:ml-8 border-2 border-gray-300 rounded-lg 
                        px-4 text-base lg:text-xl"
                        />

                        <button
                        ref={changeUsernameButtonRef}
                        className="
                            cursor-pointer h-11 lg:h-14 w-full sm:w-28 lg:w-32 px-4 py-2 
                            mt-3 sm:mt-0 sm:ml-6 lg:ml-8 shrink-0
                            rounded-xl font-semibold 
                            border-2 border-indigo-400 text-indigo-500 
                            hover:bg-gray-300 
                            transition-all duration-200 text-sm lg:text-base
                        "
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

                    {/* Email Field */}
                    <div
                    className="flex flex-col sm:flex-row items-start sm:items-center 
                    w-full max-w-5xl"
                    >
                        <label 
                        htmlFor="email"
                        className="text-base lg:text-lg font-bold text-gray-800 
                        uppercase tracking-wide w-full sm:w-32 lg:w-36 mb-2 sm:mb-0 
                        shrink-0"
                        >
                            Email:
                        </label>

                        <input
                        id="email"
                        name="email"
                        ref={changeEmailInputRef}
                        type="text"
                        autoComplete="email"
                        defaultValue={session?.user.email}
                        disabled={true}
                        className="focus:ring-2 outline-0 focus:ring-blue-400 
                        disabled:bg-gray-100 disabled:text-gray-500 w-full 
                        sm:flex-1 h-11 lg:h-14 sm:ml-6 lg:ml-8 border-2 border-gray-300 rounded-lg px-4 text-base lg:text-xl"
                        />

                        <button
                        ref={changeEmailButtonRef}
                        className="
                            cursor-pointer h-11 lg:h-14 w-full sm:w-28 lg:w-32 
                            px-4 py-2 mt-3 sm:mt-0 sm:ml-6 lg:ml-8 shrink-0
                            rounded-xl font-semibold 
                            border-2 border-indigo-400 text-indigo-500 
                            hover:bg-gray-300 
                            transition-all duration-200 text-sm lg:text-base
                        "
                        onClick={()=>{
                            if(changeEmailInputRef.current?.disabled===true){

                                changeEmailInputRef.current.disabled = false;
                                changeEmailInputRef.current.focus();
                                changeEmailButtonRef.current!.textContent = "Save";
                            } else {
                                setOpenEmail(true);
                                sendEmailCode();
                                changeEmailInputRef.current!.disabled = true;
                                changeEmailButtonRef.current!.textContent = "Edit";
                                changeEmailButtonRef.current!.disabled = true;
                            }
                        }}
                        >
                            Edit
                        </button>

                        {/* Email Modal */}
                        <div
                        className={`${openEmail ? "fixed" : "hidden"} 
                            fixed inset-0 z-50 flex items-center justify-center 
                            bg-transparent  p-4`}
                        >
                            <div className="w-full max-w-lg bg-white border 
                            border-gray-300 rounded-2xl shadow-xl p-6 sm:p-8">
                                <form 
                                onSubmit={changeEmailHandler}
                                className="w-full"
                                >
                                    <h2 className="text-xl sm:text-2xl font-bold 
                                    text-gray-800 mb-6 text-center">
                                        Change Email
                                    </h2>

                                    <label
                                    htmlFor="emailCode"
                                    className="text-base sm:text-lg font-bold 
                                    text-gray-800 uppercase tracking-wide"
                                    >
                                        Code
                                    </label>
                                    
                                    <input 
                                    maxLength={5}
                                    minLength={5}
                                    id="emailCode"
                                    name="emailCode"
                                    type="text" 
                                    className="mt-2 border-2 border-gray-300 
                                    rounded-lg px-4 py-2 w-full mb-4 
                                        focus:outline-none focus:border-indigo-500 
                                        transition-all duration-200
                                    "
                                    />

                                    <div 
                                    className="flex flex-col sm:flex-row justify-center 
                                    gap-3 sm:gap-6 mt-4"
                                    >
                                        <button 
                                            type="button"
                                            onClick={()=>{
                                                setOpenEmail(false);
                                                const form = document.querySelector('form');
                                                form?.reset();
                                                changeEmailButtonRef.current!.disabled = false;

                                            }}
                                            className="
                                                cursor-pointer h-11 w-full sm:w-28 px-5 
                                                rounded-xl font-semibold 
                                                border-2 border-gray-300 text-gray-700 
                                                hover:bg-gray-100 transition-all duration-200
                                            "
                                        >
                                            Cancel
                                        </button>

                                        <button 
                                            type="submit"
                                            className="
                                                cursor-pointer h-11 w-full sm:w-32 px-5 
                                                rounded-xl font-semibold text-white 
                                                bg-indigo-500 border-2 border-indigo-500 
                                                hover:bg-indigo-600 active:scale-[0.98] 
                                                transition-all duration-200 shadow-sm
                                            "
                                        >
                                            Set email
                                        </button>

                                    </div>

                                    <p
                                    ref={passwordMessage}
                                    className="text-sm sm:text-base mt-5 text-center 
                                    italic text-gray-600"
                                    >
                                        Enter the code sent to your new email address.
                                    </p>

                                </form>
                            </div>
                        </div>

                    </div>

                    {/* Password Field */}
                    <div
                    className="flex flex-col sm:flex-row items-start sm:items-center 
                    w-full max-w-5xl"
                    >
                        <label 
                        htmlFor="password"
                        className="text-base lg:text-lg font-bold text-gray-800 
                        uppercase tracking-wide w-full sm:w-32 lg:w-36 mb-2 sm:mb-0 
                        shrink-0"
                        >
                            Password:
                        </label>
                                            
                        <form 
                        className="w-full sm:flex-1 sm:ml-6 lg:ml-8" 
                        autoComplete="off"
                        >
                            <input
                                id="password"
                                name="password"
                                ref={changePasswordInputRef}
                                type="password"
                                defaultValue={fakePassword}
                                disabled
                                className="focus:ring-2 outline-0 focus:ring-blue-400 
                                disabled:bg-gray-100 disabled:text-gray-500 
                                w-full h-11 lg:h-14 border-2 border-gray-300 
                                rounded-lg px-4 text-base lg:text-xl"
                            />
                        </form>

                        <button
                        ref={changePasswordButtonRef}
                        className="
                            cursor-pointer h-11 lg:h-14 w-full sm:w-28 lg:w-32 px-4 
                            py-2 mt-3 sm:mt-0 sm:ml-6 lg:ml-8 shrink-0
                            rounded-xl font-semibold 
                            border-2 border-indigo-400 text-indigo-500 
                            hover:bg-gray-300 
                            transition-all duration-200 text-sm lg:text-base
                        "
                        onClick={()=>{
                            if(open===false){
                                setOpen(true);
                            }
                        }}
                        >
                            Edit
                        </button>

                        {/* Password Modal */}
                        <div
                        className={`${open ? "fixed" : "hidden"} 
                            fixed inset-0 z-50 flex items-center justify-center 
                            bg-transparent bg-opacity-50 p-4`}
                        >
                            <div className="w-full max-w-lg bg-white border 
                            border-gray-300 rounded-2xl shadow-xl p-6 sm:p-8">
                                <form 
                                onSubmit={changePasswordHandler}
                                >

                                    <h2 className="text-xl sm:text-2xl font-bold 
                                    text-gray-800 mb-6 text-center">
                                        Change Password
                                    </h2>

                                    <label
                                    htmlFor="currentPassword"
                                    className="text-base sm:text-lg font-bold 
                                    text-gray-800 uppercase tracking-wide"
                                    >
                                        Current Password
                                    </label>
                                    
                                    <input 
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password" 
                                    autoComplete="current-password"
                                    className="
                                        mt-2 border-2 border-gray-300 rounded-lg 
                                        px-4 py-2 w-full mb-4 
                                        focus:outline-none focus:border-indigo-500 
                                        transition-all duration-200
                                    "
                                    />

                                    <label
                                    htmlFor="newPassword"
                                    className="text-base sm:text-lg font-bold text-gray-800 
                                    uppercase tracking-wide"
                                    >
                                        New Password
                                    </label>

                                    <input 
                                    id="newPassword"
                                    name="newPassword"
                                    type="password" 
                                    autoComplete="new-password"
                                    className="
                                        mt-2 border-2 border-gray-300 rounded-lg px-4 
                                        py-2 w-full mb-4 
                                        focus:outline-none focus:border-indigo-500 
                                        transition-all duration-200
                                    "
                                    />
                                    
                                    <label
                                    htmlFor="confirmNewPassword"
                                    className="text-base sm:text-lg font-bold 
                                    text-gray-800 uppercase tracking-wide"
                                    >
                                        Confirm New Password
                                    </label>

                                    <input 
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    type="password" 
                                    autoComplete="new-password"
                                    className="
                                        mt-2 border-2 border-gray-300 rounded-lg px-4 
                                        py-2 w-full mb-4 
                                        focus:outline-none focus:border-indigo-500 
                                        transition-all duration-200
                                    "
                                    />

                                    <div 
                                    className="flex flex-col sm:flex-row justify-center 
                                    gap-3 sm:gap-6 mt-4"
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
                                            className="
                                                cursor-pointer h-11 w-full sm:w-28 px-5 
                                                rounded-xl font-semibold 
                                                border-2 border-gray-300 text-gray-700 
                                                hover:bg-gray-100 transition-all duration-200
                                            "
                                        >
                                            Cancel
                                        </button>

                                        <button 
                                            type="submit"
                                            className="
                                                cursor-pointer h-11 w-full sm:w-36 px-5 
                                                rounded-xl font-semibold text-white 
                                                bg-indigo-500 border-2 border-indigo-500 
                                                hover:bg-indigo-600 active:scale-[0.98] 
                                                transition-all duration-200 shadow-sm
                                            "
                                        >
                                            Set password
                                        </button>

                                    </div>

                                    <p
                                    ref={passwordMessage}
                                    className="text-sm sm:text-base mt-5 text-center italic text-gray-600"
                                    >
                                        Use a strong password with at least 6 characters and less than 200 characters.
                                    </p>

                                </form>
                            </div>
                        </div>

                    </div>

                    {/* Bio Field */}
                    <div
                    className="flex flex-col sm:flex-row items-start w-full max-w-5xl"
                    >
                        <label 
                        htmlFor="bio"
                        className="text-base lg:text-lg font-bold text-gray-800 uppercase 
                        tracking-wide w-full sm:w-32 lg:w-36 mb-2 sm:mb-0 shrink-0"
                        >
                            Bio:
                        </label>

                        <textarea
                        id="bio"
                        name="bio"
                        ref={changeBioInputRef}
                        defaultValue={session?.user.bio || ""}
                        disabled={true}
                        className="focus:ring-2 outline-0 focus:ring-blue-400 
                        disabled:bg-gray-100 disabled:text-gray-500 w-full 
                        sm:flex-1 h-40 sm:h-48 lg:h-64 sm:ml-6 lg:ml-8 border-2 
                        border-gray-300 rounded-lg px-4 py-3 text-base lg:text-xl resize-none"
                        ></textarea>

                        <button
                        ref={changeBioButtonRef}
                        className="
                            cursor-pointer h-11 lg:h-14 w-full sm:w-28 lg:w-32 px-4 
                            py-2 mt-3 sm:mt-0 sm:ml-6 lg:ml-8 shrink-0
                            rounded-xl font-semibold 
                            border-2 border-indigo-400 text-indigo-500 
                            hover:bg-gray-300 
                            transition-all duration-200 text-sm lg:text-base
                        "
                        onClick={()=>{
                            if(changeBioInputRef.current?.disabled && changeBioButtonRef.current){

                                changeBioInputRef.current.disabled = false;
                                changeBioInputRef.current.focus();
                                changeBioButtonRef.current.textContent = "Save";
                            } 
                            else {
                                changeBioHandler();
                                if( changeBioInputRef.current && changeBioButtonRef.current){

                                    changeBioInputRef.current.disabled = true;
                                    changeBioButtonRef.current.textContent = "Edit";
                                }
                            }}}
                        >
                            Edit
                        </button>

                    </div>
                </div>

                <div className="hidden lg:block"></div>

            </div>

        </main>
    )
}