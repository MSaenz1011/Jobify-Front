import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import PrivateRoute from "@/utils/privateRoute";
import OfferDetail from "@/components/OfferDetail";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPicUpdated, setIsPicUpdated] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [userId, setUserId] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);

  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    image: null,
  });

  const { fullName, phone, city, image } = data;
  const [offers, setOffers] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState({});
  const numberRegex = /^[0-9]*$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleClick = (offer) => {
    setSelectedOffer(offer);
  };

  const handlePicture = (e) => {
    readFile(e.target.files[0]);
    setFile(e.target.files);
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const updateInfo = () => {
    const validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.userName = "Please Enter Your Name";
    }

    if (!phone.trim()) {
      validationErrors.userPhone = "Please Enter Your Phone Number";
    } else if (!numberRegex.test(phone)) {
      validationErrors.userPhone = "Only Numbers are allowed";
    } else if (phone.trim().replace(/\s+/g, "").length !== 10) {
      validationErrors.userPhone = "Enter a 10 number digit";
    }

    if (!city.trim()) {
      validationErrors.userCity = "Please Enter a City";
    }
    setErrors(validationErrors);

    const updateUser = async () => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/user/${userId}`,
          { fullName, phone, city }
        );
        setIsUpdated(true);

        setTimeout(() => {
          setIsUpdated(false);
        }, 4000);
      } catch (error) {
        console.error(error);
      }
    };

    if (Object.keys(validationErrors).length === 0) {
      updateUser();
      setData({ fullName: "", phone: "", city: "" });
    }
  };

  const updateFile = async () => {
    const validatePicture = {};
    if (!file || file.length <= 0) {
      validatePicture.userImage = "Upload a file";
    }

    setFileError(validatePicture);

    if (Object.keys(validatePicture).length === 0) {
      const data = new FormData();
      data.append("fullName", fullName);

      for (let i = 0; i < file.length; i++) {
        data.append(`file:${i}`, file[i], file[i].name);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/test-formdata`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newURL = response.data["file:0"];
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/user/${userId}`,
        {
          image: newURL,
        }
      );

      setIsPicUpdated(true);
      setTimeout(() => {
        setIsPicUpdated(false);
      }, 4000);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const { id } = decodedToken;
      fetchUserData(id);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/user/${userId}`
      );
      const userData = response.data.data;

      setOriginalData({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        city: userData.city,
        image: userData.image,
      });
      setOffers(userData.offers);
      setUserId(userId);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className='border mt-10 mb-24 border-gray-300 p-4 w-3/4 mx-auto flex'>
            <div className='flex-1'>
              <div>
                <h2 className='text-xl font-bold'>Username</h2>
                <p>{originalData.fullName}</p>
                <h2 className='text-xl font-bold'>User's Email</h2>
                <p>{originalData.email}</p>
                <h2 className='text-xl font-bold'>User's Phone</h2>
                {originalData.phone ? (
                  <p>{originalData.phone}</p>
                ) : (
                  <p>No Phone Registered</p>
                )}
                <h2 className='text-xl font-bold'>City</h2>
                {originalData.city ? (
                  <p>{originalData.city}</p>
                ) : (
                  <p>No City Registered</p>
                )}
              </div>
            </div>
            <div className='flex-1 flex justify-center'>
              <div className='max-w-sm'>
                <h2 className='text-xl font-bold'>Profile Pic</h2>
                <div className='w-40 h-40 rounded-full overflow-hidden mt-2'>
                  {originalData.image ? (
                    <Image
                      src={originalData.image}
                      width={350}
                      height={300}
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    <Image
                      src='https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-0.jpg'
                      width={350}
                      height={300}
                      className='object-cover w-full h-full'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "editProfile":
        return (
          <div className='border mt-10 mb-24 border-gray-300 p-4 w-3/4 mx-auto flex'>
            <div className='w-1/2 pr-4'>
              <div>
                <label
                  htmlFor='fullName'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Username
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

              {errors.userName && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userName}
                </span>
              )}

              <div>
                <label
                  htmlFor='phone'
                  className='block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white'
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

              {errors.userPhone && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userPhone}
                </span>
              )}

              <div>
                <label
                  htmlFor='city'
                  className='block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white'
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

              {errors.userCity && (
                <span className='inline-block mt-2 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userCity}
                </span>
              )}

              <button
                onClick={updateInfo}
                type='submit'
                className='w-full mt-5 text-black bg-cyan-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Update Info
              </button>

              {isUpdated && (
                <div className='bg-green-100 text-center text-green-900 px-4 py-3 rounded-md my-4'>
                  Info Updated!!
                </div>
              )}
            </div>

            <hr className='border-gray-300 my-auto h-52 border-solid border-l-2' />

            <div className='w-1/2 pl-4 flex flex-col justify-center items-center'>
              <div>
                <label
                  htmlFor='picture'
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
                    name='file'
                    accept='image/png, image/jpeg, image/jpg'
                    className='opacity-0 absolute inset-0 w-full h-full cursor-pointer'
                    onChange={handlePicture}
                  />
                </label>
              </div>

              <button
                onClick={updateFile}
                type='submit'
                className='w-40 mt-5 text-black bg-cyan-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Update Picture
              </button>

              {fileError.userImage && (
                <span className='inline-block mt-2 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {fileError.userImage}
                </span>
              )}

              {isPicUpdated && (
                <div className='bg-green-100 text-center text-green-900 px-4 py-3 rounded-md my-4'>
                  Profile Picture Updated!!
                </div>
              )}
            </div>
          </div>
        );

      case "jobs":
        return (
          <React.Fragment>
            {offers.length > 0 ? (
              <OfferDetail
                offers={offers}
                selectedOffer={selectedOffer}
                handleClick={handleClick}
              />
            ) : (
              <h2 className='text-center text-2xl font-bold mt-10'>
                No applications at the moment
              </h2>
            )}
          </React.Fragment>
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

export default PrivateRoute(UserDashboard);
