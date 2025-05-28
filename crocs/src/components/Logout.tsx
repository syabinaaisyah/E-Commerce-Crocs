"use client";

import { handleLogout } from "@/actions";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        handleLogout();
      }}
      className=" text-white  hover:text-green-200 transition-all duration-300"
    >
      Logout
    </button>
  );
}
