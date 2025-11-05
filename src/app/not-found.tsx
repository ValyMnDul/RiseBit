'use client'
import Footer from "@/components/Footer"
import { useRouter } from "next/navigation";

export default function NotFound(){

    const router = useRouter();

    return( 
        <div 
        className="flex flex-col min-h-screen"
        > 
            <main 
            className="flex flex-col justify-center items-center flex-1 px-4 sm:px-6"
            >
                <p 
                className="text-6xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[200px] font-bold font-mono text-center"
                >
                    Oops!
                </p> 

                <p 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-mono text-center mt-4"
                >
                    404 - Page Not Found
                </p>

                <p 
                className="text-base sm:text-lg md:text-xl mt-4 font-mono text-center max-w-md"
                >
                    The page you are looking for does not exist.
                </p>

                <button 
                className="font-mono text-lg sm:text-xl md:text-2xl mt-8 sm:mt-10 md:mt-12 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95" 
                onClick={() => {
                    router.push('/');
                }}
                >
                    Go to Home
                </button>

            </main>

            <Footer/>

        </div>
    )
}