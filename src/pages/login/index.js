import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import LoginForm from "@/components/LoginForm";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function LoginMain() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { email, password } = userData;
  const router = useRouter();

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};

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

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/signin",
          { email, password }
        );
        const { data } = response.data;

        Cookies.set("token", data.token, { expires: 1 });

        router.push("/");
      } catch (error) {
        console.log("Wrong email or password");
      }
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <LoginForm
        email={email}
        password={password}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </React.Fragment>
  );
}
