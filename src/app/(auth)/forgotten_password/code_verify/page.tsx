'use client'

import Link from "next/link"
import { useEffect,useState,useRef } from "react";

export default function CodeVerify(){

    const [email,setEmail]=useState<string|null>(null);
    const message=useRef<HTMLParagraphElement>(null);

    useEffect(()=>{
        setEmail(localStorage.getItem("email"));
    },[])

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const form=e.currentTarget;
        const inputCode=form.code.value;

        const res=await fetch('/api/forgotten_password/code_verify',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        })

        const data=await res.json();
        const code= data.code;

        if(code===inputCode){
            message.current!.textContent = 'Code verified!';
            message.current!.style.color = 'green';

            setTimeout(() => {
                global.location.href = '/forgotten_password/code_verify/new_password';
            }, 2000);
        }
        else{
            message.current!.textContent = 'Invalid code. Try again.';
            message.current!.style.color = 'red';
        }

        form.reset();
    }

    const resendEmail = async ()=>{
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
        else{
            message.current!.textContent = 'Error. Try again.';
            message.current!.style.color = 'red';
        }
    }

    return (
        <form className="flex flex-col gap-y-4 w-1/3 mx-auto mt-[150px]" onSubmit={handleSubmit}>
            <p className="text-[50px] font-bold text-center select-none">Code verify</p>
            <p className="text-[21px] text-center select-none">Provide the code sent to your email</p>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="code">Code</label>
                <input placeholder="00000" required type="text" id="code" name="code" minLength={5} maxLength={5} className="text-[25px] text-center border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <button type="submit" className="bg-blue-500 text-white text-xl rounded px-4 py-2 mt-4 select-none">Submit</button>
            <div>
                <a onClick={resendEmail} className="select-none text-blue-900 text-lg cursor-pointer">Resend code</a>
                <Link href="/login" className="text-blue-900 text-lg float-right">Remembered your password? Login</Link>
            </div>
            <p ref={message} className="text-xl text-center"></p>
        </form>
    )
}