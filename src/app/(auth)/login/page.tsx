'use client'
import Link from "next/link"
import { useRef } from "react";

export default function Login(){

    const message=useRef<HTMLParagraphElement>(null);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            email:formData.get("email"),
            password:formData.get("password")
        }

        const res = await fetch ("/api/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })

        if(res.status===400){
            message.current!.textContent="No account found with this email.";
            message.current!.style.color="red";
        }

        if(res.status===401){
            message.current!.textContent="Incorrect password.";
            message.current!.style.color="red";
        }

        if(res.status===405){
            message.current!.textContent="Invalid email format.";
            message.current!.style.color="red";
        }

        if(res.status===406){
            message.current!.textContent="One or more fields exceed the maximum length.";
            message.current!.style.color="red";
        }

        if(res.status===407){
            message.current!.textContent="Password field is empty.";
            message.current!.style.color="red";
        }

        if(res.status===201){
            message.current!.textContent="Login successful!";
            message.current!.style.color="green";
            setTimeout(()=>{
                window.location.href="/";
            },1000);
        }
        
    }

    return(
        <form className="flex flex-col gap-y-4 w-1/3 mx-auto mt-[100px]" onSubmit={handleSubmit}>
            <p className="text-[80px] font-bold text-center select-none">Login</p>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="email">Email</label>
                <input required type="email" id="email" name="email" maxLength={100} className="border-1 rounded h-[40px] text-2xl pl-[10px] pr-[10px]"></input>
            </div>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="password">Password</label>
                <input required type="password" id="password" name="password" minLength={6} maxLength={200} className="border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <button type="submit" className="bg-blue-500 text-white text-xl rounded px-4 py-2 mt-4 select-none">Submit</button>
            <div>
                <Link href="/register" className="text-blue-900 text-lg">Don&apos;t have an account? Register</Link>
                <Link href="/forgotten_password" className="text-blue-900 text-lg float-right">Forgot Password?</Link>
            </div>
            <p ref={message} className="text-center text-[18px]"></p>
        </form>
    )
}