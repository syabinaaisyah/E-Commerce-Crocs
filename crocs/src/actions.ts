"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "https://crocs-one.vercel.app";

export const handleAddToCart = async (productId: string) => {
  console.log("server action:", productId);
};

export const handleLogin = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await fetch(`${baseURL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  const response = await res.json();
  if (!res.ok) {
    redirect(`/login?error=${encodeURIComponent(response.message)}`);
  }

  const cookieStore = await cookies()
  cookieStore.set("authorization", `Bearer ${response.accessToken}`);
  redirect("/");
};

export const handleRegister = async (formData: FormData) => {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
      username: formData.get("username"),
      name: formData.get("name"),
    };

    if (
      !rawFormData.email ||
      !rawFormData.password ||
      !rawFormData.username ||
      !rawFormData.name
    ) {
      throw new Error("Form tidak lengkap. Pastikan semua field diisi.");
    }

    const res = await fetch(`${baseURL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message || "Terjadi kesalahan saat mendaftar.");
    }

    redirect("/login");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Kesalahan saat proses registrasi:", error.message);
    }
  } 
};

export const handleLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("authorization");  // Pastikan await digunakan dengan benar
};
