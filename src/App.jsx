// // // // lumina_pct/src/App.jsx
// // // import React, { useState } from 'react';
// // // import LoginPage from '@/components/LoginPage.jsx';
// // // import HomePage from '@/components/HomePage.jsx';
// // // import PlaceholderPage from '@/components/PlaceholderPage.jsx';
// // // import AddDataModal from '@/components/AddDataModal.jsx';
// // // import EditDataModal from '@/components/EditDataModal.jsx';
// // // import ViewPage from '@/components/ViewPage.jsx'; // Ensure ViewPage is imported

// // // const App = () => {
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [currentPage, setCurrentPage] = useState('home'); // Default to home after login
// // //   const [showAddDataModal, setShowAddDataModal] = useState(false);
// // //   const [showEditDataModal, setShowEditDataModal] = useState(false);

// // //   const handleLoginSuccess = () => {
// // //     setIsLoggedIn(true);
// // //     setCurrentPage('home'); // Navigate to home after successful login
// // //   };

// // //   const handleLogout = () => {
// // //     setIsLoggedIn(false);
// // //     setCurrentPage('login'); // Go back to login page
// // //   };

// // //   const renderContent = () => {
// // //     if (!isLoggedIn) {
// // //       return <LoginPage onLogin={handleLoginSuccess} />;
// // //     }

// // //     switch (currentPage) {
// // //       case 'home':
// // //         return (
// // //           <HomePage
// // //             setCurrentPage={setCurrentPage}
// // //             openAddDataModal={() => setShowAddDataModal(true)}
// // //             openEditDataModal={() => setShowEditDataModal(true)}
// // //           />
// // //         );
// // //       case 'manage-database':
// // //         return <PlaceholderPage title="Manage Database" setCurrentPage={setCurrentPage} />;
// // //       case 'user-profile':
// // //         return <PlaceholderPage title="User Profile" setCurrentPage={setCurrentPage} />;
// // //       case 'view':
// // //         // Ensure ViewPage is rendered here, not PlaceholderPage
// // //         return <ViewPage setCurrentPage={setCurrentPage} />;
// // //       case 'accountant':
// // //         return <PlaceholderPage title="Accountant Dashboard" setCurrentPage={setCurrentPage} />;
// // //       default:
// // //         return <HomePage setCurrentPage={setCurrentPage} openAddDataModal={() => setShowAddDataModal(true)} openEditDataModal={() => setShowEditDataModal(true)} />;
// // //     }
// // //   };

// // //   return (
// // //     // Ensure the outermost div is a flex column container and takes full height/width
// // //     <div className="font-sans antialiased text-gray-900 min-h-screen w-full flex flex-col">
// // //       {isLoggedIn && (
// // //         <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
// // //           <div className="container mx-auto flex justify-between items-center">
// // //             <div className="text-2xl font-bold text-gray-800">Powered By Revolve IT Solutions</div>
// // //             <ul className="flex space-x-6">
// // //               <li>
// // //                 <button
// // //                   onClick={() => setCurrentPage('home')}
// // //                   className={`text-lg font-medium transition duration-300 ease-in-out ${
// // //                     currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
// // //                   }`}
// // //                 >
// // //                   Home
// // //                 </button>
// // //               </li>
// // //               <li>
// // //                 <button
// // //                   onClick={handleLogout}
// // //                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
// // //                 >
// // //                   Logout
// // //                 </button>
// // //               </li>
// // //             </ul>
// // //           </div>
// // //         </nav>
// // //       )}

// // //       {/* Make the main content area flexible to fill remaining space */}
// // //       <main className="flex-grow w-full">
// // //         {renderContent()}
// // //       </main>

// // //       {showAddDataModal && <AddDataModal onClose={() => setShowAddDataModal(false)} />}
// // //       {showEditDataModal && <EditDataModal onClose={() => setShowEditDataModal(false)} />}
// // //     </div>
// // //   );
// // // };

// // // export default App;


// // import React, { useState } from 'react';
// // import LoginPage from '@/components/LoginPage.jsx';
// // import HomePage from '@/components/HomePage.jsx';
// // import PlaceholderPage from '@/components/PlaceholderPage.jsx';
// // import AddDataModal from '@/components/AddDataModal.jsx';
// // import EditDataModal from '@/components/EditDataModal.jsx';
// // import ViewPage from '@/components/ViewPage.jsx'; // Ensure ViewPage is imported
// // import AccountantPage from '@/components/AccountantPage.jsx'; // New: Import the AccountantPage component

