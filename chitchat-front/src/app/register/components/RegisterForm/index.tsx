import styles from "./RegisterForm.module.css";

export const RegisterForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <label htmlFor="username" className={styles.registerFormLabel}>
          * Username
        </label>

        <input id="username" name="username" type="text" required />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="email" className={styles.registerFormLabel}>
          Email
        </label>

        <input id="email" name="email" type="email" />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="birthdate" className={styles.registerFormLabel}>
          Birthdate
        </label>

        <input id="birthdate" name="birthdate" type="date" />
      </div>

      <button type="submit" className={styles.submitButton}>
        Register
      </button>
    </div>
  );
};
