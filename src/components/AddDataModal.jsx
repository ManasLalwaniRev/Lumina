// // // src/components/AddDataModal.jsx
// // import React, { useState, useEffect } from 'react'; // Import useEffect
// // import Modal from './Modal.jsx'; // Import the generic Modal component

// // const AddDataModal = ({ onClose }) => {
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [formData, setFormData] = useState({
// //     primeKey: '', // Added primeKey to formData
// //     creditCard: '',
// //     contractShortName: '',
// //     vendorName: '',
// //     chargeDate: new Date().toISOString().slice(0, 10), // Default to today
// //     chargeCode: '',
// //     chargeAmount: '',
// //     submittedDate: new Date().toISOString().slice(0, 10), // Default to today
// //     submitter: 'revolve', // Default submitter
// //     notes: '',
// //   });

// //   // Dummy state to simulate existing records for prime key generation
// //   // In a real app, this would come from a global state or database
// //   const [existingRecordsCount, setExistingRecordsCount] = useState(3); // Start after dummy records in EditDataModal

// //   // Effect to set default submitter when component mounts or form is reset
// //   useEffect(() => {
// //     setFormData(prev => ({ ...prev, submitter: 'revolve' }));
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { id, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [id]: value,
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Generate a new prime key for the new entry
// //     const newPrimeKey = (existingRecordsCount + 1).toString();
// //     setExistingRecordsCount(prevCount => prevCount + 1); // Increment for next new record

// //     const newEntry = {
// //       ...formData,
// //       primeKey: newPrimeKey,
// //       id: Date.now(), // Simple unique ID for dummy data
// //       submitter: 'revolve', // Ensure submitter remains default
// //     };

// //     console.log('New entry submitted (simulated):', newEntry);
// //     // In a real app, you'd send newEntry to your database API here

// //     setShowSuccessMessage(true);

// //     setTimeout(() => {
// //       setShowSuccessMessage(false);
// //       onClose(); // Close the modal after the message disappears
// //     }, 3000);
// //   };

// //   return (
// //     <Modal title="Add New Entry" onClose={onClose}>
// //       <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg">
// //         {/* Success Message Pop-up */}
// //         {showSuccessMessage && (
// //           <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">
// //             Data Added!
// //           </div>
// //         )}

// //         <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
// //           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
// //             Enter New Charge Details
// //           </span>
// //         </h2>

// //         <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6" onSubmit={handleSubmit}>
// //           {/* Prime Key Field (Non-editable) - Display only for new entries */}
// //           <div className="col-span-1">
// //             <label htmlFor="primeKey" className="block text-sm font-medium text-gray-700 mb-1">
// //               PRIME KEY (Auto-generated)
// //             </label>
// //             <input
// //               type="text"
// //               id="primeKey"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-300 cursor-not-allowed" // Disabled styling
// //               value={formData.primeKey || (existingRecordsCount + 1).toString()} // Show next prime key or current if selected
// //               readOnly // Make it read-only
// //             />
// //           </div>

// //           {/* Row 1 */}
// //           <div className="col-span-1">
// //             <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700 mb-1">
// //               CREDIT CARD (If Charged To Card)
// //             </label>
// //             <select
// //               id="creditCard"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white appearance-none pr-8"
// //               value={formData.creditCard}
// //               onChange={handleInputChange}
// //             >
// //               <option value="">Select Card</option>
// //               <option value="visa">Visa</option>
// //               <option value="mastercard">MasterCard</option>
// //               <option value="amex">American Express</option>
// //               <option value="no-credit-card">No Credit Card</option> {/* Added No Credit Card option */}
// //             </select>
// //           </div>

// //           <div className="col-span-1">
// //             <label htmlFor="contractShortName" className="block text-sm font-medium text-gray-700 mb-1">
// //               CONTRACT SHORT NAME
// //             </label>
// //             <input
// //               type="text"
// //               id="contractShortName"
// //               placeholder="e.g., ABC Project"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.contractShortName}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           {/* Row 2 */}
// //           <div className="col-span-1">
// //             <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 mb-1">
// //               VENDOR NAME
// //             </label>
// //             <input
// //               type="text"
// //               id="vendorName"
// //               placeholder="e.g., Supplier Inc."
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.vendorName}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           <div className="col-span-1">
// //             <label htmlFor="chargeDate" className="block text-sm font-medium text-gray-700 mb-1">
// //               CHARGE DATE
// //             </label>
// //             <input
// //               type="date"
// //               id="chargeDate"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
// //               value={formData.chargeDate}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           {/* Row 3 */}
// //           <div className="col-span-1">
// //             <label htmlFor="chargeAmount" className="block text-sm font-medium text-gray-700 mb-1">
// //               CHARGE AMOUNT
// //             </label>
// //             <input
// //               type="number"
// //               id="chargeAmount"
// //               placeholder="e.g., 123.45"
// //               step="0.01"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.chargeAmount}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           <div className="col-span-1">
// //             <label htmlFor="submittedDate" className="block text-sm font-medium text-gray-700 mb-1">
// //               SUBMITTED DATE
// //             </label>
// //             <input
// //               type="date"
// //               id="submittedDate"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
// //               value={formData.submittedDate}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           {/* Row 4 */}
// //           <div className="col-span-1">
// //             <label htmlFor="submitter" className="block text-sm font-medium text-gray-700 mb-1">
// //               SUBMITTER
// //             </label>
// //             <select
// //               id="submitter"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-700 text-gray-300 cursor-not-allowed appearance-none pr-8" // Disabled styling
// //               value={formData.submitter}
// //               readOnly // Make it read-only
// //               disabled // Disable the select element
// //             >
// //               <option value="revolve">Revolve</option>
// //             </select>
// //           </div>

// //           {/* Charge Code and Notes span full width */}
// //           <div className="col-span-full">
// //             <label htmlFor="chargeCode" className="block text-sm font-medium text-gray-700 mb-1">
// //               CHARGE CODE (Shift+Enter for New Line)
// //             </label>
// //             <textarea
// //               id="chargeCode"
// //               placeholder="Enter charge codes..."
// //               rows="3"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.chargeCode}
// //               onChange={handleInputChange}
// //             ></textarea>
// //           </div>

// //           <div className="col-span-full">
// //             <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
// //               NOTES
// //             </label>
// //             <textarea
// //               id="notes"
// //               placeholder="Add any additional notes here..."
// //               rows="3"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.notes}
// //               onChange={handleInputChange}
// //             ></textarea>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="col-span-full flex justify-end mt-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //             >
// //               Enter
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </Modal>
// //   );
// // };

// // export default AddDataModal;


// // lumina_pct/src/components/AddDataModal.jsx

// // lumina_pct/src/components/AddDataModal.jsx
// // import React, { useState } from 'react';
// // import Modal from './Modal.jsx'; // Import the generic Modal component

// // const API_BASE_URL = 'http://localhost:5000/api/entries'; // Your backend API base URL

// // const AddDataModal = ({ onClose }) => {
// //   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
// //   const [showErrorMessage, setShowErrorMessage] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false); // New loading state

// //   const [formData, setFormData] = useState({
// //     creditCard: '',
// //     contractShortName: '',
// //     vendorName: '',
// //     chargeDate: new Date().toISOString().slice(0, 10), // Default to today (YYYY-MM-DD)
// //     chargeCode: '',
// //     chargeAmount: '', // Keep as string initially for input
// //     submittedDate: new Date().toISOString().slice(0, 10), // Default to today (YYYY-MM-DD)
// //     submitter: 'revolve', // Default submitter, non-editable
// //     notes: '',
// //     pdfFilePath: '', // New field for PDF file path
// //   });

// //   const handleInputChange = (e) => {
// //     const { id, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [id]: value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setShowSuccessMessage(false);
// //     setShowErrorMessage(false);
// //     setIsLoading(true); // Start loading

// //     // Prepare data for submission
// //     const dataToSend = { ...formData };
// //     // Convert chargeAmount to null if it's an empty string, otherwise convert to number
// //     dataToSend.chargeAmount = dataToSend.chargeAmount === '' ? null : parseFloat(dataToSend.chargeAmount);

// //     try {
// //       const response = await fetch(API_BASE_URL, { // API endpoint for new entries
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(dataToSend), // Use dataToSend
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || 'Failed to add data');
// //       }

// //       const result = await response.json();
// //       console.log('New entry added successfully:', result);

// //       setShowSuccessMessage(true);
// //       setTimeout(() => {
// //         setShowSuccessMessage(false);
// //         onClose(); // Close the modal after success message disappears
// //       }, 3000);

// //     } catch (error) {
// //       console.error('Error submitting new entry:', error);
// //       setShowErrorMessage(true);
// //       setTimeout(() => {
// //         setShowErrorMessage(false);
// //       }, 5000); // Show error message for 5 seconds
// //     } finally {
// //       setIsLoading(false); // End loading
// //     }
// //   };

// //   return (
// //     <Modal title="Add New Entry" onClose={onClose}>
// //       <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg">
// //         {/* Success Message Pop-up */}
// //         {showSuccessMessage && (
// //           <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">
// //             Data Added!
// //           </div>
// //         )}
// //         {/* Error Message Pop-up */}
// //         {showErrorMessage && (
// //           <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">
// //             Failed to add data. Please try again.
// //           </div>
// //         )}

// //         <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
// //           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
// //             Enter New Charge Details
// //           </span>
// //         </h2>

// //         <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6" onSubmit={handleSubmit}>
// //           {/* Prime Key is auto-generated by backend, not shown here */}

// //           {/* Row 1: Credit Card */}
// //           <div className="col-span-1">
// //             <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700 mb-1">
// //               CREDIT CARD (If Charged To Card)
// //             </label>
// //             <select
// //               id="creditCard"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white appearance-none pr-8"
// //               value={formData.creditCard}
// //               onChange={handleInputChange}
// //             >
// //               <option value="">Select Card</option>
// //               <option value="visa">Visa</option>
// //               <option value="mastercard">MasterCard</option>
// //               <option value="amex">American Express</option>
// //               <option value="no-credit-card">No Credit Card</option> {/* Added No Credit Card option */}
// //             </select>
// //           </div>

// //           {/* Contract Short Name */}
// //           <div className="col-span-1">
// //             <label htmlFor="contractShortName" className="block text-sm font-medium text-gray-700 mb-1">
// //               CONTRACT SHORT NAME
// //             </label>
// //             <input
// //               type="text"
// //               id="contractShortName"
// //               placeholder="e.g., ABC Project"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.contractShortName}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           {/* Row 2: Vendor Name & Charge Date */}
// //           <div className="col-span-1">
// //             <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 mb-1">
// //               VENDOR NAME
// //             </label>
// //             <input
// //               type="text"
// //               id="vendorName"
// //               placeholder="e.g., Supplier Inc."
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.vendorName}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           <div className="col-span-1">
// //             <label htmlFor="chargeDate" className="block text-sm font-medium text-gray-700 mb-1">
// //               CHARGE DATE
// //             </label>
// //             <input
// //               type="date"
// //               id="chargeDate"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
// //               value={formData.chargeDate}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           {/* Row 3: Charge Amount & Submitted Date */}
// //           <div className="col-span-1">
// //             <label htmlFor="chargeAmount" className="block text-sm font-medium text-gray-700 mb-1">
// //               CHARGE AMOUNT
// //             </label>
// //             <input
// //               type="number"
// //               id="chargeAmount"
// //               placeholder="e.g., 123.45"
// //               step="0.01"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.chargeAmount}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           <div className="col-span-1">
// //             <label htmlFor="submittedDate" className="block text-sm font-medium text-gray-700 mb-1">
// //               SUBMITTED DATE
// //             </label>
// //             <input
// //               type="date"
// //               id="submittedDate"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
// //               value={formData.submittedDate}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           {/* Row 4: Submitter & PDF File Path */}
// //           <div className="col-span-1">
// //             <label htmlFor="submitter" className="block text-sm font-medium text-gray-700 mb-1">
// //               SUBMITTER
// //             </label>
// //             <select
// //               id="submitter"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-700 text-gray-300 cursor-not-allowed appearance-none pr-8"
// //               value={formData.submitter}
// //               readOnly
// //               disabled
// //             >
// //               <option value="revolve">Revolve</option>
// //             </select>
// //           </div>

