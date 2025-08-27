// src/components/AddAdminModal.jsx
import { useState } from "react";
import { addAdmin } from "../services/authService";

const AddAdminModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await addAdmin({ name, email, password });
      setSuccess("Admin added successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Semi-transparent blue overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-blue-50 opacity-60"
      ></div>

      {/* Modal Card */}
      <div className="relative z-10 w-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-2xl p-8 flex flex-col gap-5 border-t-4 border-blue-500 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-blue-800 text-center mb-2 ">Add New Admin</h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && <p className="text-green-500 text-center text-sm">{success}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-600 text-blue-800"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-600 text-blue-800"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-600 text-blue-800"
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer mt-2 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
          >
            {loading ? "Adding..." : "Add Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;
