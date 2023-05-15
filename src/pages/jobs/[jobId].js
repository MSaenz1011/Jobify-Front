import React from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const JobId = ({ jobData }) => {
  return (
    <React.Fragment>
      <NavBar />
      <h1>{jobData.description}</h1>

      <Footer />
    </React.Fragment>
  );
};

export default JobId;

export async function getServerSideProps({ params }) {
  const jobId = params.jobId;
  const apiJobs = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
    method: "GET",
  });

  const jobData = await apiJobs.json();

  return {
    props: {
      jobData,
    },
  };
}
