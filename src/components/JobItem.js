import React from "react";
import Image from "next/image";
import Link from "next/link";

const JobItem = ({ job }) => {
  return (
    <Link href={`/jobs/${job._id}`} key={job._id}>
      <div className='m-4 p-4 max-w-sm rounded-md shadow-md bg-gray-400'>
        <div className='h-48'>
          <Image
            src={job.img}
            width={350}
            height={300}
            className='h-full object-cover rounded-md'
          />
        </div>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold'>{job.title}</h2>
          <p className='mt-2 text-gray-600'>
            {job.company}, {job.country}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
