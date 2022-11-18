import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  rearrangeQuestions,
  testQuestions,
  editQuestionNo,
} from "../../redux/testSlice";

interface Props {}

function DraftTest({}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(testQuestions);

  //function to change the question number to the new number in redux
  //rearrange the questions according to the question number then change the question number
  //to the new index. Then set the redux state with the new values
  const rearrange = (e: any, id: any) => {
    const { value } = e.target;
    console.log(id);
    dispatch(editQuestionNo({ number: value, id }));
  };

  console.log(questions);
  return (
    <div>
      {questions.map((question: any, indx: any) => (
        <div className="p-3 border-b m-3" key={indx}>
          <div className="flex">
            <h2>
              <input
                type="string"
                name="questionNo"
                id="questionNo"
                className="block w-[80px] border rounded-lg text-center border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={question.questionNo}
                onChange={(e) => rearrange(e, question.id)}
              />
            </h2>
            <h2 className="underline ml-1">{`${question.question}`} </h2>
          </div>
          <ol className="pl-10">
            <li className="p-1">A) {question.firstA}</li>
            <li className="p-1">B) {question.secondA}</li>
            <li className="p-1">C) {question.thirdA}</li>
            <li className="p-1">D) {question.fourthA}</li>
            <li className="p-1">E) {question.fifthA}</li>
          </ol>
          <div className="flex justify-end">
            <button
              type="button"
              className="m-2 inline-flex items-center rounded border border-transparent bg-red-400 px-2.5 py-1.5 text-xs font-medium text-red-800 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DraftTest;
