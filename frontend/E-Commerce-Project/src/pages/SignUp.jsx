import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assets/loginIcons.png";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/"); // Navigate to the home page after successful sign-up
    } else {
      toast.error(dataApi.message);
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  return (
    <section id="signup">
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-all">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-10 w-full max-w-md text-gray-800 dark:text-white">
          {/* Profile Pic Section */}
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full mb-6">
            <div>
              <img
                src={data.profilePic || loginIcons}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <form >
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          {/* Form */}
          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-none outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Sign Up
            </button>
          </form>

          {/* Redirect to Login */}
          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 dark:text-pink-400 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
