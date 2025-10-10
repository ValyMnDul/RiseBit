import Link from "next/link";
export default function Footer(){
    return(
        <div className="w-[100%] h-[50px] flex justify-evenly">
            <div className="flex gap-x-[100px] text-[1.2em]">
                <Link href="/terms_and_conditions">Terms and Conditions</Link>
                <Link href="/privacy_policy">Privacy Policy</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/about">About</Link>
            </div>
            <p className="text-[1.2em]">&copy; 2025 RiseBit. All rights reserved.</p>
        </div>
    )
}