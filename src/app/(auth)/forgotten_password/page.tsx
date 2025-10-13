'use client'
import Link from "next/link";
import { useRef } from "react";

export default function ForgottenPassword(){

    const message=useRef<HTMLParagraphElement>(null);
    const submitButton=useRef<HTMLButtonElement>(null);

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        submitButton.current!.disabled = true; 

        const form=e.currentTarget;
        const email=form.email.value;

        localStorage.setItem('email',email);
        
        const res=await fetch('/api/forgotten_password',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        })

        if (res.status === 200) {
            message.current!.textContent = 'Codul a fost trimis pe email!';
            message.current!.style.color = 'green';
        }
        else {
            message.current!.textContent = 'Eroare. Încearcă din nou.';
            message.current!.style.color = 'red';
        }

        form.reset();
        setTimeout(() => {
            global.location.href = '/forgotten_password/code_verify';
        }, 2000);
    }

    return (
        <form className="flex flex-col gap-y-4 w-1/3 mx-auto mt-[150px]" onSubmit={handleSubmit}>
            <p className="text-[50px] font-bold text-center select-none">Password Reset</p>
            <p className="text-[21px] text-center select-none">Provide your email to reset your password</p>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="email">Email</label>
                <input placeholder="name@example.com" required type="email" id="email" name="email" minLength={6} maxLength={200} className="border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <button ref={submitButton} type="submit" className="bg-blue-500 text-white text-xl rounded px-4 py-2 mt-4 select-none">Submit</button>
            <div>
                <Link href="/register" className="text-blue-900 text-lg">Don&apos;t have an account? Register</Link>
                <Link href="/login" className="text-blue-900 text-lg float-right">Back to Login</Link>
            </div>
            <p ref={message} className="text-xl text-center"></p>
        </form>
    )
}