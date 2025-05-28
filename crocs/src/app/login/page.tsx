"use client";

import { handleLogin } from "@/actions";
import ErrorNotification from "@/components/ErrorNotification";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <ErrorNotification />
      </Suspense>
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-green-100/50 transform transition-all hover:scale-[1.02] hover:shadow-3xl duration-300">
          <div className="bg-gradient-to-r from-lime-600 to-green-600 py-6 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
            
            <h2 className="text-3xl font-bold text-white relative z-10">Welcome Back</h2>
            <p className="text-sm text-white/80 mt-2 relative z-10">Login to your account</p>
          </div>

          <div className="p-8 space-y-6">
            <form action={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out"
                />
                <div className="flex justify-end">
                  <Link
                    href="/register"
                    className="text-sm text-green-600 hover:text-green-800 hover:underline transition duration-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <SubmitButton />
            </form>
          </div>

          <div className="bg-gray-50 py-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <Link 
                href="/register" 
                className="text-green-600 font-semibold hover:text-green-800 hover:underline transition duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}