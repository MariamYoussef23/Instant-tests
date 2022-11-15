import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { criteria, previous } = req.body;

    const data = [];

    for (let i = 0; i < criteria.length; i++) {
      const questions = await prisma.question.findMany({
        where: {
          categoryId: +criteria[i].categoryId,
          difficultyId: +criteria[i].difficultyId,
        },
      });

      //removing previous to ensure questions are not repeated
      const filteredQuestions = questions.filter((ad) =>
        previous.every((fd: any) => fd.id !== ad.id)
      );

      var len;
      if (+criteria[i].number <= filteredQuestions.length) {
        len = +criteria[i].number;
      } else {
        len = filteredQuestions.length;
      }

      for (let j = 0; j < len; j++) {
        // get random index value
        const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
        // get random item and adding it to a the output array
        data.push(filteredQuestions[randomIndex]);
        //remove chosen item from the questions array
        filteredQuestions.splice(randomIndex, 1);
      }
    }

    //re shuffle the output array to make sure the order is random
    const dataShuffled = data.sort((a, b) => 0.5 - Math.random());

    return res.status(200).json(dataShuffled);
  } catch (error) {
    console.log(error);
  }
}
