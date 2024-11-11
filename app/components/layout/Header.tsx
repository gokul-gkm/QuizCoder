"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCode, FiLogOut, FiUser } from "react-icons/fi";
import FullScreenButton from '../ui/FullScreenButton';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <FiCode className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              QuizCoder
            </span>
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <FiUser className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{session.user.name}</span>
              </div>
              <FullScreenButton /> 
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 rounded-lg px-4 py-2 
                         bg-gray-800 text-gray-200 hover:bg-gray-700
                         transition-all duration-300 hover:scale-105"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <FullScreenButton /> 
              <Link
                href="/login"
                className="flex items-center space-x-2 text-gray-300 
                         hover:text-blue-400 transition-colors"
              >
                <FiUser className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}