import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tests = await prisma.test.findMany();

      return res.status(200).json({ tests });
    } catch (error) {
      console.log(error);
    }
  }
}
