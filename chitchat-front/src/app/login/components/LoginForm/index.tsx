import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <label htmlFor="email" className={styles.loginFormLabel}>
          * Email
        </label>

        <input id="email" name="email" type="email" required />
      </div>

      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </div>
  );
};
