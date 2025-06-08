import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import loginIcons from "../assets/loginIcons.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      toast.success(result.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    } else {
      toast.error(result.message);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse?.credential;
      if (!idToken) throw new Error("No token received from Google");

      const response = await fetch(SummaryApi.googleLogin.url, {
        method: SummaryApi.googleLogin.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        navigate("/");
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      setErrorMessage("Google login failed. Try again.");
    }
  };

  const handleGoogleLoginFailure = () => {
    setErrorMessage("Google login failed. Try again.");
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 transition-all">
      {/* Left Brand/Image */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10">
        <img src={loginIcons} alt="Login" className="w-40 h-40 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to DigiMart
        </h2>
        <p className="text-lg text-gray-600 text-center mt-2">
          Your favorite electronics store.
        </p>
      </div>

      {/* Login Card */}
      <div className="backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl w-full md:w-[400px] mx-auto p-8">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={handleOnChange}
              required
              className="w-full p-3 rounded-xl text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={data.password}
                onChange={handleOnChange}
                required
                className="flex-1 p-3 bg-transparent outline-none text-black"
              />
              <span
                className="text-xl cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <Link
              to="/forgot-password"
              className="block text-sm text-right mt-2 text-pink-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow hover:scale-[1.02] transition-transform"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-4">
          <div className="h-px flex-grow bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-grow bg-gray-300" />
        </div>

        <div className="flex justify-center">
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              theme="filled_black"
              shape="pill"
              width="300"
            />
          </GoogleOAuthProvider>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center mt-4">{errorMessage}</p>
        )}

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-pink-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
