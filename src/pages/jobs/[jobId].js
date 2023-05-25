import React from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";

const JobId = ({ jobData }) => {
  const handleApply = () => {
    if (jobData.data.availability) {
      Router.push(`/offerapplication/${jobData.id}`);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <section className='flex flex-col items-center'>
        <div className='m-10 p-4 max-w-sm  rounded-md shadow-md bg-slate-400 h-[300px]'>
          <div className='h-48'>
            <Image
              src={jobData.data.img}
              width={350}
              height={300}
              className='h-full object-cover rounded-md'
            />
          </div>
          <div className='mt-4'>
            <h2 className='text-xl font-semibold'>{jobData.data.title}</h2>
            <p className='mt-2 text-gray-600'>
              {jobData.data.company}, {jobData.data.country}
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center max-w-sm m-20'>
          <div className='bg-slate-300 rounded-lg p-4 max-w-md'>
            <h1 className='text-3xl font-bold mb-4 text-center '>
              Job description:
            </h1>
            <h2 className='text-xl  mb-4'>{jobData.data.description}</h2>
            <div className='mb-6'>
              <h2 className='text-lg font-bold mb-2'>Qualifications:</h2>
              <ul className='list-outside marker:text-green list-disc ml-6'>
                {jobData.data.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className='text-lg font-bold mb-2'>Requires:</h2>
              <ul className='list-outside marker:text-green list-disc ml-6'>
                {jobData.data.requires.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='flex justify-center mb-10'>
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              jobData.data.availability
                ? "bg-blue-500  hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-400"
            }`}
            onClick={handleApply}
            disabled={!jobData.data.availability}
          >
            {jobData.data.availability ? "Apply now" : "Application Closed"}
          </button>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
};

export default JobId;

export async function getServerSideProps({ params }) {
  const jobId = params.jobId;

  try {
    const response = await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
    const jobData = response.data;

    // Add the jobId to the jobData object
    jobData.id = jobId;

    return {
      props: {
        jobData,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        jobData: null,
      },
    };
  }
}
