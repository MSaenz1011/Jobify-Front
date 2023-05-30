import React from "react";
import Image from "next/image";

export default function OfferDetail({ offers, handleClick, selectedOffer }) {
  return (
    <div className='border m-10 border-gray-300 p-4 w-3/4 mx-auto'>
      {offers.map((offer, index) => (
        <button
          key={index}
          onClick={() => handleClick(offer)}
          className='block w-full bg-blue-500 hover:bg-blue-700 text-white mx-auto font-bold py-2 px-4 mb-4'
        >
          {offer.title}
        </button>
      ))}
      {selectedOffer && (
        <React.Fragment>
          <h2 className='text-2xl mb-10 text-center font-bold'>
            Details of the company
          </h2>
          <div className='grid grid-cols-2 gap-4 mb-10'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-col items-center'>
                <h3 className='text-xl font-bold'>Name of the company</h3>
                <p>{selectedOffer.company}</p>
                <h3 className='text-xl font-bold'>Country of the company</h3>
                <p>{selectedOffer.country}</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div>
                <h3 className='text-xl font-bold'>Job Offer Logo</h3>
                <Image
                  src={selectedOffer.img}
                  width={350}
                  height={300}
                  className='h-full object-cover rounded-md'
                  alt='Job Image'
                />
              </div>
            </div>
          </div>

          <div className='border-b-4 m-2'></div>

          <div>
            <h2 className='text-2xl text-center font-bold'>
              Info Provided by the Candidate
            </h2>
            <div className='grid grid-cols-3 gap-4 mt-4'>
              <div>
                <h3 className='text-xl font-bold'>Candidate's Name</h3>
                <p>{selectedOffer.candidateName}</p>
              </div>
              <div>
                <h3 className='text-xl font-bold'>Candidate's Phone</h3>
                <p>{selectedOffer.candidatePhone}</p>
              </div>
              <div>
                <h3 className='text-xl font-bold'>Candidate's Resume</h3>
                <p>{selectedOffer.candidateResume}</p>
              </div>
              <div>
                <h3 className='text-xl font-bold'>Candidate's LinkedIn</h3>
                <p>{selectedOffer.candidateLinkedIn}</p>
              </div>
              <div>
                <h3 className='text-xl font-bold'>Candidate's Skills</h3>
                <p>{selectedOffer.candidateSkills}</p>
              </div>
              <div>
                <h3 className='text-xl font-bold'>Candidate's Technologies</h3>
                <p>{selectedOffer.candidateTechnologies}</p>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <h3 className='text-2xl text-center font-bold'>Candidate's CV</h3>
              <button
                onClick={() =>
                  window.open(selectedOffer.candidatePDF, "_blank")
                }
                className='text-blue-500 underline'
              >
                Open CV in new tab
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
