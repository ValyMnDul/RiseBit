'use client'

import Link from "next/link"

export default function CodeVerify(){

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{

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
                <Link href="/forgotten_password" className="text-blue-900 text-lg">Resend code</Link>
                <Link href="/login" className="text-blue-900 text-lg float-right">Remembered your password? Login</Link>
            </div>
            <p className="text-xl text-center"></p>
        </form>
    )
}