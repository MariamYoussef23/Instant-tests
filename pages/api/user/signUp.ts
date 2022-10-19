import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id, firstName, lastName, email, password } = req.body;
      const user = await prisma.user.create({
        data: {
          id,
          firstName,
          lastName,
          email,
          password,
        },
      });

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
    }
  }
}