// // const App = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [currentPage, setCurrentPage] = useState('home'); // Default to home after login
// //   const [showAddDataModal, setShowAddDataModal] = useState(false);
// //   const [showEditDataModal, setShowEditDataModal] = useState(false);

// //   const handleLoginSuccess = () => {
// //     setIsLoggedIn(true);
// //     setCurrentPage('home'); // Navigate to home after successful login
// //   };

// //   const handleLogout = () => {
// //     setIsLoggedIn(false);
// //     setCurrentPage('login'); // Go back to login page
// //   };

// //   const renderContent = () => {
// //     if (!isLoggedIn) {
// //       return <LoginPage onLogin={handleLoginSuccess} />;
// //     }

// //     switch (currentPage) {
// //       case 'home':
// //         return (
// //           <HomePage
// //             setCurrentPage={setCurrentPage}
// //             openAddDataModal={() => setShowAddDataModal(true)}
// //             openEditDataModal={() => setShowEditDataModal(true)}
// //           />
// //         );
// //       case 'manage-database':
// //         return <PlaceholderPage title="Manage Database" setCurrentPage={setCurrentPage} />;
// //       case 'user-profile':
// //         return <PlaceholderPage title="User Profile" setCurrentPage={setCurrentPage} />;
// //       case 'view':
// //         // Updated: Render the ViewPage component instead of a placeholder
// //         return <ViewPage setCurrentPage={setCurrentPage} />;
// //       case 'accountant':
// //         // Updated: Render the AccountantPage component instead of a placeholder
// //         return <AccountantPage setCurrentPage={setCurrentPage} />;
// //       default:
// //         return <HomePage setCurrentPage={setCurrentPage} openAddDataModal={() => setShowAddDataModal(true)} openEditDataModal={() => setShowEditDataModal(true)} />;
// //     }
// //   };

// //   return (
// //     // Ensure the outermost div is a flex column container and takes full height/width
// //     <div className="font-sans antialiased text-gray-900 min-h-screen w-full flex flex-col">
// //       {isLoggedIn && (
// //         <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
// //           <div className="container mx-auto flex justify-between items-center">
// //             <div className="text-2xl font-bold text-gray-800">Powered By Revolve IT Solutions</div>
// //             <ul className="flex space-x-6">
// //               <li>
// //                 <button
// //                   onClick={() => setCurrentPage('home')}
// //                   className={`text-lg font-medium transition duration-300 ease-in-out ${
// //                     currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
// //                   }`}
// //                 >
// //                   Home
// //                 </button>
// //               </li>
// //               <li>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
// //                 >
// //                   Logout
// //                 </button>
// //               </li>
// //             </ul>
// //           </div>
// //         </nav>
// //       )}

// //       {/* Make the main content area flexible to fill remaining space */}
// //       <main className="flex-grow w-full">
// //         {renderContent()}
// //       </main>

// //       {showAddDataModal && <AddDataModal onClose={() => setShowAddDataModal(false)} />}
// //       {showEditDataModal && <EditDataModal onClose={() => setShowEditDataModal(false)} />}
// //     </div>
// //   );
// // };

// // export default App;

//     import React, { useState } from 'react';
//     import LoginPage from '@/components/LoginPage.jsx';
//     import HomePage from '@/components/HomePage.jsx';
//     import PlaceholderPage from '@/components/PlaceholderPage.jsx';
//     import AddDataModal from '@/components/AddDataModal.jsx';
//     import EditDataModal from '@/components/EditDataModal.jsx';
//     import ViewPage from '@/components/ViewPage.jsx';
//     import AccountantPage from '@/components/AccountantPage.jsx';

//     const App = () => {
//       const [isLoggedIn, setIsLoggedIn] = useState(false);
//       const [currentPage, setCurrentPage] = useState('home');
//       const [showAddDataModal, setShowAddDataModal] = useState(false);
//       const [showEditDataModal, setShowEditDataModal] = useState(false);
      
//       // NEW: State for user ID and role
//       const [currentUserId, setCurrentUserId] = useState(null);
//       const [currentUserRole, setCurrentUserRole] = useState(null);

//       const handleLoginSuccess = (userId, username, role) => {
//         setIsLoggedIn(true);
//         setCurrentUserId(userId);
//         setCurrentUserRole(role);
//         setCurrentPage('home');
//       };

//       const handleLogout = () => {
//         setIsLoggedIn(false);
//         setCurrentUserId(null);
//         setCurrentUserRole(null);
//         setCurrentPage('login');
//       };

