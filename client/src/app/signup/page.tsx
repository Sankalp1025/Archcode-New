import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full" />

      </div>

      <div className="relative z-10">
        <SignupForm />
      </div>

    </div>
  );
}