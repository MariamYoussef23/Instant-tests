import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import React from "react";
import Header from "../components/Header";

const Home: NextPage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <Header />
      {/* <div className="px-10 py-10 flex flex-col text-center ">
        <h1 className="sm:text-6xl text-lg">
          Welcome
          {!user ? null : ` ${user.user_metadata.firstName}`}
        </h1>
      </div> */}

      <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Stop wasting time! </span>{" "}
            <span className="block text-indigo-600 xl:inline">
              Create a new Test now.
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            With Instant test, you will not need to spend countless hours
            scrolling through thousands of questions. Let us handel that for
            you. Start now and create a new test in no time.
          </p>

          {!user ? (
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow m-10">
                <a
                  href="login"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-full shadow-2xl m-10">
                <a
                  href="#"
                  className="flex rounded-full w-full items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  create a new test
                </a>
              </div>
              <div className="rounded-full shadow-2xl m-10">
                <a
                  href="#"
                  className="flex rounded-full w-full items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  View test bank
                </a>
              </div>
              <div className="rounded-full shadow-2xl m-10">
                <a
                  href="#"
                  className="flex rounded-full w-full items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                >
                  Your Test History
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
