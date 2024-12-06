import Link from "next/link";
import { LoginForm } from "./components/LoginForm";
import { LoginPage } from "./components/LoginPage";

export default function Login() {
  return (
    <LoginPage>
      <LoginForm />

      <div>
        Want to register? Click <Link href={"/register"}>here</Link>
      </div>
    </LoginPage>
  );
}
