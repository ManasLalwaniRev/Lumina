
import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing on the frontend (for demonstration, ideally done on backend)

const API_BASE_URL = 'https://rev-lumina.onrender.com/api'; // Your deployed backend API base URL

const UserProfilePage = ({ setCurrentPage, currentUserId, currentUsername, currentUserRole }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('user'); // Default new user role
  const [message, setMessage] = useState(''); // For success/error messages
  const [isLoading, setIsLoading] = useState(false);

  // Clear message after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!newUsername || !newPassword) {
      setMessage('Username and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      // Hash password on the frontend (for demonstration purposes only)
      // In a production app, password hashing should ALWAYS occur on the backend.
      const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 salt rounds

      const response = await fetch(`${API_BASE_URL}/users/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          password_hash: hashedPassword, // Send the hashed password
          role: newUserRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      setMessage('User created successfully!');
      setNewUsername('');
      setNewPassword('');
      setNewUserRole('user'); // Reset role to default
    } catch (err) {
      console.error('Error creating user:', err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl text-center max-w-4xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 sm:mb-12 leading-normal">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            User Profile & Management
          </span>
        </h1>

        {/* Current User Information */}
        <div className="mb-10 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-gray-700 font-semibold">Username:</p>
              <p className="text-gray-900 text-lg">{currentUsername || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Role:</p>
              <p className="text-gray-900 text-lg">{currentUserRole || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Create New User Section (Admin Only) */}
        {currentUserRole === 'admin' && (
          <div className="mb-10 p-6 bg-blue-50 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Create New User</h2>
            {message && (
              <p className={`mb-4 text-center ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label htmlFor="newUsername" className="sr-only">New Username</label>
                <input
                  type="text"
                  id="newUsername"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="New Username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="sr-only">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newUserRole" className="block text-sm font-medium text-gray-700 text-left mb-1">Role</label>
                <select
                  id="newUserRole"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="accountant">Accountant</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? 'Creating User...' : 'Create User'}
              </button>
            </form>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
