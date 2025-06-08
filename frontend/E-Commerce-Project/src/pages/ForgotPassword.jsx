import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import loginIcons from "../assets/loginIcons.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.message || "Password reset email sent!");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send reset email");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-rose-50">
      {/* Left image/branding */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10">
        <img
          src={loginIcons}
          alt="Forgot Password"
          className="w-40 h-40 mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800">
          Reset Your Password
        </h2>
        <p className="text-lg text-gray-600 text-center mt-2">
          We'll send you instructions to reset it.
        </p>
      </div>

      {/* Form card */}
      <div className="backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl w-full md:w-[400px] mx-auto p-8">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Forgot Password
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Enter your email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-xl text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow hover:scale-[1.02] transition-transform"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
