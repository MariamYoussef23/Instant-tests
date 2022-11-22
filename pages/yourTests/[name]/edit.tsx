import React, { ReactElement, useEffect, useState } from "react";
import Header from "../../../components/Header";
import DraftTest from "../../../components/newTestPage/DraftTest";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { clearTest, testQuestions } from "../../../redux/testSlice";
import { editTest } from "../../../utils/apiFunctions";
import { clearOptions } from "../../../redux/optionsSlice";

interface Props {}

function edit({}: Props): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(testQuestions);
  const [newTitle, setNewTitle] = useState(``);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (!router.isReady) return;
    const { name } = router.query;
    setNewTitle(`${name}`);
    setTitle(`${name}`);
  }, [router.isReady]);
  console.log(router.query);

  const values = { questions, newTitle, title };
  console.log(values);

  const handleSaveChanges = () => {
    //save changes in database (api)
    editTest(values);
    dispatch(clearTest());
    dispatch(clearOptions());
    router.push("/yourTests");
  };

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
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            />
          </div>
        </div>
        <DraftTest />
      </div>
      <div className="flex justify-end mr-10 mb-3">
        <button
          type="button"
          className="rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => handleSaveChanges()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default edit;
