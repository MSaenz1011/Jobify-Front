import Link from "next/link";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React, { useState } from "react";
import axios from "axios";

export default function SignUpMain() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { fullName, email, password } = userData;
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.userName = "Please Enter Your Name";
    }

    if (!email.trim()) {
      validationErrors.userEmail = "Please Enter Your Email";
    } else if (!emailRegex.test(email.trim().replace(/\s+/g, ""))) {
      validationErrors.userEmail = "Enter a Valid Email";
    }

    if (!password.trim()) {
      validationErrors.userPassword = "Please Enter Your Password";
    } else if (!passwordRegex.test(password.trim().replace(/\s+/g, ""))) {
      validationErrors.userPassword =
        "Password Must Have This: 8 characters, a number, one uppercase letter and one lowercase letter";
    }

    setErrors(validationErrors);

    const createUserDB = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/user/signup",
          userData
        );

        console.log("Response received:", res.data);
        setIsAccountCreated(true);

        setTimeout(() => {
          setIsAccountCreated(false);
        }, 4000);
      } catch (error) {
        console.error(error);
      }
    };

    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitting form data...");
      createUserDB();
      setUserData({ fullName: "", email: "", password: "" });
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <section className='bg-slate-500'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Sign up today
              </h1>

              <form
                className='space-y-4 md:space-y-6'
                action='#'
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your Name
                  </label>
                  <input
                    type='text'
                    name='fullName'
                    value={fullName}
                    onChange={(event) => handleChange(event)}
                    id='fullName'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required=''
                  />
                </div>
                {errors.userName && (
                  <span className='inline-block mt-2 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                    {errors.userName}
                  </span>
                )}

                <div>
                  <label
                    for='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(event) => handleChange(event)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required=''
                  />
                </div>
                {errors.userEmail && (
                  <span className='inline-block mt-2 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                    {errors.userEmail}
                  </span>
                )}

                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={(event) => handleChange(event)}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                  />
                </div>

                {errors.userPassword && (
                  <span className='inline-block mt-2 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                    {errors.userPassword}
                  </span>
                )}

                <button
                  type='submit'
                  className='w-full text-black bg-cyan-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Sign Up
                </button>

                {isAccountCreated && (
                  <div className='bg-green-100 text-green-900 px-4 py-3 rounded-md my-4'>
                    Account created successfully!
                  </div>
                )}
              </form>

              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{" "}
                <Link
                  className='font-medium text-primary-600 underline underline-offset-1'
                  href='/login'
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
