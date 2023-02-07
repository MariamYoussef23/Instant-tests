import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, newTitle, questions, newType, newDate } = req.body;

    //find related test id
    const test = await prisma.test.findUnique({
      where: {
        name: title,
      },
    });

    //change name of test & delete old questions on test
    const updateTestName = await prisma.test.update({
      where: {
        id: test?.id,
      },
      data: {
        name: newTitle,
        type: newType,
        date: newDate,
        
        questions: {
          deleteMany: {},
        },
      },
      include: {
        questions: true,
      },
    });

    //add the updated version of questionsOnTest received as questions
    for (let i = 0; i < questions.length; i++) {
      const question = await prisma.question.findUnique({
        where: { id: +questions[i].id },
      });
      if (!question)
        return res.status(404).json({
          message: "Question not found, please enter a valid product",
        });

      const questionOnTest = await prisma.questionsOnTests.create({
        data: {
          testId: +test!.id,
          questionId: +question!.id,
          questionNo: questions[i].questionNo,
        },
      });
    }

    return res.status(200).json({ updateTestName });
  } catch (error) {
    console.log(error);
  }
}
