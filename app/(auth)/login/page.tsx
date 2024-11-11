import LoginForm from "@/app/components/auth/LoginForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User } from "@/types";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const user = session.user as User;
    redirect(
      user.role === "instructor"
        ? "/instructor/dashboard"
        : "/student/dashboard"
    );
  }

  return <LoginForm />;
}