//       const renderContent = () => {
//         if (!isLoggedIn) {
//           // Pass the login success handler to LoginPage
//           return <LoginPage onLoginSuccess={handleLoginSuccess} />;
//         }

//         switch (currentPage) {
//           case 'home':
//             return (
//               <HomePage
//                 setCurrentPage={setCurrentPage}
//                 openAddDataModal={() => setShowAddDataModal(true)}
//                 openEditDataModal={() => setShowEditDataModal(true)}
//               />
//             );
//           case 'manage-database':
//             return <PlaceholderPage title="Manage Database" setCurrentPage={setCurrentPage} />;
//           case 'user-profile':
//             return <PlaceholderPage title="User Profile" setCurrentPage={setCurrentPage} />;
//           case 'view':
//             // Pass user ID and role to ViewPage for filtering
//             return <ViewPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
//           case 'accountant':
//             // Pass user ID and role to AccountantPage for filtering and authorization
//             return <AccountantPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
//           default:
//             return <HomePage setCurrentPage={setCurrentPage} openAddDataModal={() => setShowAddDataModal(true)} openEditDataModal={() => setShowEditDataModal(true)} />;
//         }
//       };

//       return (
//         <div className="font-sans antialiased text-gray-900 min-h-screen w-full flex flex-col">
//           {isLoggedIn && (
//             <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
//               <div className="container mx-auto flex justify-between items-center">
//                 <div className="text-2xl font-bold text-gray-800">Powered By Revolve IT Solutions</div>
//                 <ul className="flex space-x-6">
//                   <li>
//                     <button
//                       onClick={() => setCurrentPage('home')}
//                       className={`text-lg font-medium transition duration-300 ease-in-out ${
//                         currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
//                       }`}
//                     >
//                       Home
//                     </button>
//                   </li>
//                   <li>
//                     {/* Display current user's username and role */}
//                     {currentUserId && currentUserRole && (
//                       <span className="text-gray-700 text-lg font-medium mr-4">
//                         Logged in as: {currentUserId} ({currentUserRole})
//                       </span>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </nav>
//           )}

//           <main className="flex-grow w-full">
//             {renderContent()}
//           </main>

//           {showAddDataModal && <AddDataModal onClose={() => setShowAddDataModal(false)} userId={currentUserId} />}
//           {showEditDataModal && <EditDataModal onClose={() => setShowEditDataModal(false)} userId={currentUserId} userRole={currentUserRole} />}
//         </div>
//       );
//     };

//     export default App;
    
// import React, { useState } from 'react';
// import LoginPage from '@/components/LoginPage.jsx';
// import HomePage from '@/components/HomePage.jsx';
// import PlaceholderPage from '@/components/PlaceholderPage.jsx';
// import AddDataModal from '@/components/AddDataModal.jsx';
// import EditDataModal from '@/components/EditDataModal.jsx';
// import ViewPage from '@/components/ViewPage.jsx';
// import AccountantPage from '@/components/AccountantPage.jsx';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentPage, setCurrentPage] = useState('home');
//   const [showAddDataModal, setShowAddDataModal] = useState(false);
//   const [showEditDataModal, setShowEditDataModal] = useState(false);
  
//   // State for user ID, username, and role
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [currentUsername, setCurrentUsername] = useState(null);
//   const [currentUserRole, setCurrentUserRole] = useState(null);

//   const handleLoginSuccess = (userId, username, role) => {
//     setIsLoggedIn(true);
//     setCurrentUserId(userId);
//     setCurrentUsername(username);
//     setCurrentUserRole(role);
//     setCurrentPage('home');
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setCurrentUserId(null);
//     setCurrentUsername(null);
//     setCurrentUserRole(null);
//     setCurrentPage('login');
//   };

//   const renderContent = () => {
//     if (!isLoggedIn) {
//       return <LoginPage onLoginSuccess={handleLoginSuccess} />;
//     }

//     switch (currentPage) {
//       case 'home':
//         return (
//           <HomePage
//             setCurrentPage={setCurrentPage}
//             openAddDataModal={() => setShowAddDataModal(true)}
//             openEditDataModal={() => setShowEditDataModal(true)}
//             currentUserRole={currentUserRole} // Pass currentUserRole to HomePage
//           />
//         );
//       case 'manage-database':
//         // PlaceholderPage doesn't need userRole for now, but you can pass it if needed later
//         return <PlaceholderPage title="Manage Database" setCurrentPage={setCurrentPage} />;
//       case 'user-profile':
//         // PlaceholderPage doesn't need userRole for now, but you can pass it if needed later
//         return <PlaceholderPage title="User Profile" setCurrentPage={setCurrentPage} />;
//       case 'view':
//         return <ViewPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
//       case 'accountant':
//         return <AccountantPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
//       default:
//         return (
//           <HomePage
//             setCurrentPage={setCurrentPage}
//             openAddDataModal={() => setShowAddDataModal(true)}
//             openEditDataModal={() => setShowEditDataModal(true)}
//             currentUserRole={currentUserRole} // Pass currentUserRole to HomePage
//           />
//         );
//     }
//   };

