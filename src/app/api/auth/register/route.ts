import { createUser } from "../../../../models/user.model";

export  async function POST(req: Request) {
  const { email, passwordHash } = await req.json();

  try {

    await createUser({
      email,
      passwordHash,
      firstLogin: new Date(),
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json({ message: "Registration failed" }, { status: 500 });
  }
}
