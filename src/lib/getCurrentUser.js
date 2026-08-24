
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET");
}

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

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
  } catch {
    return null;
  }
}


// import { cookies } from "next/headers";
// import { verifyToken } from "./(auth.js)";
// import User from "../models/User";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("Please define JWT_SECRET");
// }

// export function createToken(payload) {
//   return jwt.sign(payload, JWT_SECRET, {
//     expiresIn: "7d",
//   });
// }

// export function verifyToken(token) {
//   return jwt.verify(token, JWT_SECRET);
// }


// export default async function getCurrentUser() {

//   const cookieStore = await cookies();

//   const token = cookieStore.get("token")?.value;


//   if (!token) {
//     return null;
//   }


//   try {

//     const decoded = verifyToken(token);


//     const user = await User.findById(decoded.id)
//       .select("-password");


//     if (!user) {
//       return null;
//     }


//     return {
//       id: user._id.toString(),
//       name: user.name,
//       email: user.email,
//       avatar: user.avatar,
//       role: user.role,
//     };


//   } catch  {

//     return null;

//   }

// }