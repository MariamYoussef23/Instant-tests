/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { read, utils } from "xlsx";

type Question = {
    Question: string;
    Id: number;
    Answers? : Answer[];
};
type Answer = {
    Question: string;
    Id: number;
    QuestionId: number;
    isCorrect: boolean;
};

function Upload() {
  //create an upload file button with on submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = e.currentTarget.file.files[0];

    const f = await file.arrayBuffer();
    const wb = read(f);
    if (wb.SheetNames.length > 2) return;

    let questions = utils.sheet_to_json<Question>(wb.Sheets[wb.SheetNames[0]!]!);
    const answers = utils.sheet_to_json<Answer>(
      wb.Sheets[wb.SheetNames[1]!]!
    );
    questions = questions.map(q=> {
        q.Answers = answers.filter(a => a.QuestionId === q.Id);
        return q;
    })
    console.log({ file, questions, answers, f });
  };
  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;