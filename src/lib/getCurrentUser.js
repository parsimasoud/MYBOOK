import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import User from "../models/User";


export default async function getCurrentUser() {

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;


  if (!token) {
    return null;
  }


  try {

    const decoded = verifyToken(token);


    const user = await User.findById(decoded.id)
      .select("-password");


    if (!user) {
      return null;
    }


    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };


  } catch  {

    return null;

  }

}