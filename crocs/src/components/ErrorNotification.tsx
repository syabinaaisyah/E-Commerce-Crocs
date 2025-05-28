"use client";

import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ErrorNotification() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error,
        confirmButtonColor: "#d33",
      });
    }
  }, [error]);

  return null;
}
