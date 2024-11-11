import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User } from "@/types";
import LandingContent from "@/app/components/landing/LandingContent";
import GradientBackground from "@/app/components/common/GradientBackground";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const user = session.user as User;
    if (user.role === "instructor") {
      redirect("/instructor/dashboard");
    } else {
      redirect("/student/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <GradientBackground />
      <LandingContent />
    </div>
  );
}