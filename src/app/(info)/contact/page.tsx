'use client';

import { Github,Linkedin,Instagram } from "lucide-react";
import { useRef } from "react";

export default function Contact(){

    const sendMesRef = useRef<HTMLParagraphElement>(null);

    const  submitContactForm =  async (e: React.FormEvent) => {

        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const res=await fetch("https://formspree.io/f/mkgqqawn",{
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        form.reset();

        if(res.ok){
            if(sendMesRef.current){
                sendMesRef.current.textContent="Message sent successfully!";
                sendMesRef.current.style.color="green";
            }
        }
        else{
            if(sendMesRef.current){
                sendMesRef.current.textContent="Failed to send message. Please try again later.";
                sendMesRef.current.style.color="red";
            }
        }
    }

    return ( 
        <main 
        className="max-w-2xl mx-auto py-12 px-6"
        >
            <h1 
            className="text-[50px] font-bold mb-6 text-center"
            >
                Contact Us
            </h1>

            <p 
            className="mb-6 text-center text-[22px]"
            >
                We&apos;d love to hear from you! Whether you have questions, 
                feedback, or collaboration ideas, reach out using the form below.
            </p>

            <form 
            className="flex flex-col space-y-4" 
            onSubmit={submitContactForm}
            >
                <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
                ></input>

                <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
                ></input>

                <textarea 
                name="message" 
                placeholder="Your Message" 
                rows={6} className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
                ></textarea>

                <button 
                type="submit" 
                className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 transition"
                >
                    Send Message
                </button>

            </form>

            <p 
            ref={sendMesRef} 
            className="mt-6 text-center"
            ></p>

            <div 
            className="mt-10 text-center text-gray-600"
            >
                <p 
                className="text-2xl"
                >
                    Email: <strong>mindrilavasilevalentin@gmail.com</strong>
                </p>

                <div 
                className="mt-[30px] flex justify-center space-x-4 text-gray-800 gap-x-5"
                >
                    <Github 
                    onClick={()=>{
                        global.open("https://github.com/valymndul","_blank");
                    }} 
                    className="w-[70px] h-[70px] text-gray-700 cursor-pointer" 
                    />

                    <Linkedin 
                    onClick={()=>{
                        global.open("https://www.linkedin.com/in/vasilemindrila/","_blank");
                    }} 
                    className="w-[70px] h-[70px] text-gray-700 cursor-pointer" 
                    />

                    <Instagram 
                    onClick={()=>{
                        global.open("https://www.instagram.com/valymnd/","_blank");
                    }} 
                    className="w-[70px] h-[70px] text-gray-700 cursor-pointer" 
                    />

                </div>
                <p 
                className="mt-4 text-[20px] text-gray-600"
                >
                    Follow us on social media!
                </p>

            </div>

        </main>
    );
}