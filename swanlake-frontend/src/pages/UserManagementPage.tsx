import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";
import { Profile } from "../service/UserService";
import { Edit, Trash2 } from "lucide-react"; // Import icons from Lucide React

function UserManagementPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please log in.");
        return;
      }
      const response = await UserService.getAllUsers(token);
      setUsers(response.accountList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (accountID: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found. Please log in.");
          return;
        }
        await UserService.deleteUser(accountID, token);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Users Management Page
      </h2>
      <div className="flex justify-end mb-4">
        <Link
          to="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Add User
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((account) => (
                <tr
                  key={account.accountID}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {account.accountID}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {account.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {account.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {account.role}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700 flex items-center justify-center gap-4">
                    <Link
                      to={`/update-user/${account.accountID}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => deleteUser(account.accountID)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}

export default UserManagementPage;