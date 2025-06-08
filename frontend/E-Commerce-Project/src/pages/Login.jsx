import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginIcons from "../assets/loginIcons.png";
import SummaryApi from "../common";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

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
    }

    if (result.error) {
      toast.error(result.message);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-all overflow-hidden">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-10 w-full max-w-md text-gray-800 dark:text-white">
        <div className="flex justify-center mb-6">
          <img
            src={loginIcons}
            alt="Login"
            className="w-20 h-20 drop-shadow-lg"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={handleOnChange}
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-none outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <div className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={data.password}
                onChange={handleOnChange}
                required
                className="flex-1 bg-transparent outline-none text-base"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-xl ml-3 text-gray-600 dark:text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <Link
              to="/forgot-password"
              className="block text-sm mt-2 text-right text-purple-600 dark:text-pink-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-purple-600 dark:text-pink-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
