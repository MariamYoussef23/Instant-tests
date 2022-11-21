import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user, title, questions } = req.body;

    //create a new test link to user

    const test = await prisma.test.create({
      data: {
        name: title,
        userId: user,
      },
    });

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
          testId: test.id,
          questionId: +question!.id,
          questionNo: questions[i].questionNo,
        },
      });
    }

    return res.status(200).json("new test created ");
  } catch (error) {
    console.log(error);
  }
}
