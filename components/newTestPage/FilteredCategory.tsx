import React, { ReactElement } from "react";

interface Props {
  filteredCategory: any;
}

function FilteredCategory({ filteredCategory }: Props): ReactElement {
  console.log(filteredCategory);
  return (
    <div>
      {filteredCategory.length === 0 && (
        <p className="mt-5 overflow-hidden bg-white text-center text-lg  shadow ">
          No Category Selected
        </p>
      )}
      {filteredCategory.length !== 0 && ( filteredCategory.map((category: any) => (
        <>
          {category.questions.map((question: any, indx: any) => (
            <div className="p-3 border rounded-xl m-3">
              <h2 className="underline ">{question.question}</h2>
              <ol className="pl-5">
                <li className="p-1">A) {question.firstA}</li>
                <li className="p-1">B) {question.secondA}</li>
                <li className="p-1">C) {question.thirdA}</li>
                <li className="p-1">D) {question.fourthA}</li>
                <li className="p-1">E) {question.fifthA}</li>
              </ol>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="m-2 inline-flex items-center rounded border border-transparent bg-green-300 px-2.5 py-1.5 text-xs font-medium text-green-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  // onClick={() => {
                  //   dispatch(addQuestion(question));
                  // }}
                >
                  Add to test
                </button>
              </div>
            </div>
          ))}
        </>
      )))}
    </div>
  );
}

export default FilteredCategory;
