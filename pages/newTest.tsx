import React, { ReactElement, useState } from "react";
import Header from "../components/Header";
import TestModal from "../components/newTestPage/TestModal";
import { GetStaticPaths, GetStaticProps } from "next/types";
import {
  getAllQuestionsByCategory,
  getDifficulty,
} from "../utils/apiFunctions";
import SuggestedQuestions from "../components/newTestPage/SuggestedQuestions";
import FilteredCategory from "../components/newTestPage/FilteredCategory";

interface Props {
  data: any;
}

function NewTest({ data }: Props): ReactElement {
  const categories = data.categories;

  const [filteredCategory, setFilteredCategory] = useState('');

  const filter = (category: string) => {
    if (category === "Category") {
      setFilteredCategory('');
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
        <TestModal data={data} />

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

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = await getAllQuestionsByCategory();
  const difficulty = await getDifficulty();

  return {
    props: {
      data: {
        categories,
        difficulty,
      },
    }, // will be passed to the page component as props
  };
};
