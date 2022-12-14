import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const {} = req.body;
      const testBank = await prisma.question.findMany();

      return res.status(200).json({ testBank });
    } catch (error) {
      console.log(error);
    }
  }
}
