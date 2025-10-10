import Link from "next/link"

export default function login(){
    return(
        <form className="flex flex-col gap-y-4 w-1/3 mx-auto mt-[100px]">
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
        </form>
    )
}