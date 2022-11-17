import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleHidden, options } from "../../redux/optionsSlice";
import { addQuestion } from "../../redux/testSlice";

interface Props {}

function SuggestedQuestions({}: Props): ReactElement {
  const suggestedQuestions = useAppSelector(options);
  const dispatch = useAppDispatch();

  return (
    <div>
      {suggestedQuestions.map(
        (question: any, indx: any) =>
          !question.hidden && (
            <div className="p-3 border rounded-xl m-3" key={indx}>
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
                  onClick={() => {
                    dispatch(handleHidden(question));
                    dispatch(addQuestion(question));
                  }}
                >
                  Add to test
                </button>
                <button
                  type="button"
                  className="m-2 inline-flex items-center rounded border border-transparent bg-red-400 px-2.5 py-1.5 text-xs font-medium text-red-800 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {
                    dispatch(handleHidden(question));
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default SuggestedQuestions;
