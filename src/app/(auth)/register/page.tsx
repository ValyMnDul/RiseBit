'use client'
import Link from "next/link"
import { useRef,useState ,useEffect} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loading from "@/components/loading";


export default function Register(){

    const submitButton = useRef<HTMLButtonElement>(null);

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(()=>{
        if(session){
            router.push(`/profiles/${session.user?.username}`);
        }
    },[session,router])


    const message = useRef<HTMLParagraphElement>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    if(file){}
    const [preview, setPreview] = useState<string | null>(null);

    

    const sendImage = async (file: File) => {

        submitButton.current!.disabled=true;
        submitButton.current!.textContent="Uploading Image...";
        submitButton.current!.style.backgroundColor="#6b7280";
        submitButton.current!.style.cursor="not-allowed";

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/uploadProfilePhoto", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            setTimeout(() => {
                submitButton.current!.disabled=false;
                submitButton.current!.textContent="Submit";
                submitButton.current!.style.backgroundColor="#3b82f6";
                submitButton.current!.style.cursor="pointer";
            }, 1000);
            const data = await res.json() as { url: string };
            return data.url;
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        submitButton.current!.disabled=true;

        const form = e.currentTarget;
        const formData = new FormData(form);
        

        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            email: (formData.get("email") as string).toLowerCase(),
            password: formData.get("password") as string,
            cPassword:formData.get("cPassword") as string,
            birth: formData.get("birth"),
            profilePhoto: url,
            userName: (formData.get("userName") as string).toLowerCase(),
        };

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const messageFromServer = (await res.json()).message;

        if(res.status===201){
            message.current!.textContent=messageFromServer
            message.current!.style.color="green";
            global.setTimeout(()=>{
                router.push("/login");
            },1500);
        }
        else{
            message.current!.textContent=messageFromServer
            message.current!.style.color="red";
            setTimeout(()=>{
                submitButton.current!.disabled=false;
            },1000)
        }
    }

    if(session===undefined){
        return <Loading/>
    }

    return (
        <form 
        className="flex flex-col gap-4 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] 
        xl:w-[50%] 2xl:w-[40%] mx-auto mt-8 sm:mt-12 md:mt-16 
        lg:mt-20 px-4 sm:px-6 mb-12" 
        onSubmit={handleSubmit}
        >
            <p 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            font-bold text-center select-none"
            >
                Register 
            </p>

            <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-x-4 justify-between"
            >
                <div 
                className="flex flex-col gap-y-2 flex-1"
                >
                    <label 
                    className="text-lg sm:text-xl md:text-2xl" 
                    htmlFor="firstName" 
                    >
                        First Name
                    </label>

                    <input  
                    name="firstName" 
                    id="firstName" 
                    type="text" 
                    maxLength={50} 
                    required
                    autoComplete="first-name"
                    className="border rounded h-10 sm:h-11 md:h-12 text-base 
                    sm:text-lg md:text-xl px-2.5 w-full" 
                    ></input>

                </div>

                <div 
                className="flex flex-col gap-y-2 flex-1"
                >
                    <label 
                    className="text-lg sm:text-xl md:text-2xl" 
                    htmlFor="lastName"
                    >
                        Last Name
                    </label>

                    <input  
                    required 
                    maxLength={50} 
                    className="border rounded h-10 sm:h-11 md:h-12 text-base 
                    sm:text-lg md:text-xl px-2.5 w-full" 
                    name="lastName" 
                    id="lastName" 
                    type="text"
                    autoComplete="last-name"
                    ></input>

                </div>

            </div>

            <div 
            className="flex flex-col gap-y-2"
            >
                <label 
                className="text-lg sm:text-xl md:text-2xl" 
                htmlFor="email"
                >
                    Email
                </label>

                <input 
                required 
                type="email" 
                id="email" 
                name="email" 
                maxLength={100} 
                autoComplete="email"
                className="border rounded h-10 sm:h-11 md:h-12 text-base 
                sm:text-lg md:text-xl px-2.5"
                ></input>

            </div>

            <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-x-4 justify-between"
            >
                <div 
                className="flex flex-col gap-y-2 flex-1"
                >
                    <label 
                    className="text-lg sm:text-xl md:text-2xl" 
                    htmlFor="password"
                    >
                        Password
                    </label>

                    <input 
                    autoComplete="new-password"
                    required 
                    type="password" 
                    id="password" 
                    name="password" 
                    minLength={6} 
                    maxLength={200} 
                    className="border rounded h-10 sm:h-11 md:h-12 text-base 
                    sm:text-lg md:text-xl px-2.5 w-full" 
                    ></input>

                </div>

                <div 
                className="flex flex-col gap-y-2 flex-1"
                >
                    <label 
                    className="text-lg sm:text-xl md:text-2xl" 
                    htmlFor="cPassword"
                    >
                        Confirm Password
                    </label>

                    <input 
                    autoComplete="new-password"
                    required 
                    type="password" 
                    id="cPassword" 
                    name="cPassword" 
                    minLength={6} 
                    maxLength={200} 
                    className="border rounded h-10 sm:h-11 md:h-12 text-base 
                    sm:text-lg md:text-xl px-2.5 w-full" 
                    ></input>

                </div>

            </div>

            <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-x-4 justify-between"
            >

                <div 
                className="flex flex-col gap-y-2 flex-1"
                >
                    <label 
                    className="text-lg sm:text-xl md:text-2xl" 
                    htmlFor="userName"
                    >
                        User Name
                    </label>

                    <input 
                    required 
                    type="text" 
                    id="userName" 
                    name="userName" 
                    minLength={2} 
                    maxLength={20} 
                    autoComplete="username"
                    className="border rounded h-10 sm:h-11 md:h-12 text-base 
                    sm:text-lg md:text-xl px-2.5 w-full" 
                    ></input>

                </div>

                <div 
                className="flex flex-col gap-y-2 flex-1"
                >
                    <label 
                    className="text-lg sm:text-xl md:text-2xl" 
                    htmlFor="birth"
                    >
                        Date of birth
                    </label>

                    <input 
                    required 
                    type="date" 
                    id="birth" 
                    name="birth" 
                    autoComplete="bday"
                    className="border rounded h-10 sm:h-11 md:h-12 text-base 
                    sm:text-lg md:text-xl px-2.5 w-full" 
                    ></input>

                </div>

            </div>


            <div>

                <label 
                className="text-lg sm:text-xl md:text-2xl" 
                htmlFor="file"
                >
                    Profile Photo (optional)
                </label>

                <input 
                type="file" 
                name="file" 
                accept="image/*" 
                id="file" 
                className="border rounded h-10 sm:h-11 md:h-12 text-base sm:text-lg 
                md:text-xl px-2.5 w-full mt-2.5"
                onChange={async (e)=>{
                    const f = e.target.files?.[0];
                    if(f){
                        setFile(f);
                        setPreview(URL.createObjectURL(f));
                        setUrl(await sendImage(f) || null);
                    }
                }}
                ></input>

                {
                    preview!==null ?  
                    <Image 
                    width={300} 
                    height={300} 
                    src={preview} 
                    alt="Preview" 
                    className="rounded-full object-cover mt-5 mb-5 border-4 border-white 
                    mx-auto w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-[300px] 
                    lg:h-[300px]" 
                    style={{aspectRatio:"1 / 1"}}
                    ></Image>
                    
                    :null
                }

            </div>

            <div 
            className="flex items-center gap-2"
            >

                <input 
                required 
                type="checkbox" 
                id="terms" 
                name="terms" 
                className="scale-125 sm:scale-150"
                ></input>

                <label 
                className="text-base sm:text-lg md:text-xl" 
                htmlFor="terms"
                >
                    I agree to the Terms and Conditions
                </label>

            </div>


            <button 
            ref={submitButton}
            type="submit" 
            className="bg-blue-500 text-white text-lg sm:text-xl rounded px-4 
            py-2 sm:py-3 mt-4 select-none hover:bg-blue-600 transition-colors 
            duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit
            </button>

            <div>       

                <Link 
                href="/login" 
                className="text-blue-900 text-base sm:text-lg hover:underline"
                >
                    Already have an account? Login
                </Link>

            </div>

            <p 
            className="text-sm sm:text-base text-center" 
            ref={message}
            >
                Accounts are for demo purposes only. Do not use real information.
            </p>

        </form>
    )
}