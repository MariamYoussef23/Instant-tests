import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import React, { ReactElement, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Header from "../../../components/Header";
import { useAppSelector } from "../../../redux/hooks";
import { clearTest, testQuestions } from "../../../redux/testSlice";

interface Props {}

function PdfPrint({}: Props): ReactElement {
  const questions = useAppSelector(testQuestions);
  const { query } = useRouter();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${query.name}`,
  });

  const current = new Date();
  const day = current.getDate();
  const month = current.getMonth() + 1;
  const year = current.getFullYear();
  const date = `${day < 10 ? `0${day}` : `${day}`}/${
    month < 10 ? `0${month}` : `${month}`
  }/${year}`;

  return (
    <>
      <Header />
      <div className="border-b">
        <button
          className="m-5 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => handlePrint()}
        >
          Print
        </button>
      </div>

      <div
        ref={componentRef}
        style={{ height: window.innerHeight }}
        className="m-10  "
      >
        <table className="page-container">
          <thead className="page-header">
            <tr>
              <th>
                {/* Header  */}
                <div className=" mt-10 grid grid-rows-4 grid-flow-col border ">
                  <div className="row-span-4 col-span-1 border text-center p-3">
                    Logo{" "}
                  </div>
                  <div className="row-span-4 col-span-2 border text-center p-3">
                  {query.name}
                  </div>
                  <div className="col-span-1 row-span-2 border pl-2">
                    Econ - 101
                  </div>
                  <div className="col-span-1 row-span-2 border pl-2">
                    Issue Date: {date}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* printed content */}
                <div className="m-10">
                  {/* <p className="m-5">
                    Kindly answer the following questions, using the attached
                    answer sheet. Do not write on this paper.
                  </p> */}

                  <div>
                    {questions.map((question: any, indx: any) => (
                      <div className="content p-3  m-3" key={indx}>
                        <div className="flex">
                          <h2 className="font-bold">
                            {`${question.questionNo}- `}{" "}
                          </h2>
                          <h2 className="font-bold ml-1">
                            {` ${question.question}`}{" "}
                          </h2>
                        </div>
                        <ol className="pl-10">
                          <li className="p-1">A. {question.firstA}</li>
                          <li className="p-1">B. {question.secondA}</li>
                          <li className="p-1">C. {question.thirdA}</li>
                          <li className="p-1">D. {question.fourthA}</li>
                          <li className="p-1">E. {question.fifthA}</li>
                        </ol>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PdfPrint;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
