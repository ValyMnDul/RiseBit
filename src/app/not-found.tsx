'use client'
import Footer from "@/components/Footer"

export default function notFound(){
    return( 
        <div 
        className="flex flex-col h-screen"
        > 

            <main 
            className="flex flex-col justify-center items-center h-[100%]"
            >

                <p 
                className="text-[200px] font-bold font-mono"
                >
                Oops!
                </p> 

                <p 
                className="text-[50px] font-semibold font-mono"
                >
                404 - Page Not Found
                </p>

                <p 
                className="text-[20px] mt-4 font-mono"
                >
                The page you are looking for does not exist.
                </p>

                <button 
                className=" font-mono text-2xl mb-[60px] mt-[50px] px-6 py-3 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-blue-700" 
                onClick={() => {
                    window.location.href = '/';
                }}
                >
                Go to Home
                </button>

            </main>

            <Footer/>

        </div>
    )
}