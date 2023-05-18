import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MainPage from "@/components/MainPage";

export default function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <MainPage />
      <Footer />
    </React.Fragment>
  );
}
