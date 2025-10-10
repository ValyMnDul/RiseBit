import Link from "next/link"

export default function register(){
    return (
        <form className="flex flex-col gap-4 w-1/3 mx-auto mt-[60px]">
            <p className="text-[80px] font-bold text-center select-none">Register</p>
            <div className="flex gap-x-4">
                <div className="flex flex-col gap-y-2">
                    <label className="text-[1.4rem]" htmlFor="firstName" >First Name</label>
                    <input name="firstName" id="firstName" type="text" maxLength={50} required className="border-1 rounded h-[40px] text-2xl pl-[10px] pr-[10px] w-[100%]" ></input>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-[1.4rem]" htmlFor="lastName">Last Name</label>
                    <input required maxLength={50} className="border-1 rounded h-[40px] text-2xl pl-[10px] pr-[10px] w-[100%]" name="lastName" id="lastName" type="text"></input>
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
            

        </form>
    )
}