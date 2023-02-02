import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { difficulty } = req.body;
    const oldDifficulty = await prisma.difficulty.findMany();

    // new arr check if id exists in old one then update if not add new id and category
    for (var i = 0; i < difficulty.length; i++) {
      //if id is found in old one compare and update it
      if (oldDifficulty.find((e) => e.id == difficulty[i].id) != undefined) {
        const updatedDifficulty = await prisma.difficulty.update({
          where: { id: +difficulty[i].id },
          data: { name: difficulty[i].difficulty.toString() },
        });
      }
      //if new id not in old arr then add it
      else {
        const newDifficulty = await prisma.difficulty.create({
          data: {
            id: +difficulty[i].id,
            name: difficulty[i].difficulty.toString(),
          },
        });
      }
    }

    //old arr check if id exists in new one if not then delete it !!
    // for (var i = 0; i < categories.length; i++) {}

    return res.status(200).json("Difficulty updated");
  } catch (error) {
    console.log(error);
  }
}
