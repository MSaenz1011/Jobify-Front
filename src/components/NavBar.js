import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <a href='/' className='text-white font-bold text-lg'>
              Jobify
            </a>
          </div>

          <div className='flex mx-auto'>
            <Link
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium'
              href='/'
            >
              Home
            </Link>
            <Link
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium'
              href='/jobs'
            >
              Jobs
            </Link>
          </div>

          <div className='flex'>
            <Link
              href='/login'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium'
            >
              Login
            </Link>
            <Link
              href='/signup'
              className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium'
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
