'use client'

import Link from "next/link"

export default function about(){
    return(

        <main 
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 text-gray-800"
        >

            <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10"
            >
                About RiseBit

            </h1>

            <Link 
            href='/feed' 
            className="text-lg sm:text-xl md:text-2xl cursor-pointer text-blue-600 hover:text-blue-400"
            >
                &larr;Back
            </Link>

            <section 
            className="mb-8 sm:mb-10 md:mb-12 mt-2 sm:mt-3 space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed"
            >
                <p 
                className="text-base sm:text-lg md:text-xl">
                    <strong>RiseBit</strong> is a next-generation <strong>social 
                    media platform</strong> built for creators, innovators, and 
                    communities who want more control over their digital presence.
                </p>
                
                <p 
                className="text-base sm:text-lg md:text-xl"
                >
                    Our mission is to provide a fast, clean, and privacy-focused 
                    space where users can connect, share ideas, and grow — without 
                    distractions or invasive tracking.
                </p>

                <p 
                className="text-base sm:text-lg md:text-xl"
                >
                    Every feature in RiseBit is crafted with simplicity, performance, 
                    and user empowerment in mind.
                </p>

            </section>

            <section 
            className="mb-8 sm:mb-10 md:mb-12"
            >
                <h2 
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                >
                    Our Vision
                </h2>
                
                <p 
                className="text-base sm:text-lg md:text-xl leading-relaxed"
                >
                    We believe social platforms should inspire growth — not dependency. 
                    RiseBit aims to change how people interact online by focusing on 
                    authenticity, transparency, and real connections.  
                    Whether you&apos;re a student, developer, or creator, RiseBit 
                    helps you <strong>rise and build your digital identity</strong> 
                    on your terms.
                </p>

            </section>

            <section>

                <h2 
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
                >
                    Tech Stack
                </h2>

                <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center"
                >

                    <div 
                    onClick={()=>{
                        global.open("https://nextjs.org/","_blank");
                    }} 
                    className="cursor-pointer p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-base sm:text-lg md:text-xl"
                        >
                            Next.js
                        </p>

                        <p 
                        className="text-sm sm:text-base text-gray-600"
                        >
                            App Router & API Routes
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://www.typescriptlang.org/","_blank");
                    }} 
                    className="cursor-pointer p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-base sm:text-lg md:text-xl"
                        >
                            TypeScript
                        </p>

                        <p 
                        className="text-sm sm:text-base text-gray-600"
                        >
                            Type-safe React code
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://tailwindcss.com/","_blank");
                    }} 
                    className="cursor-pointer p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-base sm:text-lg md:text-xl"
                        >
                            Tailwind CSS
                        </p>

                        <p 
                        className="text-sm sm:text-base text-gray-600"
                        >
                            Modern, responsive UI
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://www.prisma.io/","_blank");
                    }} 
                    className="cursor-pointer p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-base sm:text-lg md:text-xl"
                        >
                            Prisma ORM
                        </p>

                        <p 
                        className="text-sm sm:text-base text-gray-600"
                        >
                            Database management
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://www.postgresql.org/","_blank");
                    }} 
                    className="cursor-pointer p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-base sm:text-lg md:text-xl"
                        >
                            PostgreSQL
                        </p>

                        <p 
                        className="text-sm sm:text-base text-gray-600"
                        >
                            Reliable data storage
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://next-auth.js.org/","_blank");
                    }} 
                    className="cursor-pointer p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-base sm:text-lg md:text-xl"
                        >
                            NextAuth
                        </p>

                        <p 
                        className="text-sm sm:text-base text-gray-600"
                        >
                            Secure authentication
                        </p>

                    </div>
                    
                </div>

            </section>

            <p 
            className="mt-10 sm:mt-12 md:mt-14 text-sm sm:text-base md:text-lg text-gray-500 text-center italic"
            >
                🕒 Last updated: October 2025 
            </p>

        </main>
    )
}