import React, { ReactElement } from "react";
import SignupForm from "../components/signupForm";

interface Props {}

function signup({}: Props): ReactElement {
  return (
    <div>
      <>
        <div className="flex min-h-screen">
          <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                {/* <img
                  className="h-12 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                /> */}
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                  Create a new account
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <SignupForm />
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="./1.jpeg"
              alt=""
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default signup;
