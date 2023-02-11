import React, { ReactElement } from "react";
import Header from "../../components/Header";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { getAllTests } from "../../utils/apiFunctions";
import { useRouter } from "next/router";
import { prisma } from "../../lib/prisma";

interface Props {
  tests: [
    {
      id: number;
      name: string;
      updatedAt: string;
    }
  ];
}

function YourTests({ tests }: Props): ReactElement {
  console.log(tests);
  const router = useRouter();

  const update = new Date(tests[0].updatedAt).getDate();
  // const day = update.getDate() ;
  // const month = update.getMonth() + 1;
  // const year = update.getFullYear() ;
  console.log(update);

  return (
    <div>
      <Header />
      <div className="pt-10">
        <h3 className=" grid justify-items-center top-24 uppercase tracking-[10px] text-2xl m-10 ">
          Your Tests
        </h3>
      </div>

      <ul
        role="list"
        className="p-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tests.map((test) => (
          <li
            key={test.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white drop-shadow-2xl "
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6 ">
              <div className="flex-1 text-sm divide-y">
                <div className="flex space-x-3 ">
                  <h1 className="font-bold"> Title: </h1>
                  <h2>{test.name}</h2>
                </div>
                <div className="flex space-x-3">
                  <h1 className="font-bold  ">Last Update:</h1>
                  <h2>
                    
                    {new Date(test.updatedAt).getDate()} -
                    {new Date(test.updatedAt).getMonth() + 1} -
                    {new Date(test.updatedAt).getFullYear()}
                  </h2>
                </div>
              </div>
            </div>

            <div>
              <div className="-mt-px flex justify-items-end">
                <button
                  type="button"
                  className="drop-shadow-2xl m-3   items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => router.push(`/yourTests/${test.name}`)}
                >
                  view
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourTests;

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps() {
    // const tests = await getAllTests();
    const res = await prisma.test.findMany();

    //json.parse(json.stringify(createdAt))

    // const tests = res.map((test) => {
    //   return {
    //     ...test,
    //     createdAt: JSON.parse(JSON.stringify(test.createdAt)),
    //     updatedAt: JSON.parse(JSON.stringify(test.updatedAt)),
    //   };
    // });

    return {
      props: {
        tests: JSON.parse(JSON.stringify(res)),
      },
    };
  },
});
