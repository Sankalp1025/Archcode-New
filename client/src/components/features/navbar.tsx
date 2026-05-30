"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { scrollToSection } from "@/lib/scroll";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const { isAuthenticated, logout } = useAuthContext(); 

  const router = useRouter();

  const handleLogout = () => {
    logout();
  router.push("/");
};

  const handleLeaderboardClick = () => {
   toast("Leaderboard Is Locked", {
    description:
      "Sign up to unlock rankings and AI-powered challenge tracking.",
  });
};

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">

        {/* Logo */}
        <div className="text-white font-bold text-lg">
          ArchCode
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-white/80">
          <span className="hover:text-white cursor-pointer" onClick={() => scrollToSection("problems")}>
            Problems
          </span>
          <span className="hover:text-white cursor-pointer" onClick={() => scrollToSection("ai-features")}>
            AI Features
          </span>
          <span className="hover:text-white cursor-pointer" onClick={handleLeaderboardClick}>
            Leaderboard
          </span>
        </div>

        {/* Buttons */}
          {isAuthenticated ? (
            <div className="flex gap-3">

              <Link href="/dashboard">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-xl px-4">
                  Dashboard
                </Button>
              </Link>

              <Button onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600 rounded-xl px-4"
              >
                Logout
              </Button>

            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-xl px-4">
                 Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-xl px-4">
                 Sign Up
                </Button>
              </Link>
            </div>
          )}
      </div>
    </motion.nav>
  );
}