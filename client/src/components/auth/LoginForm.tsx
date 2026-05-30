"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      login(data.accessToken);

      toast.success("Login successful");

      router.push("/dashboard");

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">

      <h1 className="text-5xl font-bold text-white mb-3">
        Welcome Back
      </h1>

      <p className="text-white/70 mb-8">
        Login to continue building scalable systems with ArchCode.
      </p>

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400/40 transition px-4 py-3 text-white outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400/40 transition px-4 py-3 text-white outline-none"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white text-black hover:bg-gray-200"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

      </form>

    </div>
  );
}