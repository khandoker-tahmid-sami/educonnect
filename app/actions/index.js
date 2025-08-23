"use server";

import { signIn } from "@/auth";

export const credentialLogin = async (formData) => {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.error) {
      // NextAuth exposes only "CredentialsSignin"
      return { error: "Invalid email or password." };
    }
    return { ok: true };
  } catch (e) {
    return { error: "Something went wrong. Please try again." };
  }
};
