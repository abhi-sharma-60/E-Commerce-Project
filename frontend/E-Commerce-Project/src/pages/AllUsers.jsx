import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _Id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 p-4">
      <div className="backdrop-blur-md bg-white/80 shadow-2xl rounded-2xl w-full max-w-6xl overflow-x-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 py-6">
          All Registered Users
        </h2>

        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-pink-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Sr.</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {allUser.map((el, index) => (
              <tr key={el._id} className="hover:bg-rose-50 transition-all">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{el?.name}</td>
                <td className="px-4 py-3">{el?.email}</td>
                <td className="px-4 py-3 capitalize">{el?.role}</td>
                <td className="px-4 py-3">
                  {moment(el?.createdAt).format("LL")}
                </td>
                <td className="px-4 py-3">
                  <button
                    className="p-2 bg-green-100 rounded-full hover:bg-green-500 hover:text-white transition-colors"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._Id}
          callFunc={fetchAllUsers}
        />
      )}
    </section>
  );
};

export default AllUsers;
