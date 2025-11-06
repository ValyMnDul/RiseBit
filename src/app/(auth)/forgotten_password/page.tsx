'use client'
import Link from "next/link";
import { useRef,useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loading from "@/components/loading";


export default function ForgottenPassword(){

    const { data:session } = useSession();
    const router=useRouter();

    useEffect(()=>{
        if(session){
            router.push(`/profiles/${session.user?.username}`)
        }
    },[session,router])

    const message=useRef<HTMLParagraphElement>(null);
    const submitButton=useRef<HTMLButtonElement>(null);

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        submitButton.current!.disabled = true; 

        const form=e.currentTarget;
        const email=form.email.value;
        
        const res=await fetch('/api/forgotten_password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        })

        const data=await res.json();

        if (res.status === 200) {

            message.current!.textContent = data.message;
            message.current!.style.color = 'green';

            form.reset();

            setTimeout(() => {
                router.push(`/forgotten_password/code_verify?email=${email}`);
            }, 2000);
        }
        else {
            message.current!.textContent = 'Error. Try again.';
            message.current!.style.color = 'red';
        }
    }

    if(session===undefined){
        return <Loading/>
    }

    return (
        <form 
        className="flex flex-col gap-y-4 w-full sm:w-[90%] md:w-[70%] lg:w-[50%]
        xl:w-[40%] 2xl:w-[33%] mx-auto mt-32 sm:mt-40 md:mt-36 lg:mt-40 px-4 sm:px-6" 
        onSubmit={handleSubmit}
        >
            <p 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center select-none"
            >
                Password Reset
            </p>

            <p 
            className="text-base sm:text-lg md:text-xl text-center select-none"
            >
                Provide your email to reset your password
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
                minLength={6} 
                maxLength={200} 
                className="text-base sm:text-lg md:text-xl border rounded h-10
                 sm:h-11 md:h-12 px-2.5"
                ></input>

            </div>

            <button 
            ref={submitButton}
            type="submit" 
            className="bg-blue-500 text-white text-lg sm:text-xl 
            rounded px-4 py-2 sm:py-3 mt-4 select-none hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                href="/login" 
                className="text-blue-900 text-base sm:text-lg hover:underline"
                >
                    Back to Login
                </Link>
            
            </div>

            <p 
            ref={message} 
            className="text-base sm:text-lg md:text-xl text-center"
            ></p>

        </form>
    )
}