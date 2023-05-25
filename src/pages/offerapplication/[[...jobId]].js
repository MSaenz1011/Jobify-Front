import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

const OfferApplicationPage = ({ jobData }) => {
  const [info, setInfo] = useState({
    candidateName: "",
    candidateEmail: "",
    candidateResume: "",
    candidatePhone: "",
    candidateLinkedIn: "",
    candidateEducation: "",
    candidateTechologies: "",
    candidateIntentions: "",
    candidatePDF: "",
  });

  const {
    candidateName,
    candidateEmail,
    candidateResume,
    candidatePhone,
    candidateLinkedIn,
    candidateEducation,
    candidateTechologies,
    candidateIntentions,
    candidatePDF,
  } = info;

  return (
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
        <div className='bg-slate-300 rounded-lg p-6 max-w-md'>
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
    </section>
  );
};

export async function getServerSideProps({ params }) {
  const jobId = params.jobId;

  try {
    const response = await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
    const jobData = response.data;

    return {
      props: {
        jobData,
        jobId,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        jobData: null,
        jobId,
      },
    };
  }
}

export default OfferApplicationPage;
