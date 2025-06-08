import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <section className="min-h-screen flex bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/80 backdrop-blur-md shadow-2xl rounded-tr-2xl rounded-br-2xl p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="text-5xl mb-2">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-600" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold text-gray-800">
            {user?.name}
          </p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        <nav className="space-y-4">
          <Link
            to={"all-users"}
            className="block px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center hover:scale-105 transition-transform"
          >
            All Users
          </Link>
          <Link
            to={"all-products"}
            className="block px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center hover:scale-105 transition-transform"
          >
            All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
          <Outlet />
      </main>
    </section>
  );
};

export default AdminPanel;
