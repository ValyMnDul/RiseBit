import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Main() {
  return (
    <div 
    className="flex flex-col min-h-screen bg-linear-to-b from-white 
    via-blue-50 to-white"
    >
      <Navbar />

      <main 
      className="border-t border-gray-200 flex-1 flex flex-col items-center 
      justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center"
      >
        <div 
        className="max-w-5xl mx-auto w-full"
        >
          <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
          text-center leading-tight"
          >
            <span 
            className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 
            via-purple-600 to-pink-600 drop-shadow-sm"
            >
              RiseBit
            </span>

            <br/>

            where ideas&nbsp;

            <span 
            className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 
            via-cyan-500 to-sky-400 drop-shadow-sm"
            >
              rise
            </span> 

          </h1>

          <p 
          className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-2xl 
          mx-auto px-4"
          >
            A social space built around real connections. Share ideas with people who 
            &nbsp;
            <span
            className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 
            via-purple-600 to-pink-600 drop-shadow-sm"
            >
              care
            </span>.
          </p>

          <div 
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4" 
          >
            <Link
            href="/login"
            className="flex justify-center items-center text-center px-8 sm:px-10 py-3 
            sm:py-4 font-semibold rounded-xl text-white bg-linear-to-r from-indigo-500 
            via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/30 
            hover:shadow-pink-500/40 transition-all duration-300 hover:scale-105 
            active:scale-95"
            >
              Get Started
            </Link>

            <Link
            href="/feed"
            className="flex justify-center items-center text-center relative rounded-xl 
            p-px bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
            hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span 
              className="block bg-white rounded-[inherit] px-8 sm:px-10 py-3 sm:py-4 
              text-center w-full"
              >
                <span 
                className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                bg-clip-text text-transparent font-semibold"
                >
                  Explore Feed
                </span>

              </span>

            </Link>

          </div>

        </div>

        <div 
        className="mt-12 sm:mt-16 md:mt-20 text-gray-500 text-base 
        sm:text-lg font-medium px-4"
        >
          Small connections create 
          <span 
          className="bg-linear-to-r from-indigo-500 via-purple-500 
          to-pink-500 bg-clip-text text-transparent font-semibold"
          >
            &nbsp;
            big changes.
          </span>

        </div>

      </main>

      <Footer />

    </div>
  );
}