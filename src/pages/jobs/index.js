import React from "react";
import Footer from "@/components/Footer";
import JobItem from "@/components/JobItem";
import NavBar from "@/components/NavBar";
import axios from "axios";

export default function Jobs({ dataJobs }) {
  return (
    <React.Fragment>
      <NavBar />
      <h1 className='font-bold text-2xl lg:text-3xl text-black pb-8 mt-8 text-center'>
        Available Jobs
      </h1>
      <div className='flex flex-wrap justify-center mb-10'>
        {dataJobs.data.map((item) => (
          <JobItem key={item._id} job={item} />
        ))}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get("http://localhost:8080/api/jobs");
    const dataJobs = response.data;

    return {
      props: {
        dataJobs,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        dataJobs: null,
      },
    };
  }
}
