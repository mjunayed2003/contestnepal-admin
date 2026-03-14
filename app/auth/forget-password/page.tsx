"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const router = useRouter();

  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail]     = useState("");

  const [otp, setOtp]         = useState(["", "", "", ""]);
  const inputRefs             = useRef<(HTMLInputElement | null)[]>([]);

  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwords, setPasswords]                     = useState({ new: "", confirm: "" });

  // Step 1
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1500);
  };

  // Step 2 — OTP
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 1500);
  };

  // Step 3
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) { alert("Passwords do not match!"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Password reset successfully!");
      router.push("/auth/sign-in");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5F7] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1400px] h-full min-h-[700px] flex rounded-[30px] overflow-hidden shadow-2xl bg-white">

        {/* LEFT SIDE — DYNAMIC FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-[450px] mx-auto w-full">

            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <div>
                <h1 className="text-[32px] sm:text-[40px] font-serif font-bold text-gray-900 mb-3">
                  Recover Account
                </h1>
                <p className="text-gray-500 mb-10">
                  Enter your email and we will send you a recovery code.
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <input
                      type="email" required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@email.com"
                      className="w-full h-[54px] px-5 rounded-lg border border-gray-300 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full h-[54px] bg-[#A01C1C] hover:bg-[#8a1212] text-white text-lg font-semibold rounded-lg shadow-md transition-all disabled:opacity-70">
                    {loading ? "Sending..." : "Send Recovery Email"}
                  </button>
                </form>
                <div className="mt-8 flex justify-center sm:justify-start">
                  <Link href="/auth/sign-in" className="flex items-center gap-2 text-gray-500 hover:text-[#A01C1C] transition-colors">
                    <ChevronLeft size={20} /> Or continue with Login
                  </Link>
                </div>
              </div>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <div className="text-center sm:text-left">
                <h1 className="text-[32px] sm:text-[40px] font-serif font-bold text-gray-900 mb-3">
                  Confirm Your Email
                </h1>
                <p className="text-gray-500 mb-8">
                  We&apos;ve sent a code to{" "}
                  <span className="font-semibold text-gray-800">{email || "alexander@email.com"}</span>
                </p>
                <form onSubmit={handleOtpSubmit} className="space-y-8">
                  <div className="flex gap-4 justify-center sm:justify-start">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text" maxLength={1} value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-16 h-16 sm:w-20 sm:h-20 border border-gray-300 rounded-2xl text-center text-2xl sm:text-3xl font-bold focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                      />
                    ))}
                  </div>
                  <button type="submit" disabled={loading || otp.some((d) => !d)}
                    className="w-full h-[54px] bg-[#A01C1C] hover:bg-[#8a1212] text-white text-lg font-semibold rounded-lg shadow-md transition-all disabled:opacity-50">
                    {loading ? "Verifying..." : "Continue"}
                  </button>
                </form>
                <p className="mt-6 text-gray-400 text-sm text-center sm:text-left">
                  Didn&apos;t get a code?{" "}
                  <button className="text-[#A01C1C] font-semibold hover:underline">Resend code (41s)</button>
                </p>
                <button onClick={() => setStep(1)}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mx-auto sm:mx-0">
                  <ChevronLeft size={16} /> Change Email
                </button>
              </div>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 3 && (
              <div>
                <h1 className="text-[32px] sm:text-[40px] font-serif font-bold text-gray-900 mb-3">
                  Set New Password
                </h1>
                <p className="text-gray-500 mb-10">
                  Your new password must be different from previously used passwords.
                </p>
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"} required
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        placeholder="*************"
                        className="w-full h-[54px] px-5 rounded-lg border border-gray-300 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all pr-12"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"} required
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        placeholder="*************"
                        className="w-full h-[54px] px-5 rounded-lg border border-gray-300 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all pr-12"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {passwords.confirm && passwords.new !== passwords.confirm && (
                      <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                    )}
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full h-[54px] bg-[#A01C1C] hover:bg-[#8a1212] text-white text-lg font-semibold rounded-lg shadow-md transition-all disabled:opacity-70 mt-4">
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT SIDE — LOGO */}
        <div className="hidden lg:flex w-1/2 bg-[#FFF5F7] items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute w-[140%] h-[140%] border-[60px] border-white/40 rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-80 h-80 relative drop-shadow-xl">
              <Image src="/images/logo.svg" alt="Contest Nepal Logo" fill className="object-contain" />
            </div>
            <h2 className="text-[#A01C1C] text-4xl font-black mt-8 tracking-wider uppercase drop-shadow-sm">
              Contest Nepal
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;