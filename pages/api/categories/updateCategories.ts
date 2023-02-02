import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { category } = req.body;
    const categories = await prisma.category.findMany();

    // new arr check if id exists in old one then update if not add new id and category
    for (var i = 0; i < category.length; i++) {
      //if id is found in old one compare and update it
      if (categories.find((e) => e.id == category[i].id) != undefined) {
        const updatedCategory = await prisma.category.update({
          where: { id: +category[i].id },
          data: { name: category[i].category },
        });
      }
      //if new id not in old arr then add it
      else {
        const newCategory = await prisma.category.create({
          data: {
            id: +category[i].id,
            name: category[i].category,
          },
        });
      }
    }

    //old arr check if id exists in new one if not then delete it !!
    // for (var i = 0; i < categories.length; i++) {}

    return res.status(200).json("Category updated");
  } catch (error) {
    console.log(error);
  }
}
