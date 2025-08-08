// import React, { useState } from 'react';

// const API_BASE_URL = 'http://localhost:5000/api'; // Your backend API base URL

// const LoginPage = ({ onLoginSuccess }) => { // Renamed prop to onLoginSuccess for consistency
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // New state for loading indicator

//   const handleLogin = async (e) => { // Made function asynchronous
//     e.preventDefault(); // Prevent default form submission
//     setLoading(true); // Set loading to true
//     setError(''); // Clear previous errors

//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Login failed');
//       }

//       const data = await response.json();
//       // On successful login, pass user ID, username, and role to App.jsx
//       onLoginSuccess(data.userId, data.username, data.role); 
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.message || 'An unexpected error occurred during login.');
//     } finally {
//       setLoading(false); // Set loading to false regardless of success or failure
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4 sm:p-8">
//       <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl text-center max-w-md w-full transform transition-all duration-300 ease-in-out scale-95 sm:scale-100">
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 sm:mb-12 leading-tight">
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//             Vendor Portal Login
//           </span>
//         </h1>
//         <form onSubmit={handleLogin} className="space-y-6"> {/* Changed onClick to onSubmit for form */}
//           <div>
//             <label htmlFor="username" className="sr-only">Username</label>
//             <input
//               type="text"
//               id="username"
//               className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="sr-only">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit" // Changed type to submit
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-75 focus:ring-blue-500"
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';

// const API_BASE_URL = 'http://localhost:5000/api'; // Your backend API base URL
 const API_BASE_URL = 'https://rev-lumina.onrender.com/api';

const LoginPage = ({ onLoginSuccess }) => { // Renamed prop to onLoginSuccess for consistency
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleLogin = async (e) => { // Made function asynchronous
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true
    setError(''); // Clear previous errors

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      // On successful login, pass user ID, username, and role to App.jsx
      onLoginSuccess(data.userId, data.username, data.role); 
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred during login.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-300 ease-in-out scale-95 sm:scale-100"> {/* Changed max-w-md to max-w-lg */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 sm:mb-12 leading-normal"> {/* Changed 'leading-tight' to 'leading-normal' */}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Lumina Vendor Portal Login {/* Updated title text */}
          </span>
        </h1>
        <form onSubmit={handleLogin} className="space-y-6"> {/* Changed onClick to onSubmit for form */}
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit" // Changed type to submit
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-8 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-75 focus:ring-blue-500"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
