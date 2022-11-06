import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const {} = req.body;
      const categories = await prisma.category.findMany();

      return res.status(200).json({ categories });
    } catch (error) {
      console.log(error);
    }
  }
}
