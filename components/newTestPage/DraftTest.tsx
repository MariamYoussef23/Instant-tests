import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { ReactElement, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { testQuestions, editQuestionNo } from "../../redux/testSlice";

interface Props {}

function DraftTest({}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(testQuestions);

  const initialState = questions.map((x: any) => ({
    questionNo: x.questionNo,
  }));
  //   var initialState = questions.map(({questionNo})  => ({questionNo}));

  const [input, setInput] = useState({ value: "", id: "" });
  const [fields, setFields] = useState(initialState);

  const handleChange = (e: any, index: any) => {
    const { value } = e.target;
    const list = fields as any;
    list[index].questionNo = value;
    setFields(list);
    console.log(fields);
  };

  const rearrange = () => {
    console.log(input);
    const { value, id } = input;
    dispatch(editQuestionNo({ number: value, id }));
    setFields(initialState)
  };

  return (
    <div>
      {questions.map((question: any, indx: any) => (
        <div className="p-3 border-b m-3" key={indx}>
          <div className="flex">
            <h2 className="">{`${question.questionNo}) `} </h2>
            <h2 className="underline ml-1">{` ${question.question}`} </h2>
          </div>
          <ol className="pl-10">
            <li className="p-1">A) {question.firstA}</li>
            <li className="p-1">B) {question.secondA}</li>
            <li className="p-1">C) {question.thirdA}</li>
            <li className="p-1">D) {question.fourthA}</li>
            <li className="p-1">E) {question.fifthA}</li>
          </ol>
          <div className="flex justify-end">
            <input
              type="string"
              name="questionNo"
              id="questionNo"
              className="mt-2 w-[40px] h-[30px] border rounded-lg text-center border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={question.questionNo}
              onChange={(e) => {
                setInput({ value: e.target.value, id: question.id });
                handleChange(e, indx);
              }}
              //   defaultValue={question.questionNo}
                value={fields[indx].questionNo}
            />
            <button
              className="m-2 inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => rearrange()}
            >
              change no
            </button>
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
