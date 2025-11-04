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
    console.log(email)
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
        className="flex flex-col gap-y-4 w-1/3 mx-auto mt-[150px]" 
        onSubmit={handleSubmit}
        >
            <p 
            className="text-[50px] font-bold text-center select-none"
            >
                Code verify
            </p>

            <p 
            className="text-[21px] text-center select-none"
            >
                Provide the code sent to your email
            </p>

            <div 
            className="flex flex-col gap-y-2"
            >
                <label 
                className="text-[1.4rem]" 
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
                className="text-[21px] text-center border rounded h-10 pl-2.5 pr-2.5"
                ></input>

            </div>

            <button 
            ref={submitButton} 
            type="submit" 
            className="bg-blue-500 text-white text-xl rounded px-4 py-2 mt-4 select-none"
            >
                Submit
            </button>

            <div>

                <a 
                ref={resendButton} 
                onClick={resendEmail} 
                className="select-none text-blue-900 text-lg cursor-pointer"
                >
                    Resend code
                </a>

                <Link 
                href="/login" 
                className="text-blue-900 text-lg float-right"
                >
                    Remembered your password? Login
                </Link>

            </div>

            <p 
            ref={message} 
            className="text-xl text-center"
            ></p>

        </form>
    )
}