import SignUpForm from "@/app/components/auth/SignupForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(
      session.user.role === "instructor"
        ? "/instructor/dashboard"
        : "/student/dashboard"
    );
  }

  return <SignUpForm />;
}
