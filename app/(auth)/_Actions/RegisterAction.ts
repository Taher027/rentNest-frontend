"use server";

import { redirect } from "next/navigation";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  nidNumber: string;
  address: string;
  role: string;
  avatar?: string;
  status?: string;
};

type RegisterResult = { success: true } | { success: false; error: string };

export const registerAction = async (
  payload: RegisterPayload,
): Promise<RegisterResult | void> => {
  let succeeded = false;

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result?.message || "Registration failed",
      };
    }

    succeeded = true;
  } catch (error) {
    console.error("registerAction error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }

  if (succeeded) {
    redirect("/login");
  }
};
