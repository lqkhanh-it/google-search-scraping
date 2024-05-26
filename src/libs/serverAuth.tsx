import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { getUserByEmail } from "../models/user.model";

export async function serverAuth() {
  try {
    const session = await getServerSession(authOptions);
  
    if(!session?.user?.email){
      throw new Error("Not signed in");
    }
  
    const currentUser = await getUserByEmail(session.user.email);
  
    if(!currentUser){
      throw new Error("Not signed in");
    }
  
    return { currentUser };
    
  } catch (error) {
    return { currentUser: null };
  }
}