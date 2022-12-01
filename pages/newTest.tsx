import React, { ReactElement, useEffect, useState } from "react";
import Header from "../components/Header";
import TestModal from "../components/newTestPage/TestModal";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { prisma } from "../lib/prisma";

import {
  getAllQuestionsByCategory,
  getDifficulty,
} from "../utils/apiFunctions";
import SuggestedQuestions from "../components/newTestPage/SuggestedQuestions";
import FilteredCategory from "../components/newTestPage/FilteredCategory";
import DraftTestModal from "../components/newTestPage/DraftTestModal";
import { clearOptions } from "../redux/optionsSlice";
import { useAppDispatch } from "../redux/hooks";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

interface Props {
  data: any;
}

function NewTest({ data }: Props): ReactElement {
  const categories = data.categories;

  const [filteredCategory, setFilteredCategory] = useState("");

  const filter = (category: string) => {
    if (category === "Category") {
      setFilteredCategory("");
    } else
      setFilteredCategory(categories.filter((x: any) => x.name === category));
  };

  return (
    <div>
      <Header />
      <div className="pt-10">
        <h3 className=" grid justify-items-center top-24 uppercase tracking-[10px] text-2xl m-10 ">
          Create a new Test
        </h3>
        {/* choose questions modal  */}
        <div className="flex justify-center">
          <TestModal data={data} />
          <DraftTestModal />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full m-10">
          <div className=" pr-2 ">
            <h1 className="border rounded-lg text-center ">
              Suggested Questions
            </h1>
            <SuggestedQuestions />
          </div>

          <div className="pl-2">
            <select
              className="block w-full rounded-lg border-gray-300 bg-gray-50 pl-4  text-black focus:border-black focus:ring-black sm:text-sm"
              placeholder="Select department"
              name="jobs"
              id="jobs"
              onChange={(e) => {
                filter(e.currentTarget.value);
              }}
            >
              <option value="Category">Filter Category</option>
              {categories.map((category: any, indx: number) => (
                <option key={indx} value={`${category.name}`}>
                  {category.name}
                </option>
              ))}
            </select>

            <FilteredCategory filteredCategory={filteredCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTest;

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
    const categories = res.map((category) => {
      const questions = category.questions?.map((question) => {
        return {
          ...question,
          createdAt: JSON.parse(JSON.stringify(question.createdAt)),
          updatedAt: JSON.parse(JSON.stringify(question.updatedAt)),
        };
      });
      return { ...category, questions };
    });

    // const difficulty = await getDifficulty();
    const difficulty = await prisma.difficulty.findMany();

    return {
      props: {
        data: {
          categories,
          difficulty,
        },
      },
    };
  },
});
