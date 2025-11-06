'use client'
 
import Link from "next/link"
import { useRef,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/loading";

export default function NewPassword(){

    const { data:session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    const email = searchParams.get('email');

    useEffect(() => {
        if (searchParams?.size === 0 && router) {
            router.push('/forgotten_password');
        }
    }, [searchParams,router]);

    useEffect(()=>{
        if(session){
            router.push(`/profiles/${session.user?.username}`)
        }
    },[session,router])

    useEffect(()=>{

        const getSuccesValue = async () => {

            const succesValueRes = await fetch('/api/forgotten_password/code_verify/new_password/getSuccesValue',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email
                })
            });

            const { succesValue } = await succesValueRes.json();
            
            if(!succesValue){
                router.push(`/forgotten_password`);
            }
        }

        if(searchParams){
            getSuccesValue();
        }

    },[email,searchParams,router])


    const message=useRef<HTMLParagraphElement>(null);
    const submitButton=useRef<HTMLButtonElement>(null);

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
                localStorage.removeItem('FPPass');
                localStorage.removeItem('email');
            }, 2000);
        }
        else{
            message.current!.textContent = data.message;
            message.current!.style.color = 'red';
        }
    }

    if(session === undefined) {
        return <Loading />
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
                New Password
            </p>

            <p 
            className="mb-2.5 text-base sm:text-lg md:text-xl text-center select-none"
            >
                Time to set your new password
            </p>

            <div 
            className="flex flex-col gap-y-2"
            >
                <label 
                className="text-lg sm:text-xl md:text-2xl" 
                htmlFor="password"
                >
                    New Password
                </label>

                <input 
                required 
                type="password" 
                id="password" 
                name="password" 
                minLength={6} 
                maxLength={200} 
                className="text-base sm:text-lg md:text-xl border rounded h-10 sm:h-11 
                md:h-12 px-2.5"
                ></input>

                <label 
                htmlFor="cPassword" 
                className="mt-3 text-lg sm:text-xl md:text-2xl"
                >
                    Confirm Password
                </label>

                <input 
                required 
                type="password" 
                id="cPassword" 
                name="cPassword" 
                minLength={6} 
                maxLength={200} 
                className="text-base sm:text-lg md:text-xl border rounded h-10 sm:h-11 md:h-12 px-2.5"
                ></input>

            </div>

            <button 
            ref={submitButton} 
            type="submit" 
            className="bg-blue-500 text-white text-lg sm:text-xl rounded px-4 py-2 
            sm:py-3 mt-4 select-none hover:bg-blue-600 transition-colors duration-300 
            disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit
            </button>

            <div 
            className="flex justify-center"
            >
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