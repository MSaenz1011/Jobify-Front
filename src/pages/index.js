import Link from "next/link";
import Footer from "../components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <section>
        <h1 className='font-bold text-2xl lg:text-3xl text-black pb-8 mt-8 text-center'>
          Looking for a job?
        </h1>

        <div className='flex justify-evenly mt-10 mb-10'>
          <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-300 shadow-black'>
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>
                Jobify: Your best option
              </div>
              <p className='text-gray-700 text-base'>
                With a desirable catalogue, Jobify is a nice option to check all
                offers from the IT world. Give us a try, you will not be
                disappointed
              </p>
            </div>
          </div>

          <div className='max-w-sm rounded overflow-hidden shadow-lg bg-slate-300 shadow-black'>
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>Check the jobs</div>
              <p className='text-gray-700 text-base'>
                You can check the jobs we currently have, see if one of them is
                the one you are looking for
              </p>

              <Link
                href='/jobs'
                className='font-medium text-primary-600 underline underline-offset-1'
              >
                See all the Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
