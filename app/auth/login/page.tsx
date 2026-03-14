"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { loginStart, loginSuccess, loginFailure } from "@/redux/features/authSlice";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, role, loading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "organizer") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, role, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    setTimeout(() => {
      const emailLower = formData.email.toLowerCase();
      let detectedRole: "user" | "organizer" = "user";
      if (emailLower.includes("organizer")) {
        detectedRole = "organizer";
      }
      const mockUser = {
        name: detectedRole === "organizer" ? "Organizer Admin" : "Regular User",
        email: formData.email,
      };
      dispatch(loginSuccess({ user: mockUser, role: detectedRole }));
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5F7] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1400px] h-full min-h-[700px] flex rounded-[30px] overflow-hidden shadow-2xl bg-white">

        {/* LEFT SIDE - FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-[500px] mx-auto w-full">
            <h1 className="text-[32px] sm:text-[40px] font-serif font-bold text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

            {/* Demo Credential Hint */}
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
              <p><strong>Testing Credentials:</strong></p>
              <p>User: <code>user@gmail.com</code> (Goes to Home)</p>
              <p>Organizer: <code>admin@organizer.com</code> (Goes to Dashboard)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full h-[50px] pl-12 pr-4 text-gray-700 rounded-lg border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full h-[50px] pl-12 pr-12 text-gray-700 rounded-lg border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link href="/auth/forgot-password" className="text-xs text-[#A01C1C] font-semibold hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[52px] mt-2 bg-[#A01C1C] hover:bg-[#8a1212] text-white font-bold text-lg rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : "Sign In"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] bg-gray-200 flex-1" />
                <span className="text-gray-400 text-sm">Or continue with</span>
                <div className="h-[1px] bg-gray-200 flex-1" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="h-[50px] border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={22} height={22} />
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button type="button" className="h-[50px] border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Image src="/images/apple.svg" alt="Apple" width={22} height={22} />
                  <span className="text-sm font-medium text-gray-700">Apple</span>
                </button>
              </div>

              <div className="text-center mt-8">
                <span className="text-gray-500 text-sm">Don&apos;t have an account? </span>
                <Link href="/auth/sign-up" className="text-[#A01C1C] font-bold hover:underline">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE - LOGO */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#FFF5F7] to-[#ffe4e8] items-center justify-center p-12 relative">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-64 h-64 md:w-96 md:h-96 relative drop-shadow-2xl">
              <Image src="/images/logo.svg" alt="Logo" fill className="object-contain" />
            </div>
            <h2 className="mt-8 text-2xl font-bold text-[#A01C1C] tracking-wide">
              Join the Contest Revolution
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;