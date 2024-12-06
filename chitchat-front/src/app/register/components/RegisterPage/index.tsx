"use client";
import styles from "./RegisterPage.module.css";
import { submitRegisterForm } from "../../actions/submitRegisterForm";
import { useActionState } from "react";
import Link from "next/link";

type RegisterPageProps = {
  children: React.ReactNode;
};

export const RegisterPage = ({ children }: RegisterPageProps) => {
  const initialMessage = "";
  const [message, registerAction] = useActionState(
    submitRegisterForm,
    initialMessage
  );

  return (
    <form className={styles.registerForm} action={registerAction}>
      <h1>Register</h1>

      <div>
        * If you give only an username, you will not be able to send messages,
        only see them
      </div>

      <div>
        ** If you want to send messages in the chat, you need to create an user
        by also inputting your email and birthdate
      </div>

      {children}

      <span className={styles.feedbackMessage}>{message}</span>

      {message.includes("created") && (
        <Link href={"/"}>Click here to go to the homepage</Link>
      )}
    </form>
  );
};
