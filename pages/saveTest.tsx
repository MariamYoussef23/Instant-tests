import { useUser } from "@supabase/auth-helpers-react";
import router, { NextRouter, useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import Header from "../components/Header";
import DraftTest from "../components/newTestPage/DraftTest";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearOptions } from "../redux/optionsSlice";
import { clearTest, testQuestions } from "../redux/testSlice";
import { createNewTest } from "../utils/apiFunctions";

interface Props {}

function SaveTest({}: Props): ReactElement {
  const user = useUser();
  const dispatch = useAppDispatch();
  const router: NextRouter = useRouter();

  const questions = useAppSelector(testQuestions);

  const [title, setTitle] = useState("");

  const values = { user: user?.id, questions, title };

  const handleSaveTest = () => {
    if (title === "") {
      alert("please enter a title for the test");
    } else {
      createNewTest(values);
      dispatch(clearTest());
      dispatch(clearOptions());
      router.push("/yourTests");
    }
  };

  return (
    <div>
      <Header />
      <div className="pt-10">
        <h3 className=" grid justify-items-center top-24 uppercase tracking-[10px] text-2xl m-10 ">
          Save new Test
        </h3>

        <form className="space-y-8  mx-10  ">
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 border p-2 rounded-xl border-black-100">
            <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Final Step
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Add a title to the new Test.
                </p>
              </div>

              <div className=" p-3 md:mr-10 md:ml-10">
                <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    htmlFor="name"
                    className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
                  >
                    Test Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
              <div className="space-y-6 sm:space-y-5  ">
                <DraftTest />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => router.push("/newTest")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => handleSaveTest()}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaveTest;
