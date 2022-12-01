import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next/types";
import React, { ReactElement, useEffect } from "react";
import Header from "../../../components/Header";
import { prisma } from "../../../lib/prisma";
import { useAppDispatch } from "../../../redux/hooks";
import { clearTest, editTestInitial } from "../../../redux/testSlice";

interface Props {
  test: any;
}

function Test({ test }: Props): ReactElement {
  console.log(test);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const setEditState = () => {
    var testQuestions: any = [];
    const questions = test.questions.map((x: any) => {
      var question = x.question;
      question.questionNo = x.questionNo;
      testQuestions = [...testQuestions, question];
    });
    dispatch(clearTest());
    dispatch(editTestInitial(testQuestions));
    router.push(`/yourTests/${test.name}/edit`);
  };

  const setPrintState = () => {
    var testQuestions: any = [];
    const questions = test.questions.map((x: any) => {
      var question = x.question;
      question.questionNo = x.questionNo;
      testQuestions = [...testQuestions, question];
    });
    dispatch(clearTest());
    dispatch(editTestInitial(testQuestions));
    router.push(`/yourTests/${test.name}/pdfPrint`);
  };

  const user = useUser();

  // useEffect(() => {
  //   !user && router.push("/login");
  // }, []);

  return (
    <div>
      <Header />
      <div className="pt-10">
        <h3 className=" grid justify-items-center top-24 uppercase tracking-[10px] text-2xl m-10 ">
          {test.name}
        </h3>
      </div>

      <div className="pr-10 flex justify-end ">
        <button
          type="button"
          className="mr-5 justify-self-end items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setPrintState()}
        >
          Print view
        </button>
        <button
          type="button"
          className="ml-5 justify-self-end items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setEditState()}
        >
          Edit test
        </button>
      </div>
      <div className="m-10 ">
        {test.questions.length === 0 && (
          <p className="border rounded-3xl mt-5 overflow-hidden bg-white text-center text-lg  shadow ">
            No Questions On Test
          </p>
        )}
        {test.questions.map((question: any, indx: any) => (
          <div className="p-3 border-b m-3" key={indx}>
            <div className="flex">
              <h2 className="">{`${question.questionNo}) `} </h2>
              <h2 className="underline ml-1">
                {` ${question.question.question}`}{" "}
              </h2>
            </div>
            <ol className="pl-10">
              <li className="p-1">A) {question.question.firstA}</li>
              <li className="p-1">B) {question.question.secondA}</li>
              <li className="p-1">C) {question.question.thirdA}</li>
              <li className="p-1">D) {question.question.fourthA}</li>
              <li className="p-1">E) {question.question.fifthA}</li>
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const tests = await prisma.test.findMany();

//   const paths = tests!.map((test: any) => {
//     return {
//       params: { name: test.name },
//     };
//   });

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const name: any = params?.name!;

//   const testQuestions = await prisma.test.findUnique({
//     where: { name },
//     include: {
//       questions: {
//         include: {
//           question: true,
//         },
//       },
//     },
//   });

//   return {
//     props: {
//       test: JSON.parse(JSON.stringify(testQuestions)),
//     },
//     revalidate: 10,
//   };
// };

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(context: any) {
    // const name: any = params?.name!;
    const name = context!.params.name;

    const testQuestions = await prisma.test.findUnique({
      where: { name },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
      },
    });

    return {
      props: {
        test: JSON.parse(JSON.stringify(testQuestions)),
      },
    };
  },
});
