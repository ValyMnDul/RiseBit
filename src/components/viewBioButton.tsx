'use client';

export default function ViewBioButton({ bio }: { bio: string }) {
    return (
        <button
        className="px-4 py-2 rounded-xl font-semibold 
            border border-indigo-400 text-indigo-500
            hover:bg-linear-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
            hover:text-white hover:border-transparent
            transition-all duration-300 cursor-pointer"        
        onClick={() => alert(bio || "No bio available")}
        >
            View Bio
        </button>
    );
}
