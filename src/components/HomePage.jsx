// // src/components/HomePage.jsx
// import React from 'react';

// const HomePage = ({ setCurrentPage, openAddDataModal, openEditDataModal }) => {
//   const buttons = [
//     // Removed the 'Manage Database' button
//     { label: 'User Profile', page: 'user-profile', color: 'bg-teal-600', hover: 'hover:bg-teal-700' },
//     { label: 'View', page: 'view', color: 'bg-purple-600', hover: 'hover:bg-purple-700' },
//     { label: 'Accountant', page: 'accountant', color: 'bg-orange-600', hover: 'hover:bg-orange-700' },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4 sm:p-8">
//       <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl text-center max-w-4xl w-full transform transition-all duration-300 ease-in-out scale-95 sm:scale-100">
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 sm:mb-12 leading-tight">
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//             Welcome to Vendor Portal
//           </span>
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {buttons.map((button) => (
//             <button
//               key={button.label}
//               onClick={() => setCurrentPage(button.page)}
//               className={`${button.color} ${button.hover} text-white font-extrabold py-5 px-8 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-75 ${button.color.replace('bg-', 'focus:ring-')}`}
//             >
//               {button.label}
//             </button>
//           ))}
//           <button
//             onClick={openAddDataModal}
//             className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-5 px-8 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-75 focus:ring-green-500"
//           >
//             Add Data
//           </button>
//           <button
//             onClick={openEditDataModal}
//             className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-extrabold py-5 px-8 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-75 focus:ring-yellow-500"
//           >
//             Edit Data
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import React from 'react';

// const HomePage = ({ setCurrentPage, openAddDataModal, openEditDataModal, currentUserRole }) => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl text-center">
//         <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//             Welcome to Lumina Vendor Portal
//           </span>
//         </h1>
//         <p className="text-xl text-gray-600 mb-12">
//           Your centralized platform for managing vendor data efficiently.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Always visible buttons */}
//           <button
//             onClick={openAddDataModal}
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Add Data
//           </button>
//           <button
//             onClick={openEditDataModal}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             Edit Data
//           </button>
//           <button
//             onClick={() => setCurrentPage('view')}
//             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
//           >
//             View All Data
//           </button>

//           {/* Conditional rendering for Accountant and User Profile buttons */}
//           {currentUserRole === 'admin' && (
//             <>
//               <button
//                 onClick={() => setCurrentPage('accountant')}
//                 className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
//               >
//                 Accountant
//               </button>
//               <button
//                 onClick={() => setCurrentPage('user-profile')}
//                 className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
//               >
//                 User Profile
//               </button>
//             </>
//           )}
//           {/* You can add more buttons here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';

const HomePage = ({ setCurrentPage, openAddDataModal, openEditDataModal, currentUserRole }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-8"> {/* Updated gradient classes */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to Lumina Vendor Portal
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Your centralized platform for managing vendor data efficiently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Always visible buttons */}
          <button
            onClick={openAddDataModal}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Data
          </button>
          <button
            onClick={openEditDataModal}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit Data
          </button>
          <button
            onClick={() => setCurrentPage('view')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            View All Data
          </button>

          {/* Conditional rendering for Accountant and User Profile buttons */}
          {currentUserRole === 'admin' && (
            <>
              <button
                onClick={() => setCurrentPage('accountant')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Accountant
              </button>
              <button
                onClick={() => setCurrentPage('user-profile')}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                User Profile
              </button>
            </>
          )}
          {/* You can add more buttons here */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
