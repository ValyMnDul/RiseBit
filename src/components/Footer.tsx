import Link from "next/link";

export default function Footer() {
  return (
    <footer 
    className="select-none w-full border-t border-gray-300 bg-gray-50 mt-16"
    >

      <div 
      className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 text-gray-700"
      >
        
        <div 
        className="flex flex-wrap justify-center md:justify-start gap-6 text-[1.05em] font-medium"
        >

          <Link 
          href="/terms_and_conditions" 
          className="px-4 py-2 font-semibold text-transparent bg-clip-text 
             bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
             hover:opacity-80 transition-all duration-200"
          >
          Terms & Conditions
          </Link>

          <Link 
          href="/privacy_policy" 
          className="px-4 py-2 font-semibold text-transparent bg-clip-text 
             bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
             hover:opacity-80 transition-all duration-200"
          >
          Privacy Policy
          </Link>

          <Link 
          href="/contact" 
          className="px-4 py-2 font-semibold text-transparent bg-clip-text 
             bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
             hover:opacity-80 transition-all duration-200"
          >
          Contact
          </Link>

          <Link 
          href="/about" 
          className="px-4 py-2 font-semibold text-transparent bg-clip-text 
             bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
             hover:opacity-80 transition-all duration-200"
          >
          About
          </Link>

        </div>

        <p 
        className="text-sm text-gray-500 mt-4 md:mt-0"
        >
        &copy; {new Date().getFullYear()} <span className="font-semibold">RiseBit</span>. All rights reserved.
        </p>
            
      </div>
      
    </footer>
  );
}
