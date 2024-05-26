import { serverAuth } from "../../../libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method == "GET") {
    try {
      const { currentUser } = await serverAuth();
      return NextResponse.json(currentUser);
    } catch (error) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }
  }
  return NextResponse.json("Unauthenticated", { status: 401 });
}
