
    import React, { useState, useEffect } from 'react';

    // const API_BASE_URL = 'http://localhost:5000/api/entries'; 
    const API_BASE_URL = 'https://rev-lumina.onrender.com/api/entries'; // This is your live Render API URL

    // Helper to convert snake_case keys to camelCase.
    const snakeToCamel = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(v => snakeToCamel(v));
      } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
          const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
          acc[camelKey] = snakeToCamel(obj[key]);
          return acc;
        }, {});
      }
      return obj;
    };

    // Helper to format date for display (MM/DD/YYYY).
    const formatDateForDisplay = (isoString) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      if (isNaN(date.getTime())) {
        console.warn("Invalid date string received:", isoString);
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };

    // Helper to check if a primeKey indicates an updated entry.
    const isUpdatedEntry = (primeKey) => primeKey && primeKey.includes('.');

    // Helper function to format date for input (YYYY-MM-DD).
    const formatDateForInput = (isoString) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      if (isNaN(date.getTime())) {
        console.warn("Invalid date string for input:", isoString);
        return '';
      }
      return date.toISOString().slice(0, 10);
    };


    const AccountantPage = ({ setCurrentPage, userId, userRole }) => { // Receive userId and userRole
      const [dataEntries, setDataEntries] = useState([]);
      const [filteredEntries, setFilteredEntries] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
      
      const [filters, setFilters] = useState({
        primeKey: '', creditCard: '', contractShortName: '', vendorName: '', chargeDate: '',
        chargeAmount: '', submittedDate: '', submitter: '', chargeCode: '', notes: '', pdfFilePath: '',
        accountingProcessed: '', dateProcessed: '', apvNumber: ''
      });

      const [editedData, setEditedData] = useState({});

      // MODIFIED: fetchEntries now includes userId and userRole in the query
      const fetchEntries = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Include userId and userRole in the query parameters for filtering
          const response = await fetch(`${API_BASE_URL}?userId=${userId}&userRole=${userRole}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch data entries');
          }
          const data = await response.json();
          const camelCaseData = snakeToCamel(data);
          setDataEntries(camelCaseData);
        } catch (err) {
          console.error('Error fetching data entries:', err);
          setError('Failed to load data. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        if (userId && userRole) { // Only fetch if user info is available
          fetchEntries();
        }
      }, [userId, userRole]); // Re-fetch when userId or userRole changes

      // useEffect to filter data whenever dataEntries or filters change.
      useEffect(() => {
        if (isLoading || error) {
          setFilteredEntries([]);
          return;
        }

        const updatedEntries = dataEntries.filter(entry => {
          return Object.keys(filters).every(key => {
            const filterValue = filters[key].toLowerCase();
            const entryValue = key.includes('Date') 
              ? formatDateForDisplay(entry[key]).toLowerCase()
              : String(entry[key] || '').toLowerCase();
            return entryValue.includes(filterValue);
          });
        });
        setFilteredEntries(updatedEntries);
      }, [dataEntries, filters, isLoading, error]);

      const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
          ...prevFilters,
          [key]: value
        }));
      };

      const handleEditChange = (id, field, value) => {
        setEditedData(prev => ({
          ...prev,
          [id]: {
            ...prev[id],
            [field]: value
          }
        }));
      };

      // MODIFIED: handleSaveAll now includes userId and userRole in the PATCH body
      const handleSaveAll = async () => {
        setIsLoading(true);
        setError(null);

        try {
          await Promise.all(Object.keys(editedData).map(async (id) => {
            const dataToSave = { ...editedData[id], userId, userRole }; // Include userId and userRole
            const response = await fetch(`${API_BASE_URL}/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dataToSave)
            });
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || `Failed to save entry ID ${id}`);
            }
            return response.json();
          }));

          console.log('All changes saved successfully.');
          await fetchEntries(); // Re-fetch to show updated data and clear editedData

        } catch (err) {
          console.error('Error saving changes:', err);
          setError('Failed to save all changes. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-full px-4">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Accountant Dashboard
              </span>
            </h1>

            {isLoading && <p className="text-center text-gray-600">Loading data...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            
            {Object.keys(editedData).length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleSaveAll}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Save All Changes ({Object.keys(editedData).length})
                </button>
              </div>
            )}

            {!isLoading && !error && (
              <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-600 text-white sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Prime Key</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Credit Card</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Contract Short Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Vendor Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Charge Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Charge Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Submitted Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Submitter</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Charge Code</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Notes</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">PDF</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Accounting Processed</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Date Processed</th>
                      <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">APV Number</th>
                    </tr>
                    <tr className="bg-blue-500">
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.primeKey} onChange={(e) => handleFilterChange('primeKey', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.creditCard} onChange={(e) => handleFilterChange('creditCard', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.contractShortName} onChange={(e) => handleFilterChange('contractShortName', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.vendorName} onChange={(e) => handleFilterChange('vendorName', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.chargeDate} onChange={(e) => handleFilterChange('chargeDate', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.chargeAmount} onChange={(e) => handleFilterChange('chargeAmount', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.submittedDate} onChange={(e) => handleFilterChange('submittedDate', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.submitter} onChange={(e) => handleFilterChange('submitter', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.chargeCode} onChange={(e) => handleFilterChange('chargeCode', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.notes} onChange={(e) => handleFilterChange('notes', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.pdfFilePath} onChange={(e) => handleFilterChange('pdfFilePath', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.accountingProcessed} onChange={(e) => handleFilterChange('accountingProcessed', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.dateProcessed} onChange={(e) => handleFilterChange('dateProcessed', e.target.value)} />
                      </td>
                      <td className="px-6 py-2">
                        <input type="text" placeholder="Filter..." className="w-full p-1 border rounded text-sm text-gray-700" value={filters.apvNumber} onChange={(e) => handleFilterChange('apvNumber', e.target.value)} />
                      </td>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries.length > 0 ? (
                      filteredEntries.map((entry) => (
                        <tr
                          key={entry.id}
                          className={`hover:bg-gray-50 ${isUpdatedEntry(entry.primeKey) || editedData[entry.id] ? 'bg-yellow-50' : ''}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{entry.primeKey}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{entry.creditCard}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{entry.contractShortName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{entry.vendorName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{formatDateForDisplay(entry.chargeDate)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">${entry.chargeAmount ? parseFloat(entry.chargeAmount).toFixed(2) : '0.00'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{formatDateForDisplay(entry.submittedDate)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{entry.submitter}</td>
                          <td className="px-6 py-4 whitespace-pre-wrap text-base text-gray-700">{entry.chargeCode}</td>
                          <td className="px-6 py-4 whitespace-pre-wrap text-base text-gray-700">{entry.notes}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                            {entry.pdfFilePath ? (
                              <a href={entry.pdfFilePath} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View PDF</a>
                            ) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700 flex justify-center items-center">
                            <input
                              type="checkbox"
                              checked={editedData[entry.id]?.accountingProcessed === 'T' || entry.accountingProcessed === 'T'}
                              onChange={(e) => handleEditChange(entry.id, 'accountingProcessed', e.target.checked ? 'T' : 'F')}
                              className="form-checkbox h-5 w-5 text-green-600"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                            <input
                              type="date"
                              value={editedData[entry.id]?.dateProcessed ?? formatDateForInput(entry.dateProcessed)}
                              onChange={(e) => handleEditChange(entry.id, 'dateProcessed', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                            <input
                              type="text"
                              value={editedData[entry.id]?.apvNumber ?? entry.apvNumber ?? ''}
                              onChange={(e) => handleEditChange(entry.id, 'apvNumber', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14" className="px-6 py-4 text-center text-gray-600 italic">
                          No entries found. Adjust your filters or add some data.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default AccountantPage;
    