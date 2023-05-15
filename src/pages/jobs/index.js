import React from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function Jobs({ dataJobs }) {
  return (
    <React.Fragment>
      <NavBar />
      <h1>Avaiable Jobs </h1>
      <div className='flex flex-wrap justify-center'>
        {dataJobs.data.map((item) => {
          return (
            <Link href={`/jobs/${item._id}`} key={item._id}>
              <div className='m-4 p-4 max-w-sm rounded-md shadow-md bg-white'>
                <div className='h-48'>
                  <Image
                    src={item.img}
                    width={350}
                    height={300}
                    className='h-full object-cover rounded-md'
                  />
                </div>
                <div className='mt-4'>
                  <h2 className='text-xl font-semibold'>{item.title}</h2>
                  <p className='mt-2 text-gray-600'>
                    {item.company}, {item.country}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const apiJobs = await fetch("http://localhost:8080/api/jobs", {
    method: "GET",
  });

  const dataJobs = await apiJobs.json();

  return {
    props: {
      dataJobs,
    },
  };
}
