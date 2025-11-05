import Link from "next/link";

export default function Footer() {
  return (
    <footer 
    className="select-none w-full border-t border-gray-300 bg-gray-50 mt-16"
    >
      
      <div 
      className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 py-6 sm:py-4 text-gray-700"
      >
        
        <div 
        className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto"
        >

          <Link 
          href="/terms_and_conditions" 
          className="px-3 sm:px-4 py-2 font-semibold text-transparent bg-clip-text 
            bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:opacity-80 transition-all duration-200 text-sm sm:text-base text-center 
            whitespace-nowrap"
          >
          Terms & Conditions
          </Link>

          <Link 
          href="/privacy_policy" 
          className="px-3 sm:px-4 py-2 font-semibold text-transparent bg-clip-text 
            bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:opacity-80 transition-all duration-200 text-sm sm:text-base text-center 
            whitespace-nowrap"
          >
          Privacy Policy
          </Link>

          <Link 
          href="/contact" 
          className="px-3 sm:px-4 py-2 font-semibold text-transparent bg-clip-text 
            bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:opacity-80 transition-all duration-200 text-sm sm:text-base text-center 
            whitespace-nowrap"
          >
          Contact
          </Link>

          <Link 
          href="/about" 
          className="px-3 sm:px-4 py-2 font-semibold text-transparent bg-clip-text 
            bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:opacity-80 transition-all duration-200 text-sm sm:text-base 
            text-center whitespace-nowrap"
          >
          About
          </Link>

        </div>

        <p 
        className="text-xs sm:text-sm text-gray-500 text-center mt-4 lg:mt-0 whitespace-nowrap"
        >
        &copy; {new Date().getFullYear()} <span className="font-semibold">RiseBit</span>. All rights reserved.
        </p>
            
      </div>
      
    </footer>
  );
}