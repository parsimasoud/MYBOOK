"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'



export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()


  async function handleSubmit(e) {
    e.preventDefault();
  
    const response = await fetch("/api/auth/signin", {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
  
    const data = await response.json();
  
    console.log(data);
    // if (data.message === "Login successful" ){
    //   router.push('/')
    // }
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <main className="max-w-md mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-8">
        Sign In
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3"
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
        />


        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg p-3"
        >
          Sign In
        </button>

      </form>

    </main>
  );
}