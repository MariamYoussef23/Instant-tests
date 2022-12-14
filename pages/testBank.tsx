import React, { ReactElement, useEffect, useState } from "react";
import Header from "../components/Header";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { User } from ".prisma/client";
import TestBankFilter from "../components/testBankPage/testBankFilter";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { prisma } from "../lib/prisma";
import {
  getAllQuestions,
  getAllQuestionsByCategory,
  getCategories,
  getDifficulty,
} from "../utils/apiFunctions";
import ImportToDatabase from "../components/testBankPage/importToDatabase";

interface Props {
  data: any;
}

function TestBank({ data }: Props) {
  console.log(data);
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const router = useRouter();

  const getUserFunction = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (user === null) {
      router.push("/login");
    }
  };

  useEffect(() => {
    getUserFunction();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="pt-10">
        <h3 className=" grid justify-items-center top-24 uppercase tracking-[10px] text-2xl m-10 ">
          Test Bank
        </h3>
        {/* import test bank to database modal */}
        <div className="flex justify-center">
          <ImportToDatabase data={data} />
        </div>
      </div>

      <TestBankFilter data={data} />
    </div>
  );
}

export default TestBank;

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps() {
    // const categories = await getAllQuestionsByCategory();
    const res = await prisma.category.findMany({
      include: {
        questions: true,
      },
    });

    //json.parse(json.stringify(createdAt))
    // const categories = res.map((category) => {
    //   const questions = category.questions?.map((question) => {
    //     return {
    //       ...question,
    //       createdAt: JSON.parse(JSON.stringify(question.createdAt)),
    //       updatedAt: JSON.parse(JSON.stringify(question.updatedAt)),
    //     };
    //   });
    //   return { ...category, questions };
    // });

    // const difficulty = await getDifficulty();
    const difficulty = await prisma.difficulty.findMany();

    return {
      props: {
        data: {
          categories: JSON.parse(JSON.stringify(res)),
          difficulty,
        },
      },
    };
  },
});

// export const getStaticProps: GetStaticProps = async (context) => {
//   const categories = await getAllQuestionsByCategory();

//   const difficulty = await getDifficulty();

//   return {
//     props: {
//       data: {
//         categories,
//         difficulty,
//       },
//     }, // will be passed to the page component as props
//   };
// };
