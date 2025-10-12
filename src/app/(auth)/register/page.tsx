'use client'
import Link from "next/link"
import { useRef } from "react";


export default function Register(){

    const message = useRef<HTMLParagraphElement>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            cPassword:formData.get("cPassword"),
            birth: formData.get("birth"),
        };

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if(res.status===400){
            message.current!.textContent="Passwords do not match.";
            message.current!.style.color="red";
        }

        if(res.status===401){
            message.current!.textContent="One or more fields exceed the maximum length.";
            message.current!.style.color="red";
        }

        if(res.status===402){
            message.current!.textContent="An account with this email already exists.";
            message.current!.style.color="red";
        }

        if(res.status===403){
            message.current!.textContent="Invalid date of birth.";
            message.current!.style.color="red";
        }

        if(res.status===405){
            message.current!.textContent="Invalid email format.";
            message.current!.style.color="red";
        }

        if(res.status===406){
            message.current!.textContent="One or more required fields are empty.";
            message.current!.style.color="red";
        }

        if(res.status===422){
            message.current!.textContent="You must be at least 13 years old to register.";
            message.current!.style.color="red";
        }

        if(res.status===408){
            message.current!.textContent="I don't think you're that old. Please enter a valid date of birth.";
            message.current!.style.color="red";
        }

        if(res.status===201){
            message.current!.textContent="Account created successfully. You can now log in.";
            message.current!.style.color="green";
            global.setTimeout(()=>{
                window.location.href="/login";
            },1500);
        }
    }

    return (
        <form className="flex flex-col gap-4 w-1/3 mx-auto mt-[40px]" onSubmit={handleSubmit}>
            <p className="text-[80px] font-bold text-center select-none">Register</p>
            <div className="flex gap-x-4">
                <div className="flex flex-col gap-y-2">
                    <label className="text-[1.4rem]" htmlFor="firstName" >First Name</label>
                    <input  name="firstName" id="firstName" type="text" maxLength={50} required className="border-1 rounded h-[40px] text-2xl pl-[10px] pr-[10px] w-[100%]" ></input>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-[1.4rem]" htmlFor="lastName">Last Name</label>
                    <input  required maxLength={50} className="border-1 rounded h-[40px] text-2xl pl-[10px] pr-[10px] w-[100%]" name="lastName" id="lastName" type="text"></input>
                </div>
            </div>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="email">Email</label>
                <input required type="email" id="email" name="email" maxLength={100} className="border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="password">Password</label>
                <input required type="password" id="password" name="password" minLength={6} maxLength={200} className="border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="cPassword">Confirm Password</label>
                <input required type="password" id="cPassword" name="cPassword" minLength={6} maxLength={200} className="border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <div className="flex flex-col gap-y-2">
                <label className="text-[1.4rem]" htmlFor="birth">Date of birth</label>
                <input required type="date" id="birth" name="birth" className="border-1 rounded h-[40px] pl-[10px] pr-[10px]"></input>
            </div>
            <div>
                <input required type="checkbox" id="terms" name="terms" className="ml-2 scale-150"></input>
                <label className="text-[1.2rem] ml-4" htmlFor="terms">I agree to the Terms and Conditions</label>
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 mt-4 select-none">Submit</button>
            <div>
                <Link href="/login" className="text-blue-900 text-lg">Already have an account? Login</Link>
            </div>
            <p ref={message}>Accounts are for demo purposes only. Do not use real information.</p>

        </form>
    )
}