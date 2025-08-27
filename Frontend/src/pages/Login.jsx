import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


  const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // added

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@nsut.ac.in")) {
      setError("Only NSUT email addresses are allowed");
      return;
    }

    setLoading(true);
    try {
      const data = await login({ email: email.trim(), password: password.trim() });
      console.log("Login success:", data);

      // Store user & token in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

      onClose();
    } catch (err) {
      setError(err.message);
      console.error("Login failed:", err);
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

        <h2 className="text-3xl font-bold text-blue-800 text-center mb-2">Welcome Back!</h2>
        <p className="text-blue-700 text-center text-sm mb-4">Login with your NSUT email to continue</p>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
