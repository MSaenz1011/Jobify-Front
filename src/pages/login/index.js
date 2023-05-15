import Link from "next/link";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";
import { useState } from "react";

export default function LoginMain() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  return (
    <React.Fragment>
      <NavBar />
      <section className='bg-slate-500'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Log in to your account
              </h1>
              <form className='space-y-4 md:space-y-6' action='#'>
                <div>
                  <label
                    hmtlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required=''
                  />
                </div>
                <div>
                  <label
                    hmtlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                  />
                </div>

                <button
                  type='submit'
                  className='w-full text-black bg-cyan-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Log in
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{" "}
                  <Link
                    className='font-medium text-primary-600 underline underline-offset-1'
                    href='/signup'
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
