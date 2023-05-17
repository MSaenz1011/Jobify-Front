import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import NavBar from "@/components/NavBar";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [originalData, setOriginalData] = useState({});
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    image: null,
  });

  const { fullName, phone, city, image } = data;

  const handleChange = (event) => {
    const target = event.target;
    const value =
      target.type === "file" ? Array.from(target.files) : target.value;
    const name = target.name;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;
      fetchUserData(id);
    }
  }, []);

  console.log(data);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}`
      );
      const userData = response.data.data;

      setOriginalData({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        city: userData.city,
        image: userData.image,
      });
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className='border mt-10 border-gray-300 p-4 w-3/4 mx-auto '>
            <p>{originalData.fullName}</p>
            <p>{originalData.email}</p>
            <p>{originalData.phone}</p>
            <p>{originalData.city}</p>
          </div>
        );

      case "editProfile":
        return (
          <div className='border my-10 border-gray-300 p-4 w-3/4 mx-auto'>
            <form className='space-y-4 md:space-y-6'>
              <div>
                <label
                  hmtlFor='fullName'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Fullname
                </label>
                <input
                  type='text'
                  name='fullName'
                  value={fullName}
                  onChange={(event) => handleChange(event)}
                  id='fullName'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                />
              </div>

              <div>
                <label
                  hmtlFor='phone'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Phone
                </label>
                <input
                  type='text'
                  name='phone'
                  value={phone}
                  onChange={(event) => handleChange(event)}
                  id='phone'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>

              <div>
                <label
                  hmtlFor='city'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  value={city}
                  onChange={(event) => handleChange(event)}
                  id='city'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>

              <div>
                <label
                  hmtlFor='city'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Picture
                </label>

                <label className='relative inline-block'>
                  <span className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer'>
                    Select File
                  </span>
                  <input
                    type='file'
                    name='image'
                    accept='image/png, image/jpeg, image/jpg'
                    className='opacity-0 absolute inset-0 w-full h-full cursor-pointer'
                    onChange={(event) => handleChange(event)}
                  />
                </label>
              </div>

              <button
                type='submit'
                className='w-full text-black bg-cyan-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Update Info
              </button>
            </form>
          </div>
        );

      case "jobs":
        return (
          <div className='border mt-10 border-gray-300 p-4 w-3/4 mx-auto'></div>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <h1 className='text-center text-2xl font-bold mt-20'>User Dashboard</h1>
      <div className='flex justify-center mt-8'>
        <button
          className={`mx-2 p-2 border border-gray-500 rounded ${
            activeTab === "profile" ? "bg-gray-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`mx-2 p-2 border border-gray-500 rounded ${
            activeTab === "editProfile" ? "bg-gray-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("editProfile")}
        >
          Edit Profile
        </button>
        <button
          className={`mx-2 p-2 border border-gray-500 rounded ${
            activeTab === "bookings" ? "bg-gray-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs Applied
        </button>
      </div>
      {renderContent()}
    </React.Fragment>
  );
}
