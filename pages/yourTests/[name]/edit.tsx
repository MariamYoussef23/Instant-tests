import React, { ReactElement, useState } from "react";
import Header from "../../../components/Header";
import DraftTest from "../../../components/newTestPage/DraftTest";

interface Props {}

function edit({}: Props): ReactElement {
  const [title, setTitle] = useState("");

  return (
    <div>
      <Header />
      <div className="pt-10">
        <h3 className=" grid justify-items-center top-24 uppercase tracking-[10px] text-2xl m-10 ">
          Edit Test
        </h3>
      </div>
      <div className="m-10 border rounded-3xl divide-y">
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
        <DraftTest />
      </div>
    </div>
  );
}

export default edit;
