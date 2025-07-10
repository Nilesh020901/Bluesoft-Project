import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/use-auth";
import { useNavigate } from "react-router-dom";

interface Employee {
  name: string;
  status: "Idle" | "Login" | "Logout";
  loginTime?: string;
  logoutTime?: string;
}

const EmployeeDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/employee/me");
      setEmployee(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    if (!employee) return;

    const newStatus = employee.status === "Login" ? "Logout" : "Login";

    try {
      const res = await API.post("/employee/status", { status: newStatus });
      setEmployee(res.data);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#ecf0f3] py-10 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-700 drop-shadow-sm">
            Employee Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-red-600 active:scale-95 transition"
          >
            Logout
          </button>
        </div>

        {/* Card */}
        {loading || !employee ? (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        ) : (
          <div className="bg-[#f7f9fb] rounded-2xl shadow-xl p-6 space-y-4">
            <div className="text-lg text-gray-800">
              <strong>Name:</strong> {employee.name}
            </div>
            <div className="text-gray-700">
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-medium shadow-inner ${
                  employee.status === "Login"
                    ? "bg-green-500"
                    : employee.status === "Logout"
                    ? "bg-red-400"
                    : "bg-gray-400"
                }`}
              >
                {employee.status}
              </span>
            </div>
            <div className="text-gray-700">
              <strong>Login Time:</strong>{" "}
              {employee.loginTime
                ? new Date(employee.loginTime).toLocaleString()
                : "-"}
            </div>
            <div className="text-gray-700">
              <strong>Logout Time:</strong>{" "}
              {employee.logoutTime
                ? new Date(employee.logoutTime).toLocaleString()
                : "-"}
            </div>

            <button
              onClick={handleStatusToggle}
              className={`w-full py-2 rounded-xl text-white font-semibold transition duration-200 shadow-md ${
                employee.status === "Login"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } active:scale-95`}
            >
              {employee.status === "Login" ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;