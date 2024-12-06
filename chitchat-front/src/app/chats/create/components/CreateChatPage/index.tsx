"use client";
import styles from "./CreateChatPage.module.css";
import { submitCreateChatForm } from "../../actions/submitCreateChatForm";
import { useActionState } from "react";
import Link from "next/link";

type CreateChatPageProps = {
  children: React.ReactNode;
};

export const CreateChatPage = ({ children }: CreateChatPageProps) => {
  const initialMessage = "";
  const [message, createChatAction] = useActionState(
    submitCreateChatForm,
    initialMessage
  );

  return (
    <form className={styles.createChatForm} action={createChatAction}>
      <Link href={"/"}>Home</Link>

      <h1>Create a new chat</h1>

      {children}
      <span className={styles.feedbackMessage}>{message}</span>
    </form>
  );
};
