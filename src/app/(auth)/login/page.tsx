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
        className="flex flex-col gap-y-4 w-1/3 mx-auto mt-[100px]" 
        onSubmit={handleSubmit}
        >
            <p 
            className="text-[80px] font-bold text-center select-none"
            >
                Login
            </p>

            <div 
            className="flex flex-col gap-y-2"
            >
                <label 
                className="text-[1.4rem]" 
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
                className="border rounded h-10 text-[21px] pl-2.5 pr-2.5"
                ></input>

            </div>

            <div 
            className="flex flex-col gap-y-2"
            >
                <label 
                className="text-[1.4rem]" 
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
                className="border rounded text-[21px] h-10 pl-2.5 pr-2.5"
                autoComplete="current-password"
                ></input>

            </div>

            <button 
            type="submit" 
            ref={submitButton}
            className="bg-blue-500 text-white text-xl rounded px-4 py-2 mt-4 select-none"
            >
                Submit
            </button>

            <div>
                <Link 
                href="/register" 
                className="text-blue-900 text-lg"
                >
                    Don&apos;t have an account? Register
                </Link>

                <Link 
                href="/forgotten_password" 
                className="text-blue-900 text-lg float-right"
                >
                    Forgot Password?
                </Link>

            </div>

            <p 
            ref={message} 
            className="text-center text-[18px]"
            ></p>

        </form>
    )
}