//   return (
//     <div className="font-sans antialiased text-gray-900 min-h-screen w-full flex flex-col">
//       {isLoggedIn && (
//         <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
//           <div className="container mx-auto flex justify-between items-center">
//             <div className="text-2xl font-bold text-gray-800">Powered By Revolve IT Solutions</div>
//             <ul className="flex space-x-6">
//               <li>
//                 <button
//                   onClick={() => setCurrentPage('home')}
//                   className={`text-lg font-medium transition duration-300 ease-in-out ${
//                     currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   Home
//                 </button>
//               </li>
//               {/* Removed Accountant and User Profile buttons from here */}
//               <li>
//                 {/* Display current user's username and role */}
//                 {currentUsername && currentUserRole && (
//                   <span className="text-gray-700 text-lg font-medium mr-4">
//                     Logged in as: {currentUsername} ({currentUserRole})
//                   </span>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       )}

//       <main className="flex-grow w-full">
//         {renderContent()}
//       </main>

//       {showAddDataModal && <AddDataModal onClose={() => setShowAddDataModal(false)} userId={currentUserId} username={currentUsername} />}
//       {showEditDataModal && <EditDataModal onClose={() => setShowEditDataModal(false)} userId={currentUserId} userRole={currentUserRole} />}
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import LoginPage from '@/components/LoginPage.jsx';
// import HomePage from '@/components/HomePage.jsx';
// import PlaceholderPage from '@/components/PlaceholderPage.jsx'; // Keep PlaceholderPage for other routes if needed
// import AddDataModal from '@/components/AddDataModal.jsx';
// import EditDataModal from '@/components/EditDataModal.jsx';
// import ViewPage from '@/components/ViewPage.jsx';
// import AccountantPage from '@/components/AccountantPage.jsx';
// import UserProfilePage from '@/components/UserProfilePage.jsx'; // NEW: Import UserProfilePage

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentPage, setCurrentPage] = useState('home');
//   const [showAddDataModal, setShowAddDataModal] = useState(false);
//   const [showEditDataModal, setShowShowEditDataModal] = useState(false);
  
//   // State for user ID, username, and role
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [currentUsername, setCurrentUsername] = useState(null);
//   const [currentUserRole, setCurrentUserRole] = useState(null);

//   const handleLoginSuccess = (userId, username, role) => {
//     setIsLoggedIn(true);
//     setCurrentUserId(userId);
//     setCurrentUsername(username);
//     setCurrentUserRole(role);
//     setCurrentPage('home');
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setCurrentUserId(null);
//     setCurrentUsername(null);
//     setCurrentUserRole(null);
//     setCurrentPage('login');
//   };

//   const renderContent = () => {
//     if (!isLoggedIn) {
//       return <LoginPage onLoginSuccess={handleLoginSuccess} />;
//     }

//     switch (currentPage) {
//       case 'home':
//         return (
//           <HomePage
//             setCurrentPage={setCurrentPage}
//             openAddDataModal={() => setShowAddDataModal(true)}
//             openEditDataModal={() => setShowShowEditDataModal(true)}
//             currentUserRole={currentUserRole}
//           />
//         );
//       case 'manage-database':
//         return <PlaceholderPage title="Manage Database" setCurrentPage={setCurrentPage} />;
//       case 'user-profile':
//         // MODIFIED: Render UserProfilePage and pass user info
//         return (
//           <UserProfilePage
//             setCurrentPage={setCurrentPage}
//             currentUserId={currentUserId}
//             currentUsername={currentUsername}
//             currentUserRole={currentUserRole}
//           />
//         );
//       case 'view':
//         return <ViewPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
//       case 'accountant':
//         return <AccountantPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
//       default:
//         return (
//           <HomePage
//             setCurrentPage={setCurrentPage}
//             openAddDataModal={() => setShowAddDataModal(true)}
//             openEditDataModal={() => setShowShowEditDataModal(true)}
//             currentUserRole={currentUserRole}
//           />
//         );
//     }
//   };

