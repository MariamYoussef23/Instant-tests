import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { criteria } = req.body;

    const data = [];

    for (let i = 0; i < criteria.length; i++) {
      const questions = await prisma.question.findMany({
        where: {
          categoryId: +criteria[i].categoryId,
          difficultyId: +criteria[i].difficultyId,
        },
      });
      var len;
      if (+criteria[i].number <= questions.length) {
        len = +criteria[i].number;
      } else {
        len = questions.length;
      }
      for (let j = 0; j < len; j++) {
        // get random index value
        const randomIndex = Math.floor(Math.random() * questions.length);
        // get random item and adding it to a the output array
        data.push(questions[randomIndex]);
        //remove chosen item from the questions array
        questions.splice(randomIndex, 1);
      }
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
