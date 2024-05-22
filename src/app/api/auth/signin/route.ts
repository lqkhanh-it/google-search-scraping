import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { createUser } from "../../../../models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10); 
    const hashedEmail = await hash(email, 10);

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Registration failed" });
  }
}