//   return (
//     <div className="font-sans antialiased text-gray-900 min-h-screen w-full flex flex-col">
//       {isLoggedIn && (
//         <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
//           <div className="container mx-auto flex justify-between items-center">
//             <div className="text-2xl font-bold text-gray-800">Powered By Revolve IT Solutions</div>
//             <ul className="flex space-x-6">
//               <li>
//                 <button
//                   onClick={() => setCurrentPage('home')}
//                   className={`text-lg font-medium transition duration-300 ease-in-out ${
//                     currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   Home
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setCurrentPage('accountant')}
//                   className={`text-lg font-medium transition duration-300 ease-in-out ${
//                     currentPage === 'accountant' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   Accountant
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => setCurrentPage('user-profile')}
//                   className={`text-lg font-medium transition duration-300 ease-in-out ${
//                     currentPage === 'user-profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   User Profile
//                 </button>
//               </li>
//               <li>
//                 {currentUsername && currentUserRole && (
//                   <span className="text-gray-700 text-lg font-medium mr-4">
//                     Logged in as: {currentUsername} ({currentUserRole})
//                   </span>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       )}

//       <main className="flex-grow w-full">
//         {renderContent()}
//       </main>

//       {showAddDataModal && <AddDataModal onClose={() => setShowAddDataModal(false)} userId={currentUserId} username={currentUsername} />}
//       {showEditDataModal && <EditDataModal onClose={() => setShowShowEditDataModal(false)} userId={currentUserId} userRole={currentUserRole} />}
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage.jsx';
import HomePage from '@/components/HomePage.jsx';
// REMOVED: import PlaceholderPage from '@/components/PlaceholderPage.jsx';
import AddDataModal from '@/components/AddDataModal.jsx';
import EditDataModal from '@/components/EditDataModal.jsx';
import ViewPage from '@/components/ViewPage.jsx';
import AccountantPage from '@/components/AccountantPage.jsx';
import UserProfilePage from '@/components/UserProfilePage.jsx'; // CORRECTED: Import UserProfilePage

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  const [showEditDataModal, setShowEditDataModal] = useState(false); 
  
  // State for user ID, username, and role
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  const handleLoginSuccess = (userId, username, role) => {
    setIsLoggedIn(true);
    setCurrentUserId(userId);
    setCurrentUsername(username);
    setCurrentUserRole(role);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserId(null);
    setCurrentUsername(null);
    setCurrentUserRole(null);
    setCurrentPage('login');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            openAddDataModal={() => setShowAddDataModal(true)}
            openEditDataModal={() => setShowEditDataModal(true)} 
            currentUserRole={currentUserRole}
          />
        );
      case 'manage-database':
        // This case will now display a generic message, as its functionality is moved
        return (
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <h1 className="text-xl">Manage Database Page Content Placeholder (Consider integrating into UserProfilePage)</h1>
            <button
              onClick={() => setCurrentPage('home')}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Back to Home
            </button>
          </div>
        );
      case 'user-profile':
        // Render UserProfilePage and pass user info
        return (
          <UserProfilePage
            setCurrentPage={setCurrentPage}
            currentUserId={currentUserId}
            currentUsername={currentUsername}
            currentUserRole={currentUserRole}
          />
        );
      case 'view':
        return <ViewPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
      case 'accountant':
        return <AccountantPage setCurrentPage={setCurrentPage} userId={currentUserId} userRole={currentUserRole} />;
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            openAddDataModal={() => setShowAddDataModal(true)}
            openEditDataModal={() => setShowEditDataModal(true)} 
            currentUserRole={currentUserRole}
          />
        );
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 min-h-screen w-full flex flex-col">
      {isLoggedIn && (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">Revolve LLC</div> {/* Updated Company Name */}
            <ul className="flex space-x-6">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`text-lg font-medium transition duration-300 ease-in-out ${
                    currentPage === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Home
                </button>
              </li>
              {/* Removed Accountant and User Profile buttons from the global navigation bar */}
              <li>
                {currentUsername && currentUserRole && (
                  <span className="text-gray-700 text-lg font-medium mr-4">
                    Logged in as: {currentUsername} ({currentUserRole})
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}

      <main className="flex-grow w-full">
        {renderContent()}
      </main>

      {showAddDataModal && <AddDataModal onClose={() => setShowAddDataModal(false)} userId={currentUserId} username={currentUsername} />}
      {showEditDataModal && <EditDataModal onClose={() => setShowEditDataModal(false)} userId={currentUserId} userRole={currentUserRole} />}
    </div>
  );
};

export default App;
