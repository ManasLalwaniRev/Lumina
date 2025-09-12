// src/components/SettingsPage.jsx
import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://rev-lumina.onrender.com/api';

const SettingsPage = ({ setCurrentPage, currentUserRole }) => {
  const [contractOptions, setContractOptions] = useState([]);
  const [creditCardOptions, setCreditCardOptions] = useState([]);
  const [newContract, setNewContract] = useState('');
  const [newCard, setNewCard] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all dropdown options on component mount
  const fetchData = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const [contractsRes, cardsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/contract-options`),
        fetch(`${API_BASE_URL}/credit-card-options`),
      ]);
      if (!contractsRes.ok || !cardsRes.ok) {
        throw new Error('Failed to fetch dropdown options.');
      }
      const contracts = await contractsRes.json();
      const cards = await cardsRes.json();
      setContractOptions(contracts);
      setCreditCardOptions(cards);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOption = async (type) => {
    const isContract = type === 'contract';
    const name = isContract ? newContract : newCard;
    const url = isContract ? `${API_BASE_URL}/contract-options` : `${API_BASE_URL}/credit-card-options`;
    const setOptions = isContract ? setContractOptions : setCreditCardOptions;
    const setNewItem = isContract ? setNewContract : setNewCard;

    if (!name) {
      setMessage('Please enter a name for the new option.');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userRole: currentUserRole }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add new ${type}.`);
      }
      const newOption = await response.json();
      setOptions(prev => [...prev, newOption]);
      setNewItem('');
      setMessage(`${isContract ? 'Contract' : 'Credit card'} option added successfully.`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleDeleteOption = async (id, type) => {
    const isContract = type === 'contract';
    const url = isContract ? `${API_BASE_URL}/contract-options/${id}` : `${API_BASE_URL}/credit-card-options/${id}`;
    const setOptions = isContract ? setContractOptions : setCreditCardOptions;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userRole: currentUserRole }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete ${type}.`);
      }
      setOptions(prev => prev.filter(option => option.id !== id));
      setMessage(`${isContract ? 'Contract' : 'Credit card'} option deleted successfully.`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
            Settings
        </h1>
        {message && <p className={`text-center mb-4 ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contract Options Management */}
            <div className="border p-4 rounded-lg bg-gray-50">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Contract Names</h2>
                <div className="flex mb-4">
                    <input
                    type="text"
                    value={newContract}
                    onChange={(e) => setNewContract(e.target.value)}
                    className="border p-2 flex-grow rounded-l-md focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="New contract name"
                    />
                    <button onClick={() => handleAddOption('contract')} className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition">Add</button>
                </div>
                <ul className="space-y-2">
                    {contractOptions.map(option => (
                    <li key={option.id} className="flex justify-between items-center p-2 border-b">
                        {option.name}
                        <button onClick={() => handleDeleteOption(option.id, 'contract')} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Credit Card Options Management */}
            <div className="border p-4 rounded-lg bg-gray-50">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Credit Cards</h2>
                <div className="flex mb-4">
                    <input
                    type="text"
                    value={newCard}
                    onChange={(e) => setNewCard(e.target.value)}
                    className="border p-2 flex-grow rounded-l-md focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="New card name"
                    />
                    <button onClick={() => handleAddOption('card')} className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition">Add</button>
                </div>
                <ul className="space-y-2">
                    {creditCardOptions.map(option => (
                    <li key={option.id} className="flex justify-between items-center p-2 border-b">
                        {option.name}
                        <button onClick={() => handleDeleteOption(option.id, 'card')} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="mt-8 text-center">
            <button
                onClick={() => setCurrentPage('home')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition"
            >
                Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;