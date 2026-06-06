"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignup = async (
    e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "https://archcode-api.onrender.com/api/auth/signup",
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
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Account created successfully");

      router.push("/login");

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
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

      <h1 className="text-4xl font-bold text-white mb-2">
        Create Account
      </h1>

      <p className="text-white/60 mb-8">
        Join ArchCode and unlock AI-powered system design evaluation.
      </p>

      <form
        onSubmit={handleSignup}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white outline-none"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white text-black hover:bg-gray-200"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </Button>

      </form>
    </div>
  );
}