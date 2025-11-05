'use client'
import Link from "next/link"
import { useRef,useEffect} from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import Loading from "@/components/loading";


export default function Login(){

    const router=useRouter();
    const {data:session}=useSession();

    useEffect(()=>{
        if(session){
            router.push(`/profiles/${session.user?.username}`);
        }
    },[session,router])
    

    const message=useRef<HTMLParagraphElement>(null);
    const submitButton=useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        submitButton.current!.disabled=true;

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            message.current!.textContent = "Email or password incorrect!";
            message.current!.style.color = "red";
            setTimeout(()=>{
                submitButton.current!.disabled=false;
            },1000)
        } 
        else {
            message.current!.textContent = "Login successful!";
            message.current!.style.color = "green";

            setTimeout(() => {
            if (session?.user?.username) {
                router.push(`/profiles/${session.user.username}`);
            }
            }, 2000);
        }
    }

    if(session===undefined){
        return <Loading />
    }

    return(
        <form 
        className="flex flex-col gap-y-4 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[33%] mx-auto mt-32 sm:mt-40 md:mt-28 lg:mt-32 px-4 sm:px-6" 
        onSubmit={handleSubmit}
        >
            <p 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center select-none"
            >
                Login
            </p>

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
                className="border rounded h-10 sm:h-11 md:h-12 text-base sm:text-lg md:text-xl px-2.5"
                ></input>

            </div>

            <div 
            className="flex flex-col gap-y-2"
            >
                <label 
                className="text-lg sm:text-xl md:text-2xl" 
                htmlFor="password"
                >
                    Password
                </label>

                <input 
                required 
                type="password" 
                id="password" 
                name="password" 
                minLength={6} 
                maxLength={200} 
                className="border rounded text-base sm:text-lg md:text-xl h-10 sm:h-11 md:h-12 px-2.5"
                autoComplete="current-password"
                ></input>

            </div>

            <button 
            type="submit" 
            ref={submitButton}
            className="bg-blue-500 text-white text-lg sm:text-xl rounded px-4 py-2 sm:py-3 mt-4 select-none hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit
            </button>

            <div 
            className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4"
            >
                <Link 
                href="/register" 
                className="text-blue-900 text-base sm:text-lg hover:underline"
                >
                    Don&apos;t have an account? Register
                </Link>

                <Link 
                href="/forgotten_password" 
                className="text-blue-900 text-base sm:text-lg hover:underline"
                >
                    Forgot Password?
                </Link>

            </div>

            <p 
            ref={message} 
            className="text-center text-base sm:text-lg"
            ></p>

        </form>
    )
}