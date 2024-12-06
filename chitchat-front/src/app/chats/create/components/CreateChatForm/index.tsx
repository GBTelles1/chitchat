import styles from "./CreateChatForm.module.css";

export const CreateChatForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <label className={styles.createChatLabel} htmlFor="chatName">
          Chat name
        </label>

        <input id="chatName" type="text" name="chatName" required />
      </div>

      <button className={styles.submitButton} type="submit">
        Create
      </button>
    </div>
  );
};
