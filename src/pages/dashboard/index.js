import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function UserDashboard() {
  return (
    <React.Fragment>
      <NavBar />
      <h1>incoming User Profile</h1>
      <Footer />
    </React.Fragment>
  );
}
