'use client'
 
import Link from "next/link"
import { useRef,useEffect,useState } from "react";

export default function NewPassword(){

    const message=useRef<HTMLParagraphElement>(null);

    const [email,setEmail]=useState<string|null>(null);
    const submitButton=useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        setEmail(localStorage.getItem("email"));
        localStorage.removeItem("email");
    },[])


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        submitButton.current!.disabled = true;

        const form = e.currentTarget;
        const password=form.password.value;
        const cPassword=form.cPassword.value;

        const res=await fetch('/api/forgotten_password/code_verify/new_password',{
            method:"POST",
            headers:{
                "ContentType":"application/json"
            },
            body:JSON.stringify({password,cPassword,email})
        })

        const data=await res.json();
        
        if(res.status===200){
            message.current!.textContent = data.message;
            message.current!.style.color = 'green';
            setTimeout(() => {
                global.location.href = '/login';
            }, 2000);
        }
        else{
            message.current!.textContent = data.message;
            message.current!.style.color = 'red';
        }

    }

    return (
        <form className="flex flex-col gap-y-4 w-1/3 mx-auto mt-[150px]" onSubmit={handleSubmit}>
            <p className="text-[50px] font-bold text-center select-none">New Password</p>
            <p className="mb-[10px] text-[21px] text-center select-none">Time to set your new password</p>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="password">New Password</label>
                <input required type="password" id="password" name="password" minLength={6} maxLength={200} className="text-[21px] border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>

                <label htmlFor="cPassword" className="mt-[12px] text-[1.4rem]"> Confirm Password</label>
                <input required type="password" id="cPassword" name="cPassword" minLength={6} maxLength={200} className="text-[21px] border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <button ref={submitButton} type="submit" className="bg-blue-500 text-white text-xl rounded px-4 py-2 mt-4 select-none">Submit</button>
            <div className="flex justify-center">
                <Link href="/login" className="text-blue-900 text-lg float-right">Remembered your password? Login</Link>
            </div>
            <p ref={message} className="text-xl text-center"></p>
        </form>
    )
}