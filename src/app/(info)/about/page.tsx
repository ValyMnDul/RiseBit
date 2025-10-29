'use client'

import Link from "next/link"

export default function about(){
    return(

        <main 
        className="max-w-4xl mx-auto px-6 py-16 text-gray-800"
        >

            <h1 
            className="text-5xl font-extrabold text-center mb-10"
            >
                About RiseBit

            </h1>

            <Link 
            href='/feed' 
            className="text-2xl cursor-pointer text-blue-600 hover:text-blue-400"
            >
                &larr;Back
            </Link>

            <section 
            className="mb-12 mt-[9px] space-y-4 text-lg leading-relaxed"
            >
                <p 
                className="text-2xl">
                    <strong>RiseBit</strong> is a next-generation <strong>social 
                    media platform</strong> built for creators, innovators, and 
                    communities who want more control over their digital presence.
                </p>
                
                <p 
                className="text-2xl"
                >
                    Our mission is to provide a fast, clean, and privacy-focused 
                    space where users can connect, share ideas, and grow — without 
                    distractions or invasive tracking.
                </p>

                <p 
                className="text-2xl"
                >
                    Every feature in RiseBit is crafted with simplicity, performance, 
                    and user empowerment in mind.
                </p>

            </section>

            <section 
            className="mb-12"
            >
                <h2 
                className="text-[30px] font-bold mb-4 "
                >
                    Our Vision
                </h2>
                
                <p 
                className="text-2xl leading-relaxed"
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
                className="text-[30px] font-bold mb-6"
                >
                    Tech Stack
                </h2>

                <div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center"
                >

                    <div 
                    onClick={()=>{
                        global.open("https://nextjs.org/","_blank");
                    }} 
                    className="cursor-default p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-[20px]"
                        >
                            Next.js
                        </p>

                        <p 
                        className="text-[16px] text-gray-600"
                        >
                            App Router & API Routes
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://www.typescriptlang.org/","_blank");
                    }} 
                    className="cursor-default p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-[20px]"
                        >
                            TypeScript
                        </p>

                        <p 
                        className="text-[16px] text-gray-600"
                        >
                            Type-safe React code
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://tailwindcss.com/","_blank");
                    }} 
                    className="cursor-default p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-[20px]"
                        >
                            Tailwind CSS
                        </p>

                        <p 
                        className="text-[16px] text-gray-600"
                        >
                            Modern, responsive UI
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://www.prisma.io/","_blank");
                    }} 
                    className="cursor-default p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-[20px]"
                        >
                            Prisma ORM
                        </p>

                        <p 
                        className="text-[16px] text-gray-600"
                        >
                            Database management
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://www.postgresql.org/","_blank");
                    }} 
                    className="cursor-default p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-[20px]"
                        >
                            PostgreSQL
                        </p>

                        <p 
                        className="text-[16px] text-gray-600"
                        >
                            Reliable data storage
                        </p>

                    </div>

                    <div 
                    onClick={()=>{
                        global.open("https://next-auth.js.org/","_blank");
                    }} 
                    className="cursor-default p-4 rounded-2xl shadow bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <p 
                        className="font-semibold text-[20px]"
                        >
                            NextAuth
                        </p>

                        <p 
                        className="text-[16px] text-gray-600"
                        >
                            Secure authentication
                        </p>

                    </div>
                    
                </div>

            </section>

            <p 
            className="mt-14 text-xl text-gray-500 text-center italic"
            >
                🕒 Last updated: October 2025 
            </p>

        </main>
    )
}