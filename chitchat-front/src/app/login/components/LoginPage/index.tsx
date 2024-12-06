"use client";
import styles from "./LoginPage.module.css";
import { submitLoginForm } from "../../actions/submitLoginForm";
import { useActionState } from "react";
import Link from "next/link";

type LoginPageProps = {
  children: React.ReactNode;
};

export const LoginPage = ({ children }: LoginPageProps) => {
  const initialMessage = "";
  const [message, loginAction] = useActionState(
    submitLoginForm,
    initialMessage
  );

  return (
    <form className={styles.loginForm} action={loginAction}>
      <h1>Login</h1>

      {children}

      <span className={styles.feedbackMessage}>{message}</span>

      {message.includes("Hello") && (
        <Link href={"/"}>Click here to go to the homepage</Link>
      )}
    </form>
  );
};
