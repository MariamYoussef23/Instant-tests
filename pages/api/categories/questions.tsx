import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const testBank = await prisma.category.findMany({
          include: {
              questions: true
          }
      });

      return res.status(200).json({ testBank });
    } catch (error) {
      console.log(error);
    }
  }
}