// //           <div className="col-span-1">
// //             <label htmlFor="pdfFilePath" className="block text-sm font-medium text-gray-700 mb-1">
// //               PDF FILE PATH (Future Scope)
// //             </label>
// //             <input
// //               type="text"
// //               id="pdfFilePath"
// //               placeholder="e.g., /docs/report.pdf"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.pdfFilePath}
// //               onChange={handleInputChange}
// //             />
// //           </div>

// //           {/* Charge Code and Notes span full width */}
// //           <div className="col-span-full">
// //             <label htmlFor="chargeCode" className="block text-sm font-medium text-gray-700 mb-1">
// //               CHARGE CODE (Shift+Enter for New Line)
// //             </label>
// //             <textarea
// //               id="chargeCode"
// //               placeholder="Enter charge codes..."
// //               rows="3"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.chargeCode}
// //               onChange={handleInputChange}
// //             ></textarea>
// //           </div>

// //           <div className="col-span-full">
// //             <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
// //               NOTES
// //             </label>
// //             <textarea
// //               id="notes"
// //               placeholder="Add any additional notes here..."
// //               rows="3"
// //               className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
// //               value={formData.notes}
// //               onChange={handleInputChange}
// //             ></textarea>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="col-span-full flex justify-end mt-4">
// //             <button
// //               type="submit"
// //               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //               disabled={isLoading}
// //             >
// //               {isLoading ? 'Adding...' : 'Enter'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </Modal>
// //   );
// // };

