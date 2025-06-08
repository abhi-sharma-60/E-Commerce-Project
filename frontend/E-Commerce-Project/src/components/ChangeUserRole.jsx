import React, { useState } from "react";
import ROLE from "../common/role";
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close dialog"
        >
          <IoCloseSharp size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Change User Role
        </h2>

        {/* User info */}
        <div className="space-y-2 mb-6">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {email}
          </p>
        </div>

        {/* Role selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <label htmlFor="roleSelect" className="font-medium text-gray-800">
            Role:
          </label>
          <select
            id="roleSelect"
            value={userRole}
            onChange={handleOnChangeSelect}
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition w-full sm:w-auto"
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {/* Action button */}
        <button
          onClick={updateUserRole}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-2 rounded-full shadow-lg transition transform hover:scale-[1.03]"
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
