// src/components/RegisterModal.jsx
import { useState } from "react";
import { registerUser } from "../services/authService";

const RegisterModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Enforce NSUT email
    if (!email.endsWith("@nsut.ac.in")) {
      setError("Only NSUT email addresses are allowed");
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      setSuccess("Registration successful! You can now login.");
      console.log("Register success:", data);
      // Optionally close modal automatically after a delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
      console.error("Registration failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Semi-transparent overlay */}
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

        <h2 className="text-3xl font-bold text-blue-800 text-center mb-2">
          Join NSUT Portal
        </h2>
        <p className="text-blue-700 text-center text-sm mb-4">
          Register with your NSUT email to get started
        </p>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-center text-sm">{success}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="yourname@nsut.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
