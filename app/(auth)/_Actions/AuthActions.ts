"use server";

import { cookies } from "next/headers";

type TData = {
  email: string;
  password: string;
};
export const loginAction = async (data: TData) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
