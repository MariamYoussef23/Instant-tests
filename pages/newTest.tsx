import React, { ReactElement, useState } from "react";
import Header from "../components/Header";
import TestModal from "../components/TestModal";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { getAllQuestionsByCategory, getDifficulty } from "../utils/apiFunctions";

interface Props {
    data:any
}

function NewTest({data}: Props): ReactElement {
    
  return (
    <div>
      <Header />
      <div className="pt-10">
        <h3 className=" grid justify-items-center top-24 uppercase tracking-[10px] text-2xl m-10 ">
          Create a new Test
        </h3>
        {/* <button onClick={()=> setView(true)}>Create New</button> */}

        <TestModal data={data}/>

        <div className="grid grid-cols-1 md:grid-cols-2 h-full m-10">
          <div className="border">
              Suggested Questions 
          </div>
          <div className="border">
              New Test
              {/* <DraftTest />  */}
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
