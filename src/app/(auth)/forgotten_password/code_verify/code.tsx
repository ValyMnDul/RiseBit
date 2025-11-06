'use client'

import Link from "next/link"
import { useEffect,useState,useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";

export default function CodeVerify(){

    const { data:session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter()

    useEffect(()=>{
        if(session){
            router.push(`/profiles/${session.user?.username}`)
        }
    },[session,router])

    useEffect(() => {
        if (searchParams?.size === 0 && router) {
            router.push('/forgotten_password');
        }
    }, [searchParams,router]);

    const email = searchParams.get("email");
    
    const message=useRef<HTMLParagraphElement>(null);
    const submitButton=useRef<HTMLButtonElement>(null);
    const resendButton=useRef<HTMLAnchorElement>(null);

    const [timeLeft,setTimeLeft]=useState<number>(120);
    if(timeLeft){}


    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        submitButton.current!.disabled = true; 

        const form = e.currentTarget;
        const inputCode = form.code.value;

        const res = await fetch('/api/forgotten_password/code_verify', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                inputCode:inputCode
            })
        })

        const {resMessage} = await res.json();

        if(res.status === 200 ){
            message.current!.textContent = resMessage;
            message.current!.style.color = 'green';


            setTimeout(() => {
                router.push(`/forgotten_password/code_verify/new_password?email=${email}`);
            }, 2000);
        }
        else{
            message.current!.textContent = resMessage;
            message.current!.style.color = 'red';
            submitButton.current!.disabled = false; 
        }

        form.reset();
    }

    const resendEmail = async ()=>{

        resendButton.current!.style.pointerEvents = 'none';
        resendButton.current!.style.opacity = '0.5';

        const interval = globalThis.setInterval(() => {

        setTimeLeft((prev) => {

            const newTime = prev - 1;
            resendButton.current!.textContent = `${newTime}s`;

            if (newTime <= 0) {
                clearInterval(interval);
                resendButton.current!.textContent = "Resend code";
                resendButton.current!.style.pointerEvents = "auto";
                resendButton.current!.style.opacity = "1";
                message.current!.textContent = '';
                return 120;
            }

            return newTime;
        });

        }, 1000);
   

        const res=await fetch('/api/forgotten_password',{
            method:"POST",
            headers:{
                "ContentType":"application/json"
            },
            body:JSON.stringify({email})
        })

        if(res.status===200){
            message.current!.textContent = 'The code has been resent via email!';
            message.current!.style.color = 'green';
        }
        else {
            message.current!.textContent = 'Error. Try again.';
            message.current!.style.color = 'red';
        }
    }

    if(session === undefined) {
        return <Loading/>
    }

    return (
<form 
        className="flex flex-col gap-y-4 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] 
        xl:w-[40%] 2xl:w-[33%] mx-auto mt-32 sm:mt-40 md:mt-36 lg:mt-40 px-4 sm:px-6" 
        onSubmit={handleSubmit}
        >
            <p 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center 
            select-none"
            >
                Code verify
            </p>

            <p 
            className="text-base sm:text-lg md:text-xl text-center select-none"
            >
                Provide the code sent to your email
            </p>

            <div 
            className="flex flex-col gap-y-2"
            >
                <label 
                className="text-lg sm:text-xl md:text-2xl" 
                htmlFor="code"
                >
                    Code
                </label>

                <input 
                placeholder="00000" 
                required type="text" 
                id="code" name="code" 
                minLength={5} 
                maxLength={5} 
                className="text-base sm:text-lg md:text-xl text-center border 
                rounded h-10 sm:h-11 md:h-12 px-2.5"
                ></input>

            </div>

            <button 
            ref={submitButton} 
            type="submit" 
            className="bg-blue-500 text-white text-lg sm:text-xl rounded px-4 py-2 sm:py-3 mt-4 select-none hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit
            </button>

            <div 
            className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4"
            >

                <a 
                ref={resendButton} 
                onClick={resendEmail} 
                className="select-none text-blue-900 text-base sm:text-lg cursor-pointer 
                hover:underline"
                >
                    Resend code 
                </a>

                <Link 
                href="/login" 
                className="text-blue-900 text-base sm:text-lg hover:underline"
                >
                    Remembered your password? Login
                </Link>

            </div>

            <p 
            ref={message} 
            className="text-base sm:text-lg md:text-xl text-center"
            ></p>

        </form>
    )
}