import React, { useState } from "react";
import axios from "axios";
import PrivateRoute from "@/utils/privateRoute";
import JobDetails from "@/components/JobDetails";

const OfferApplicationPage = ({ jobData }) => {
  const [info, setInfo] = useState({
    candidateName: "",
    candidateEmail: "",
    candidateResume: "",
    candidatePhone: "",
    candidateLinkedIn: "",
    candidateEducation: "",
    candidateTechnologies: "",
    candidateSkills: "",
    candidatePDF: null,
  });

  const {
    candidateName,
    candidateEmail,
    candidateResume,
    candidatePhone,
    candidateLinkedIn,
    candidateEducation,
    candidateTechnologies,
    candidateSkills,
    candidatePDF,
  } = info;

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const numberRegex = /^[0-9]*$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: value,
    });
    console.log(info);
    console.log(file);
  };

  const handlePicture = (e) => {
    readFile(e.target.files[0]);
    setFile(e.target.files);
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!candidateName.trim()) {
      validationErrors.userName = "Please Enter Your Name";
    }

    if (!candidateEmail.trim()) {
      validationErrors.userEmail = "Please Enter Your Email";
    } else if (!emailRegex.test(candidateEmail.trim().replace(/\s+/g, ""))) {
      validationErrors.userEmail = "Enter a Valid Email";
    }

    if (!candidateResume.trim()) {
      validationErrors.userResume = "Enter your description";
    }

    if (!candidatePhone.trim()) {
      validationErrors.userPhone = "Please Enter Your Phone Number";
    } else if (!numberRegex.test(candidatePhone)) {
      validationErrors.userPhone = "Only Numbers are allowed";
    } else if (candidatePhone.trim().replace(/\s+/g, "").length !== 10) {
      validationErrors.userPhone = "Enter a 10 number digit";
    }

    if (!candidateLinkedIn.trim()) {
      validationErrors.userLinkedIn = "Field must no be empty";
    }

    if (!candidateEducation.trim()) {
      validationErrors.userEducation = "Field must no be empty";
    }
    if (!candidateTechnologies.trim()) {
      validationErrors.userTechnologies = "Field must no be empty";
    }
    if (!candidateSkills.trim()) {
      validationErrors.userSkills = "Field must no be empty";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const data = new FormData();
      data.append("Candidate PDF", file);
      for (let i = 0; i < file.length; i++) {
        data.append(`file ${i}`, file[i], file[i].name);
      }

      const response = await axios.post(
        "http://localhost:8080/test-formdata",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    }
  };

  return (
    <div className='flex flex-col'>
      <JobDetails jobData={jobData.data} />

      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto'>
        <div className=' bg-gray-500 rounded-lg  w-600 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Submit your info
            </h1>

            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='candidateName'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's Name
                </label>
                <input
                  type='text'
                  name='candidateName'
                  value={candidateName}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>

              {errors.userName && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userName}
                </span>
              )}

              <div>
                <label
                  for='candidateEmai'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's Email
                </label>
                <input
                  type='email'
                  name='candidateEmail'
                  value={candidateEmail}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                />
              </div>

              {errors.userEmail && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userEmail}
                </span>
              )}

              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's Resume
                </label>
                <textarea
                  name='candidateResume'
                  value={candidateResume}
                  onChange={handleChange}
                  placeholder='Explain yourself briefly'
                ></textarea>
              </div>

              {errors.userResume && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userResume}
                </span>
              )}

              <div>
                <label
                  for='candidatePhone'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's Phone
                </label>
                <input
                  type='text'
                  name='candidatePhone'
                  value={candidatePhone}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                />
              </div>
              {errors.userPhone && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userPhone}
                </span>
              )}

              <div>
                <label
                  for='candidateLinkedIn'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's LinkedIn
                </label>
                <input
                  type='text'
                  name='candidateLinkedIn'
                  value={candidateLinkedIn}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='If not, please put NA or related'
                />
              </div>
              {errors.userLinkedIn && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userLinkedIn}
                </span>
              )}

              <div>
                <label
                  for='candidateEducation'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's Education
                </label>
                <input
                  type='text'
                  name='candidateEducation'
                  value={candidateEducation}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Enter Your Level of Education'
                />
              </div>
              {errors.userEducation && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userEducation}
                </span>
              )}

              <div>
                <label
                  for='candidateTechnologies'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's Technologies
                </label>
                <input
                  type='text'
                  name='candidateTechnologies'
                  value={candidateTechnologies}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Use comas (JS, CSS, HTML)'
                />
              </div>
              {errors.userTechnologies && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userTechnologies}
                </span>
              )}

              <div>
                <label
                  for='candidateSkills'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate's Skills
                </label>
                <input
                  type='text'
                  name='candidateSkills'
                  value={candidateSkills}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Use comas (Critical Thinking, Algorithm, Logic)'
                />
              </div>
              {errors.userSkills && (
                <span className='inline-block mt-2 mb-4 px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-md animate-pulse'>
                  {errors.userSkills}
                </span>
              )}

              <div>
                <label
                  htmlFor='candidatePDF'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Candidate PDF
                </label>

                <label className='relative inline-block'>
                  <span className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer'>
                    Select File
                  </span>
                  <input
                    type='file'
                    name='file'
                    className='opacity-0 absolute inset-0 w-full h-full cursor-pointer'
                    onChange={handlePicture}
                  />
                </label>

                {file && <p className='text-sm text-gray-500'>{file.name}</p>}
              </div>

              <button
                type='submit'
                className='w-full text-black bg-cyan-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Apply to this job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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

export default PrivateRoute(OfferApplicationPage);
