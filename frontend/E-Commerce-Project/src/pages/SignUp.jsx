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
      navigate("/login");
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
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 transition-all">
      {/* Left Brand/Image */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10">
        <img src={loginIcons} alt="Sign Up" className="w-40 h-40 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">
          Join DigiMart Today
        </h2>
        <p className="text-lg text-gray-600 text-center mt-2">
          Your favorite electronics store.
        </p>
      </div>

      {/* Signup Card */}
      <div className="backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl w-full md:w-[400px] mx-auto p-8">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Pic Upload */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 mb-2 relative">
              <img
                src={data.profilePic || loginIcons}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border border-gray-300"
              />
              <label>
                <div className="text-xs text-center absolute bottom-0 w-full bg-slate-200 bg-opacity-90 cursor-pointer py-1">
                  Upload
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="w-full p-3 rounded-xl text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
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
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow hover:scale-[1.02] transition-transform"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
