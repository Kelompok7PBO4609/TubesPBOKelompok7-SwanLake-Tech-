import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function UserManagementPage() {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);

      console.log("Response from API:", response);

      // Access the correct key "accountList" (case-sensitive)
      if (response && Array.isArray(response.accountList)) {
        setUsers(response.accountList); // Set the users state with the correct data
      } else {
        console.error("Unexpected data format:", response);
        setUsers([]); // Set to empty array if data is invalid
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteUser = async (accountID) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (confirmDelete) {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        await UserService.deleteUser(accountID, token);

        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again later.");
    }
  };

  return (
    <div className="user-management-container">
      <h2>Users Management Page</h2>
      <button className="reg-button">
        <Link to="/register">Add User</Link>
      </button>

      {/* Handle loading and error states */}
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((account) => (
              <tr key={account.accountID}>
                <td>{account.accountID}</td>
                <td>{account.email}</td>
                <td>{account.name}</td>
                <td>{account.role}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(account.accountID)}
                  >
                    Delete
                  </button>
                  <button>
                    <Link to={`/update-user/${account.accountID}`}>Update</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UserManagementPage;
