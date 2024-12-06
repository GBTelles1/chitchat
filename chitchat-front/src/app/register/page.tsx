import Link from "next/link";
import { RegisterForm } from "./components/RegisterForm";
import { RegisterPage } from "./components/RegisterPage";

export default function Register() {
  return (
    <RegisterPage>
      <RegisterForm />

      <div>
        Want to log in? Click <Link href={"/login"}>here</Link>
      </div>
    </RegisterPage>
  );
}