// // export default AddDataModal;


//         import React, { useState } from 'react';
//     import Modal from './Modal.jsx'; // Import the generic Modal component

//     const API_BASE_URL = 'http://localhost:5000/api/entries'; // Your backend API base URL

//     const AddDataModal = ({ onClose, userId }) => { // Receive userId
//       const [formData, setFormData] = useState({
//         creditCard: '',
//         contractShortName: '',
//         vendorName: '',
//         chargeDate: '',
//         chargeAmount: '',
//         submittedDate: '',
//         submitter: 'revolve', // Default submitter
//         chargeCode: '',
//         notes: '',
//         pdfFilePath: '',
//       });
//       const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//       const [showErrorMessage, setShowErrorMessage] = useState(false);
//       const [isLoading, setIsLoading] = useState(false);

//       const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevData) => ({
//           ...prevData,
//           [id]: value,
//         }));
//       };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         setShowSuccessMessage(false);
//         setShowErrorMessage(false);
//         setIsLoading(true);

//         try {
//           const response = await fetch(`${API_BASE_URL}/new`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ ...formData, userId }), // Include userId in the payload
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || 'Failed to add entry');
//           }

//           const result = await response.json();
//           console.log('New entry added successfully:', result);

//           setShowSuccessMessage(true);
//           setTimeout(() => {
//             setShowSuccessMessage(false);
//             onClose(); // Close modal on success
//           }, 3000);
          
