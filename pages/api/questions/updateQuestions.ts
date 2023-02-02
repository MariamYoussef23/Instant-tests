import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { questions } = req.body;
    const oldQuestions = await prisma.question.findMany();

    
    // new arr check if id exists in old one then update if not add new id and category
    for (var i = 0; i < questions.length; i++) {
      //if id is found in old one compare and update it
      if (oldQuestions.find((e) => e.id == questions[i].id) != undefined) {
        const updatedCategory = await prisma.question.update({
          where: { id: +questions[i].id },
          data: {
            question: questions[i].question.toString(),
            firstA: questions[i].firstA.toString(),
            secondA: questions[i].secondA.toString(),
            thirdA: questions[i].thirdA.toString(),
            fourthA: questions[i].fourthA.toString(),
            fifthA: questions[i].fifthA.toString(),
            correctA: questions[i].correctA.toString(),
            categoryId: questions[i].categoryId,
            difficultyId: questions[i].difficultyId,
          },
        });
      }
      //if new id not in old arr then add it
      else {
        const newCategory = await prisma.question.create({
          data: {
            id: +questions[i].id,
            question: questions[i].question.toString(),
            firstA: questions[i].firstA.toString(),
            secondA: questions[i].secondA.toString(),
            thirdA: questions[i].thirdA.toString(),
            fourthA: questions[i].fourthA.toString(),
            fifthA: questions[i].fifthA.toString(),
            correctA: questions[i].correctA.toString(),
            categoryId: questions[i].categoryId,
            difficultyId: questions[i].difficultyId,
          },
        });
      }
    }

    //old arr check if id exists in new one if not then delete it !!
    // for (var i = 0; i < categories.length; i++) {}

    return res.status(200).json("questions updated");
  } catch (error) {
    console.log(error);
  }
}
