import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/auth/signup", { name, email });
      setMessage(res.data.message);
      setName("");
      setEmail("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setMessage(axiosError.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ecf0f3] flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm bg-[#f7f9fb] p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center drop-shadow-sm">
          Employee Signup
        </h2>

        {message && (
          <p
            className={`text-sm text-center font-medium ${
              message.includes("failed") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-xl font-semibold text-white shadow-md transition active:scale-95 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          You will receive your password on email.
        </p>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
