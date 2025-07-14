import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/use-auth";
import type { AxiosError } from "axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // Redirect based on role
      navigate(email.includes("hr") ? "/hr" : "/employee");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#ecf0f3] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#f7f9fb] p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center drop-shadow-sm">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center -mt-2">{error}</p>
        )}

        {/* Email input */}
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
            autoComplete="username"
            placeholder="example@gmail.com"
          />
        </div>

        {/* Password input */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="Password@1234"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold shadow-md transition"
        >
          Login
        </button>

        {/* 🔗 Signup Redirect */}
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
