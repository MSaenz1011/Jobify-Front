import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";

export default function NavBar() {
  const [fullName, setFullName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;
      fetchUserData(id);
      setLoggedIn(true);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}`
      );
      const userData = response.data.data;

      setFullName(userData.fullName);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setLoggedIn(false);
    router.push("/");
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
            {loggedIn ? (
              <div
                className='text-gray-300  hover:text-white px-3 py-2 rounded-md font-medium cursor-pointer'
                onMouseEnter={handleToggleDropdown}
                onMouseLeave={handleToggleDropdown}
              >
                Hello {fullName}
                {isDropdownOpen && (
                  <div className='absolute top-15 right-0 bg-white w-48 p-2 rounded shadow'>
                    <Link
                      href='/dashboard'
                      className='text-gray-800 hover:bg-gray-200 block px-4 py-2'
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='text-gray-800 hover:bg-gray-200 block px-4 py-2'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
