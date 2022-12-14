import { useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import HomeHeader from "../components/HomeHeader";

const Home: NextPage = () => {
  const user = useUser();
  const router = useRouter();

  return (
    <div>
      <HomeHeader />

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
                <div
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  onClick={() => router.push("/login")}
                >
                  Get Started
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-full shadow-2xl m-10">
                <div
                  className="flex rounded-full w-full items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  onClick={() => router.push("/newTest")}
                >
                  create a new test
                </div>
              </div>
              <div className="rounded-full shadow-2xl m-10">
                <div
                  className="flex rounded-full w-full items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  onClick={() => router.push("/testBank")}
                >
                  View test bank
                </div>
              </div>
              <div className="rounded-full shadow-2xl m-10">
                <div
                  className="flex rounded-full w-full items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                  onClick={() => router.push("/yourTests")}
                >
                  Your Test History
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
