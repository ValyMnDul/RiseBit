'use client'
import React from 'react'

export default function Loading() {

  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-center 
    bg-transparent bg-opacity-75"
    >
      <div 
      className="mb-15 flex flex-1 flex-col items-center justify-center w-full 
      h-full bg-transparent select-none"
      >
        <div 
        className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
        >
          <div 
          className="absolute inset-0 rounded-full border-4 border-transparent 
          border-t-indigo-500 border-r-pink-500 animate-spin"
          ></div>

          <div 
          className="absolute inset-1 rounded-full bg-linear-to-r from-indigo-500 
          via-purple-500 to-pink-500 opacity-10"
          ></div>

        </div>

        <h1 
        className="mt-3 sm:mt-5 md:mt-6 text-xl sm:text-2xl md:text-3xl font-extrabold 
        bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text 
        text-transparent drop-shadow-md tracking-wide animate-pulse"
        >
          Loading...
        </h1>
        
      </div>
    </div>
  )
}