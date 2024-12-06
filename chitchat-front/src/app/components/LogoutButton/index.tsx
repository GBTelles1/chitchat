"use client";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("anonymousUser");

    redirect("/login");
  };
  return <button onClick={handleLogout}>Logout</button>;
};
