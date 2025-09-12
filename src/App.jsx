

//LATEST VERSION //


// import React, { useState } from 'react';
// import LoginPage from '@/components/LoginPage.jsx';
// import HomePage from '@/components/HomePage.jsx';
// // REMOVED: import PlaceholderPage from '@/components/PlaceholderPage.jsx';
// import AddDataModal from '@/components/AddDataModal.jsx';
// import EditDataModal from '@/components/EditDataModal.jsx';
// import ViewPage from '@/components/ViewPage.jsx';
// import AccountantPage from '@/components/AccountantPage.jsx';
// import UserProfilePage from '@/components/UserProfilePage.jsx'; // CORRECTED: Import UserProfilePage

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
//             currentUserRole={currentUserRole}
//           />
//         );
//       case 'manage-database':
//         // This case will now display a generic message, as its functionality is moved
//         return (
//           <div className="flex justify-center items-center h-screen bg-gray-100">
//             <h1 className="text-xl">Manage Database Page Content Placeholder (Consider integrating into UserProfilePage)</h1>
//             <button
//               onClick={() => setCurrentPage('home')}
//               className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//             >
//               Back to Home
//             </button>
//           </div>
//         );
//       case 'user-profile':
//         // Render UserProfilePage and pass user info
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
//             openEditDataModal={() => setShowEditDataModal(true)} 
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
//             <div className="text-2xl font-bold text-gray-800">Revolve LLC</div> {/* Updated Company Name */}
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
//               {/* Removed Accountant and User Profile buttons from the global navigation bar */}
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
//       {showEditDataModal && <EditDataModal onClose={() => setShowEditDataModal(false)} userId={currentUserId} userRole={currentUserRole} />}
//     </div>
//   );
// };

// export default App;


//LATEST VERSION END //


import React, { useState, useEffect } from 'react';
import LoginPage from '@/components/LoginPage.jsx';
import HomePage from '@/components/HomePage.jsx';
import AddDataModal from '@/components/AddDataModal.jsx';
import EditDataModal from '@/components/EditDataModal.jsx';
import ViewPage from '@/components/ViewPage.jsx';
import AccountantPage from '@/components/AccountantPage.jsx';
import UserProfilePage from '@/components/UserProfilePage.jsx';
import SettingsPage from '@/components/SettingsPage.jsx'; // Import the new SettingsPage

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  const [showEditDataModal, setShowEditDataModal] = useState(false);

  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  // --- NEW: State for dropdown options ---
  const [contractOptions, setContractOptions] = useState([]);
  const [creditCardOptions, setCreditCardOptions] = useState([]);

  // Fetch dropdown options when the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      const fetchOptions = async () => {
        try {
          const [contractsRes, cardsRes] = await Promise.all([
            fetch('https://rev-lumina.onrender.com/api/contract-options'),
            fetch('https://rev-lumina.onrender.com/api/credit-card-options'),
          ]);
          const contracts = await contractsRes.json();
          const cards = await cardsRes.json();
          setContractOptions(contracts);
          setCreditCardOptions(cards);
        } catch (error) {
          console.error("Failed to fetch dropdown options:", error);
        }
      };
      fetchOptions();
    }
  }, [isLoggedIn]);


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
      // --- NEW: Add case for settings page ---
      case 'settings':
        return <SettingsPage setCurrentPage={setCurrentPage} currentUserRole={currentUserRole} />;
      case 'user-profile':
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
            <div className="text-2xl font-bold text-gray-800">Revolve LLC</div>
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

        {showAddDataModal &&
        <AddDataModal
            onClose={() => setShowAddDataModal(false)}
            userId={currentUserId}
            username={currentUsername}
            contractOptions={contractOptions}
            creditCardOptions={creditCardOptions}
        />}
        {showEditDataModal &&
        <EditDataModal
            onClose={() => setShowEditDataModal(false)}
            userId={currentUserId}
            userRole={currentUserRole}
            username={currentUsername}
            contractOptions={contractOptions}
            creditCardOptions={creditCardOptions}
        />}
    </div>
  );
};

export default App;