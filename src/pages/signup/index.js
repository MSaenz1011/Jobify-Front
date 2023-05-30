import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SignUpForm from "@/components/SignUpForm";
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

        setIsAccountCreated(true);

        setTimeout(() => {
          setIsAccountCreated(false);
        }, 4000);
      } catch (error) {
        console.error(error);
      }
    };

    if (Object.keys(validationErrors).length === 0) {
      createUserDB();
      setUserData({ fullName: "", email: "", password: "" });
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <SignUpForm
        fullName={fullName}
        email={email}
        password={password}
        errors={errors}
        isAccountCreated={isAccountCreated}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </React.Fragment>
  );
}
