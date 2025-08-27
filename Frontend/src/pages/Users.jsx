// src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/authService";
import { FiTrash2 } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser._id);
      setUsers(users.filter((user) => user._id !== selectedUser._id));
      toast.success(`${selectedUser.name} deleted successfully!`);
    } catch (err) {
      toast.error("Failed to delete user!");
      console.error(err.message);
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading users...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700 font-medium">Name</th>
              <th className="py-3 px-6 text-left text-gray-700 font-medium">Email</th>
              <th className="py-3 px-6 text-left text-gray-700 font-medium">Role</th>
              <th className="py-3 px-6 text-center text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      user.role === "admin" ? "bg-blue-600" : "bg-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => confirmDelete(user)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center justify-center gap-1"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No users found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blurred background */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>

          {/* Modal content */}
          <div className="bg-white rounded-lg shadow-lg z-50 w-96 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedUser?.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
