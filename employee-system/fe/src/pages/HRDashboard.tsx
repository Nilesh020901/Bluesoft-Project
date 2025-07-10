import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/use-auth";
import { useNavigate } from "react-router-dom";

interface Employee {
  _id: string;
  name: string;
  email: string;
  status: string;
  loginTime?: string;
  logoutTime?: string;
}

const HRDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/hr/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#ecf0f3] p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700 drop-shadow-sm">
          HR Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 active:scale-95 transition"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading employees...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-[#f7f9fb] p-6">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="text-left bg-[#dde4ea] text-gray-800">
              <tr>
                <th className="px-5 py-3 rounded-tl-xl">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Login Time</th>
                <th className="px-5 py-3 rounded-tr-xl">Logout Time</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {employees.map((emp, i) => (
                <tr
                  key={emp._id}
                  className={`border-t border-gray-200 ${
                    i % 2 === 0 ? "bg-[#f9fbfc]" : "bg-white"
                  } hover:shadow-sm transition`}
                >
                  <td className="px-5 py-4 font-medium">{emp.name}</td>
                  <td className="px-5 py-4">{emp.email}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold shadow-inner ${
                        emp.status === "Login"
                          ? "bg-green-500"
                          : emp.status === "Logout"
                          ? "bg-red-400"
                          : "bg-gray-400"
                      }`}
                    >
                      {emp.status || "Idle"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm">
                    {emp.loginTime
                      ? new Date(emp.loginTime).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    {emp.logoutTime
                      ? new Date(emp.logoutTime).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