//           // Optionally, reset form data here
//           setFormData({
//             creditCard: '', contractShortName: '', vendorName: '', chargeDate: '',
//             chargeAmount: '', submittedDate: '', submitter: 'revolve', chargeCode: '', notes: '', pdfFilePath: '',
//           });

//         } catch (error) {
//           console.error('Error adding new entry:', error);
//           setShowErrorMessage(true);
//           setTimeout(() => {
//             setShowErrorMessage(false);
//           }, 5000);
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       return (
//         <Modal title="Add New Entry" onClose={onClose}>
//           <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto relative">
//             {showSuccessMessage && (
//               <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">
//                 Entry Added Successfully!
//               </div>
//             )}
//             {showErrorMessage && (
//               <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">
//                 Failed to add entry. Please try again.
//               </div>
//             )}

//             <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//                 Enter New Charge Details
//               </span>
//             </h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               {/* Form fields remain the same */}
//               <div className="col-span-1">
//                 <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700 mb-1">
//                   CREDIT CARD (If Charged To Card)
//                 </label>
//                 <select
//                   id="creditCard"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white appearance-none pr-8"
//                   value={formData.creditCard}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select Card</option>
//                   <option value="visa">Visa</option>
//                   <option value="mastercard">MasterCard</option>
//                   <option value="amex">American Express</option>
//                   <option value="no-credit-card">No Credit Card</option>
//                 </select>
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="contractShortName" className="block text-sm font-medium text-gray-700 mb-1">
//                   CONTRACT SHORT NAME
//                 </label>
//                 <input
//                   type="text"
//                   id="contractShortName"
//                   placeholder="e.g., ABC Project"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
//                   value={formData.contractShortName}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 mb-1">
//                   VENDOR NAME
//                 </label>
//                 <input
//                   type="text"
//                   id="vendorName"
//                   placeholder="e.g., Supplier Inc."
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
//                   value={formData.vendorName}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="chargeDate" className="block text-sm font-medium text-gray-700 mb-1">
//                   CHARGE DATE
//                 </label>
//                 <input
//                   type="date"
//                   id="chargeDate"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
//                   value={formData.chargeDate}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="chargeAmount" className="block text-sm font-medium text-gray-700 mb-1">
//                   CHARGE AMOUNT
//                 </label>
//                 <input
//                   type="number"
//                   id="chargeAmount"
//                   placeholder="e.g., 123.45"
//                   step="0.01"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
//                   value={formData.chargeAmount}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="submittedDate" className="block text-sm font-medium text-gray-700 mb-1">
//                   SUBMITTED DATE
//                 </label>
//                 <input
//                   type="date"
//                   id="submittedDate"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
//                   value={formData.submittedDate}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="submitter" className="block text-sm font-medium text-gray-700 mb-1">
//                   SUBMITTER
//                 </label>
//                 <select
//                   id="submitter"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-700 text-gray-300 cursor-not-allowed appearance-none pr-8"
//                   value={formData.submitter}
//                   readOnly
//                   disabled
//                 >
//                   <option value="revolve">Revolve</option>
//                 </select>
//               </div>

//               <div className="col-span-1">
//                 <label htmlFor="pdfFilePath" className="block text-sm font-medium text-gray-700 mb-1">
//                   PDF FILE PATH (Future Scope)
//                 </label>
//                 <input
//                   type="text"
//                   id="pdfFilePath"
//                   placeholder="e.g., /docs/report.pdf"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
//                   value={formData.pdfFilePath}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="col-span-full">
//                 <label htmlFor="chargeCode" className="block text-sm font-medium text-gray-700 mb-1">
//                   CHARGE CODE (Shift+Enter for New Line)
//                 </label>
//                 <textarea
//                   id="chargeCode"
//                   placeholder="Enter charge codes..."
//                   rows="3"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
//                   value={formData.chargeCode}
//                   onChange={handleInputChange}
//                 ></textarea>
//               </div>

//               <div className="col-span-full">
//                 <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
//                   NOTES
//                 </label>
//                 <textarea
//                   id="notes"
//                   placeholder="Add any additional notes here..."
//                   rows="3"
//                   className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
//                   value={formData.notes}
//                   onChange={handleInputChange}
//                 ></textarea>
//               </div>

//               <div className="col-span-full flex justify-end mt-4">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Adding...' : 'Add Entry'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </Modal>
//       );
//     };

//     export default AddDataModal;
    
import React, { useState, useEffect } from 'react'; // Import useEffect
import Modal from './Modal.jsx'; // Import the generic Modal component

// const API_BASE_URL = 'http://localhost:5000/api/entries'; // Your backend API base URL
 const API_BASE_URL = 'https://rev-lumina.onrender.com/api/entries';


const AddDataModal = ({ onClose, userId, username }) => { // Receive userId and username
  const [formData, setFormData] = useState({
    creditCard: '',
    contractShortName: '',
    vendorName: '',
    chargeDate: '',
    chargeAmount: '',
    submittedDate: '',
    submitter: '', // Initialize as empty, will be set by useEffect
    chargeCode: '',
    notes: '',
    pdfFilePath: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to set the submitter field when the username prop changes
  useEffect(() => {
    if (username) {
      setFormData((prevData) => ({
        ...prevData,
        submitter: username, // Set submitter to the logged-in username
      }));
    }
  }, [username]); // Depend on username prop

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId }), // Include userId in the payload
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add entry');
      }

      const result = await response.json();
      console.log('New entry added successfully:', result);

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose(); // Close modal on success
      }, 3000);
      
      // Optionally, reset form data here, but keep submitter from username
      setFormData((prevData) => ({
        creditCard: '', contractShortName: '', vendorName: '', chargeDate: '',
        chargeAmount: '', submittedDate: '', submitter: prevData.submitter, chargeCode: '', notes: '', pdfFilePath: '',
      }));

    } catch (error) {
      console.error('Error adding new entry:', error);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Add New Entry" onClose={onClose}>
      <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg max-h-[90vh] overflow-y-auto relative">
        {showSuccessMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">
            Entry Added Successfully!
          </div>
        )}
        {showErrorMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-down">
            Failed to add entry. Please try again.
          </div>
        )}

        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Enter New Charge Details
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-1">
            <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700 mb-1">
              CREDIT CARD (If Charged To Card)
            </label>
            <select
              id="creditCard"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white appearance-none pr-8"
              value={formData.creditCard}
              onChange={handleInputChange}
              required // Added required attribute
            >
              <option value="">Select Card</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="amex">American Express</option>
              <option value="no-credit-card">No Credit Card</option>
            </select>
          </div>

          <div className="col-span-1">
            <label htmlFor="contractShortName" className="block text-sm font-medium text-gray-700 mb-1">
              CONTRACT SHORT NAME
            </label>
            <input
              type="text"
              id="contractShortName"
              placeholder="e.g., ABC Project"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
              value={formData.contractShortName}
              onChange={handleInputChange}
              required // Added required attribute
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 mb-1">
              VENDOR NAME
            </label>
            <input
              type="text"
              id="vendorName"
              placeholder="e.g., Supplier Inc."
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
              value={formData.vendorName}
              onChange={handleInputChange}
              required // Added required attribute
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="chargeDate" className="block text-sm font-medium text-gray-700 mb-1">
              CHARGE DATE
            </label>
            <input
              type="date"
              id="chargeDate"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
              value={formData.chargeDate}
              onChange={handleInputChange}
              required // Added required attribute
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="chargeAmount" className="block text-sm font-medium text-gray-700 mb-1">
              CHARGE AMOUNT
            </label>
            <input
              type="number"
              id="chargeAmount"
              placeholder="e.g., 123.45"
              step="0.01"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
              value={formData.chargeAmount}
              onChange={handleInputChange}
              required // Added required attribute
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="submittedDate" className="block text-sm font-medium text-gray-700 mb-1">
              SUBMITTED DATE
            </label>
            <input
              type="date"
              id="submittedDate"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white"
              value={formData.submittedDate}
              onChange={handleInputChange}
              required // Added required attribute
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="submitter" className="block text-sm font-medium text-gray-700 mb-1">
              SUBMITTER
            </label>
            <input // Changed from select to input
              type="text"
              id="submitter"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-700 text-gray-300 cursor-not-allowed"
              value={formData.submitter}
              readOnly // Make it read-only
              disabled // Disable it to prevent interaction
              required // Added required attribute
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="pdfFilePath" className="block text-sm font-medium text-gray-700 mb-1">
              PDF FILE PATH (Future Scope)
            </label>
            <input
              type="text"
              id="pdfFilePath"
              placeholder="e.g., /docs/report.pdf"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out bg-gray-800 text-white placeholder-gray-400"
              value={formData.pdfFilePath}
              onChange={handleInputChange}
              // Not required
            />
          </div>

          <div className="col-span-full">
            <label htmlFor="chargeCode" className="block text-sm font-medium text-gray-700 mb-1">
              CHARGE CODE (Shift+Enter for New Line)
            </label>
            <textarea
              id="chargeCode"
              placeholder="Enter charge codes..."
              rows="3"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
              value={formData.chargeCode}
              onChange={handleInputChange}
              required // Added required attribute
            ></textarea>
          </div>

          <div className="col-span-full">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              NOTES
            </label>
            <textarea
              id="notes"
              placeholder="Add any additional notes here..."
              rows="3"
              className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out resize-y bg-gray-800 text-white placeholder-gray-400"
              value={formData.notes}
              onChange={handleInputChange}
              // Not required
            ></textarea>
          </div>

          <div className="col-span-full flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddDataModal;
