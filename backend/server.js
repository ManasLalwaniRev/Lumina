// // // // backend/server.js
// // // require('dotenv').config(); // Load environment variables from .env file

// // // const express = require('express');
// // // const { Pool } = require('pg'); // PostgreSQL client
// // // const cors = require('cors'); // CORS middleware

// // // const app = express();
// // // const PORT = process.env.PORT || 5000; // API will run on port 5000, or whatever is set in .env

// // // // --- Middleware ---
// // // app.use(cors()); // Enable CORS for all routes
// // // app.use(express.json()); // Enable parsing of JSON request bodies

// // // // --- PostgreSQL Connection Pool ---
// // // const pool = new Pool({
// // //   user: process.env.DB_USER,
// // //   host: process.env.DB_HOST,
// // //   database: process.env.DB_NAME,
// // //   password: process.env.DB_PASSWORD,
// // //   port: process.env.DB_PORT,
// // //   // Removed the ssl configuration to prevent SSL connection attempts
// // // });

// // // // Test database connection
// // // pool.connect((err, client, done) => {
// // //   if (err) {
// // //     console.error('Database connection error:', err.stack);
// // //     return;
// // //   }
// // //   console.log('Successfully connected to PostgreSQL database!');
// // //   client.release(); // Release the client back to the pool
// // // });

// // // // --- Helper Function for Prime Key Generation ---

// // // /**
// // //  * Generates the next prime key version based on existing keys in the database.
// // //  * If baseKey is provided, it generates a version (e.g., '1.1', '1.2').
// // //  * If no baseKey, it finds the next available base key (e.g., '1', '2').
// // //  * @param {string} [baseKey] - The base prime key to version (e.g., '1', '2.1').
// // //  * @returns {Promise<string>} The next prime key.
// // //  */
// // // async function getNextPrimeKey(baseKey = null) {
// // //   let client;
// // //   try {
// // //     client = await pool.connect();
// // //     let nextPrimeKey;

// // //     if (baseKey) {
// // //       // Logic for versioned prime key (e.g., '1.1', '1.2')
// // //       const baseParts = baseKey.split('.');
// // //       const originalBase = baseParts[0]; // e.g., '1' from '1' or '1.1'

// // //       const result = await client.query(
// // //         `SELECT prime_key FROM entries WHERE prime_key LIKE $1 || '.%' ORDER BY prime_key DESC LIMIT 1`,
// // //         [originalBase]
// // //       );

// // //       if (result.rows.length > 0) {
// // //         const lastVersionKey = result.rows[0].prime_key; // e.g., '1.1'
// // //         const lastVersionParts = lastVersionKey.split('.');
// // //         const currentVersion = lastVersionParts.length > 1 ? parseInt(lastVersionParts[1], 10) : 0;
// // //         nextPrimeKey = `${originalBase}.${currentVersion + 1}`;
// // //       } else {
// // //         // If no versions exist for this base, start with .1
// // //         nextPrimeKey = `${originalBase}.1`;
// // //       }
// // //     } else {
// // //       // Logic for new base prime key (e.g., '1', '2')
// // //       // Simpler approach: count ALL entries and increment.
// // //       // This assumes prime keys are assigned sequentially and handles empty table.
// // //       const result = await client.query(
// // //         `SELECT COUNT(*) FROM entries`
// // //       );
// // //       const count = parseInt(result.rows[0].count, 10);
// // //       nextPrimeKey = (count + 1).toString();
// // //     }
// // //     return nextPrimeKey;
// // //   } catch (error) {
// // //     console.error('Error in getNextPrimeKey:', error);
// // //     // Re-throw the original error to provide more context to the API route
// // //     throw error;
// // //   } finally {
// // //     if (client) {
// // //       client.release();
// // //     }
// // //   }
// // // }


// // // // --- API Routes ---

// // // // GET all entries
// // // app.get('/api/entries', async (req, res) => {
// // //   try {
// // //     const result = await pool.query('SELECT id, prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path FROM entries ORDER BY prime_key ASC');
// // //     res.json(result.rows);
// // //   } catch (err) {
// // //     console.error('Error fetching entries:', err);
// // //     res.status(500).json({ error: 'Internal server error' });
// // //   }
// // // });

// // // // POST a new entry
// // // app.post('/api/entries', async (req, res) => {
// // //   const {
// // //     creditCard, contractShortName, vendorName, chargeDate,
// // //     chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath
// // //   } = req.body;

// // //   try {
// // //     // Generate a new base prime key for a brand new entry
// // //     const primeKey = await getNextPrimeKey();

// // //     const result = await pool.query(
// // //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path)
// // //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
// // //       [primeKey, creditCard, contractShortName, vendorName, chargeDate,
// // //        chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath]
// // //     );
// // //     res.status(201).json(result.rows[0]); // Return the newly created entry
// // //   } catch (err) {
// // //     console.error('Error adding new entry:', err);
// // //     res.status(500).json({ error: 'Internal server error' });
// // //   }
// // // });

// // // // POST to update an entry (creates a new versioned entry)
// // // app.post('/api/entries/update-version', async (req, res) => {
// // //   const {
// // //     originalPrimeKey, // The primeKey of the record being "updated"
// // //     creditCard, contractShortName, vendorName, chargeDate,
// // //     chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath
// // //   } = req.body;

// // //   try {
// // //     // Generate the next versioned prime key based on the originalPrimeKey
// // //     const newPrimeKey = await getNextPrimeKey(originalPrimeKey);

// // //     const result = await pool.query(
// // //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path)
// // //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
// // //       [newPrimeKey, creditCard, contractShortName, vendorName, chargeDate,
// // //        chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath]
// // //     );
// // //     res.status(201).json(result.rows[0]); // Return the newly created versioned entry
// // //   } catch (err) {
// // //     console.error('Error updating (versioning) entry:', err);
// // //     res.status(500).json({ error: 'Internal server error' });
// // //   }
// // // });


// // // // --- Start the Server ---
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });

// // // backend/server.js
// // // backend/server.js
// // require('dotenv').config(); // Load environment variables from .env file

// // const express = require('express');
// // const { Pool } = require('pg'); // PostgreSQL client
// // const cors = require('cors'); // CORS middleware

// // const app = express();
// // const PORT = process.env.PORT || 5000; // API will run on port 5000, or whatever is set in .env

// // // --- Middleware ---
// // app.use(cors()); // Enable CORS for all routes
// // app.use(express.json()); // Enable parsing of JSON request bodies

// // // --- PostgreSQL Connection Pool ---
// // const pool = new Pool({
// //   user: process.env.DB_USER,
// //   host: process.env.DB_HOST,
// //   database: process.env.DB_NAME,
// //   password: process.env.DB_PASSWORD,
// //   port: process.env.DB_PORT,
// //   // Removed the ssl configuration to prevent SSL connection attempts
// // });

// // // Test database connection
// // pool.connect((err, client, done) => {
// //   if (err) {
// //     console.error('Database connection error:', err.stack);
// //     return;
// //   }
// //   console.log('Successfully connected to PostgreSQL database!');
// //   client.release(); // Release the client back to the pool
// // });

// // // --- Helper Function for Prime Key Generation ---
// // /**
// //  * Generates the next prime key version based on existing keys in the database.
// //  * If baseKey is provided, it generates a version (e.g., 'A1.1', 'A1.2').
// //  * Otherwise, it generates a new base key (e.g., 'A2').
// //  */
// // async function getNextPrimeKey(baseKey = null) {
// //   const client = await pool.connect();
// //   try {
// //     if (baseKey) {
// //       // Find the highest version number for the given baseKey
// //       const versionQuery = `SELECT prime_key FROM entries WHERE prime_key LIKE $1 ORDER BY prime_key DESC LIMIT 1`;
// //       const versionResult = await client.query(versionQuery, [`${baseKey}%`]);
// //       let nextVersion = 1;

// //       if (versionResult.rows.length > 0) {
// //         const lastPrimeKey = versionResult.rows[0].prime_key;
// //         const lastVersion = parseInt(lastPrimeKey.split('.').pop(), 10);
// //         nextVersion = lastVersion + 1;
// //       }
// //       return `${baseKey}.${nextVersion}`;
// //     } else {
// //       // Find the highest base key to generate the next one
// //       const baseKeyQuery = `SELECT prime_key FROM entries WHERE prime_key NOT LIKE '%.%' ORDER BY prime_key DESC LIMIT 1`;
// //       const baseKeyResult = await client.query(baseKeyQuery);
// //       let nextId = 1;

// //       if (baseKeyResult.rows.length > 0) {
// //         const lastPrimeKey = baseKeyResult.rows[0].prime_key;
// //         const lastId = parseInt(lastPrimeKey.substring(1), 10);
// //         nextId = lastId + 1;
// //       }
// //       return `A${nextId}`;
// //     }
// //   } catch (err) {
// //     console.error("Error generating prime key:", err);
// //     throw err;
// //   } finally {
// //     client.release();
// //   }
// // }

// // // --- API Endpoints ---

// // // NEW: GET all entries
// // app.get('/api/entries', async (req, res) => {
// //   try {
// //     const result = await pool.query('SELECT * FROM entries ORDER BY prime_key DESC');
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error('Error fetching entries:', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // POST to create a new entry
// // app.post('/api/entries/new', async (req, res) => {
// //   const {
// //     creditCard, contractShortName, vendorName, chargeDate,
// //     chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath
// //   } = req.body;

// //   try {
// //     const newPrimeKey = await getNextPrimeKey();
// //     const result = await pool.query(
// //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path)
// //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
// //       [newPrimeKey, creditCard, contractShortName, vendorName, chargeDate,
// //        chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath]
// //     );
// //     res.status(201).json(result.rows[0]); // Return the newly created entry
// //   } catch (err) {
// //     console.error('Error adding new entry:', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // NEW: PATCH to update an existing entry
// // app.patch('/api/entries/:id', async (req, res) => {
// //   const { id } = req.params;
// //   const fieldsToUpdate = req.body;
// //   const client = await pool.connect();

// //   try {
// //     // Build the query dynamically
// //     let query = 'UPDATE entries SET ';
// //     const updates = [];
// //     const values = [];
// //     let valueIndex = 1;

// //     for (const key in fieldsToUpdate) {
// //       // Convert camelCase to snake_case for database columns
// //       const snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
// //       updates.push(`${snakeCaseKey} = $${valueIndex++}`);
// //       values.push(fieldsToUpdate[key]);
// //     }

// //     if (updates.length === 0) {
// //       return res.status(400).json({ error: 'No fields to update' });
// //     }

// //     query += updates.join(', ') + ` WHERE id = $${valueIndex} RETURNING *`;
// //     values.push(id);

// //     const result = await client.query(query, values);

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ error: 'Entry not found' });
// //     }

// //     res.json(result.rows[0]);
// //   } catch (err) {
// //     console.error(`Error updating entry ID ${id}:`, err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   } finally {
// //     client.release();
// //   }
// // });

// // // POST to update an entry (creates a new versioned entry)
// // app.post('/api/entries/update-version', async (req, res) => {
// //   const {
// //     originalPrimeKey, // The primeKey of the record being "updated"
// //     creditCard, contractShortName, vendorName, chargeDate,
// //     chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath
// //   } = req.body;

// //   try {
// //     // Generate the next versioned prime key based on the originalPrimeKey
// //     const newPrimeKey = await getNextPrimeKey(originalPrimeKey);

// //     const result = await pool.query(
// //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path)
// //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
// //       [newPrimeKey, creditCard, contractShortName, vendorName, chargeDate,
// //        chargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath]
// //     );
// //     res.status(201).json(result.rows[0]); // Return the newly created entry
// //   } catch (err) {
// //     console.error('Error adding new entry:', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });


// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// // backend/server.js
// // backend/server.js
// // require('dotenv').config(); // Load environment variables from .env file

// // const express = require('express');
// // const { Pool } = require('pg'); // PostgreSQL client
// // const cors = require('cors'); // CORS middleware
// // const bcrypt = require('bcrypt'); // For password hashing and comparison

// // const app = express();
// // const PORT = process.env.PORT || 5000; // API will run on port 5000, or whatever is set in .env

// // // --- Middleware ---
// // app.use(cors()); // Enable CORS for all routes
// // app.use(express.json()); // Enable parsing of JSON request bodies

// // // --- PostgreSQL Connection Pool ---
// // const pool = new Pool({
// //   user: process.env.DB_USER,
// //   host: process.env.DB_HOST,
// //   database: process.env.DB_NAME,
// //   password: process.env.DB_PASSWORD,
// //   port: process.env.DB_PORT,
// //   // Removed the ssl configuration to prevent SSL connection attempts
// // });

// // // Test database connection
// // pool.connect((err, client, done) => {
// //   if (err) {
// //     console.error('Database connection error:', err.stack);
// //     return;
// //   }
// //   console.log('Successfully connected to PostgreSQL database!');
// //   client.release(); // Release the client back to the pool
// // });

// // // --- Helper Function for Prime Key Generation ---
// // /**
// //  * Generates the next prime key version based on existing keys in the database.
// //  * If baseKey is provided, it generates a version (e.g., '1.1', '1.2').
// //  * Otherwise, it generates a new base key (e.g., '2').
// //  */
// // async function getNextPrimeKey(baseKey = null) {
// //   const client = await pool.connect();
// //   try {
// //     if (baseKey) {
// //       // Logic for versioned prime key (e.g., '1.1', '1.2')
// //       const baseParts = baseKey.split('.');
// //       const originalBase = baseParts[0]; // e.g., '1' from '1' or '1.1'

// //       const result = await client.query(
// //         `SELECT prime_key FROM entries WHERE prime_key LIKE $1 || '.%' ORDER BY prime_key DESC LIMIT 1`,
// //         [originalBase]
// //       );

// //       if (result.rows.length > 0) {
// //         const lastVersionKey = result.rows[0].prime_key; // e.g., '1.1'
// //         const lastVersionParts = lastVersionKey.split('.');
// //         const currentVersion = lastVersionParts.length > 1 ? parseInt(lastVersionParts[1], 10) : 0;
// //         nextPrimeKey = `${originalBase}.${currentVersion + 1}`;
// //       } else {
// //         // If no versions exist for this base, start with .1
// //         nextPrimeKey = `${originalBase}.1`;
// //       }
// //     } else {
// //       // Logic for new base prime key (e.g., '1', '2')
// //       // Fetch all non-versioned prime keys and find the maximum numeric part
// //       const result = await client.query(`
// //         SELECT prime_key FROM entries
// //         WHERE prime_key NOT LIKE '%.%'
// //         ORDER BY prime_key DESC;
// //       `);

// //       let maxNumericPart = 0;
// //       if (result.rows.length > 0) {
// //         // Iterate through results to find the highest numeric part
// //         for (const row of result.rows) {
// //           const pk = row.prime_key;
// //           // Try to extract a number from keys like '1', '2'
// //           const numericPart = parseInt(pk, 10); // Changed: removed .replace(/^A/, '')
// //           if (!isNaN(numericPart) && numericPart > maxNumericPart) {
// //             maxNumericPart = numericPart;
// //           }
// //         }
// //       }
// //       const nextId = maxNumericPart + 1;
// //       nextPrimeKey = `${nextId}`; // Changed: removed 'A' prefix
// //     }
// //     return nextPrimeKey;
// //   } catch (error) {
// //     console.error('Error in getNextPrimeKey:', error);
// //     throw error;
// //   } finally {
// //     if (client) {
// //       client.release();
// //     }
// //   }
// // }


// // // --- API Endpoints ---

// // // MODIFIED: Basic Login Endpoint (now captures and stores IP address)
// // app.post('/api/login', async (req, res) => {
// //   const { username, password } = req.body;
// //   // Get client IP address
// //   const clientIp = req.headers['x-forwarded-for'] || req.ip; // Prioritize x-forwarded-for for proxies

// //   try {
// //     const userResult = await pool.query('SELECT id, username, password_hash, role FROM users WHERE username = $1', [username]);
// //     const user = userResult.rows[0];

// //     if (user && await bcrypt.compare(password, user.password_hash)) {
// //       // Update the user's last_login_ip in the database
// //       await pool.query('UPDATE users SET last_login_ip = $1 WHERE id = $2', [clientIp, user.id]);

// //       res.status(200).json({ userId: user.id, username: user.username, role: user.role });
// //     } else {
// //       res.status(401).json({ message: 'Invalid credentials' });
// //     }
// //   } catch (err) {
// //     console.error('Login error:', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // MODIFIED: GET all entries, with filtering based on user role and ID
// // app.get('/api/entries', async (req, res) => {
// //   // IMPORTANT: For this simplified approach, we're getting user info from query params.
// //   // In a secure app, this would come from verified JWTs in headers.
// //   const { userId, userRole } = req.query; 

// //   try {
// //     let query = 'SELECT * FROM entries';
// //     const values = [];

// //     if (userRole !== 'admin') { // If not an admin, filter by submitter_id
// //       query += ' WHERE submitter_id = $1';
// //       values.push(userId);
// //     }
    
// //     query += ' ORDER BY prime_key DESC';

// //     const result = await pool.query(query, values);
// //     res.json(result.rows);
// //   } catch (err) {
// //     console.error('Error fetching entries:', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // MODIFIED: POST to create a new entry (now handles empty date and numeric strings)
// // app.post('/api/entries/new', async (req, res) => {
// //   const {
// //     creditCard, contractShortName, vendorName, chargeAmount, submitter, chargeCode, notes, pdfFilePath, userId
// //   } = req.body;
  
// //   // Handle date fields: convert empty strings to null for TIMESTAMP WITH TIME ZONE
// //   const chargeDate = req.body.chargeDate === '' ? null : req.body.chargeDate;
// //   const submittedDate = req.body.submittedDate === '' ? null : req.body.submittedDate;
// //   // NEW: Handle chargeAmount: convert empty string to null for NUMERIC
// //   const finalChargeAmount = chargeAmount === '' ? null : chargeAmount;


// //   try {
// //     const newPrimeKey = await getNextPrimeKey();
// //     const result = await pool.query(
// //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, submitter_id)
// //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
// //       [newPrimeKey, creditCard, contractShortName, vendorName, chargeDate,
// //        finalChargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath, userId]
// //     );
// //     res.status(201).json(result.rows[0]); // Return the newly created entry
// //   } catch (err) {
// //     console.error('Error adding new entry:', err);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // MODIFIED: PATCH to update an existing entry (now creates a new versioned entry)
// // app.patch('/api/entries/:id', async (req, res) => {
// //   const { id } = req.params; // This 'id' refers to the original entry's ID
// //   const { userId, userRole, ...updatedFields } = req.body; // Extract user info and updated fields

// //   const client = await pool.connect();

// //   try {
// //     // 1. Fetch the original entry to get its prime_key and submitter_id
// //     const originalEntryResult = await client.query('SELECT * FROM entries WHERE id = $1', [id]);
// //     const originalEntry = originalEntryResult.rows[0];

// //     if (!originalEntry) {
// //       return res.status(404).json({ error: 'Original entry not found for versioning.' });
// //     }

// //     // 2. Authorization check: Only admin or original submitter can create a new version
// //     if (userRole !== 'admin' && originalEntry.submitter_id !== userId) {
// //       return res.status(403).json({ error: 'Unauthorized to create a new version of this entry.' });
// //     }

// //     // 3. Generate the new versioned prime key
// //     const newPrimeKey = await getNextPrimeKey(originalEntry.prime_key);

// //     // 4. Prepare all fields for the new entry.
// //     // Start with the original entry's data, then override with updatedFields.
// //     const newEntryData = {
// //       prime_key: newPrimeKey, // This is the new versioned prime key
// //       credit_card: updatedFields.creditCard || originalEntry.credit_card,
// //       contract_short_name: updatedFields.contractShortName || originalEntry.contract_short_name,
// //       vendor_name: updatedFields.vendorName || originalEntry.vendor_name,
// //       charge_date: updatedFields.chargeDate === '' ? null : (updatedFields.chargeDate || originalEntry.charge_date),
// //       charge_amount: updatedFields.chargeAmount === '' ? null : (updatedFields.chargeAmount || originalEntry.charge_amount),
// //       submitted_date: updatedFields.submittedDate === '' ? null : (updatedFields.submittedDate || originalEntry.submitted_date),
// //       submitter: updatedFields.submitter || originalEntry.submitter,
// //       charge_code: updatedFields.chargeCode || originalEntry.charge_code,
// //       notes: updatedFields.notes || originalEntry.notes,
// //       pdf_file_path: updatedFields.pdfFilePath || originalEntry.pdf_file_path,
// //       accounting_processed: updatedFields.accountingProcessed === '' ? null : (updatedFields.accountingProcessed || originalEntry.accounting_processed),
// //       date_processed: updatedFields.dateProcessed === '' ? null : (updatedFields.dateProcessed || originalEntry.date_processed),
// //       apv_number: updatedFields.apvNumber === '' ? null : (updatedFields.apvNumber || originalEntry.apv_number),
// //       submitter_id: originalEntry.submitter_id // The new version retains the original submitter_id
// //     };

// //     // Ensure all fields are explicitly set to null if they are empty strings
// //     for (const key in newEntryData) {
// //         if (newEntryData[key] === '') {
// //             newEntryData[key] = null;
// //         }
// //     }

// //     // 5. Insert the new versioned entry
// //     const result = await client.query(
// //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, accounting_processed, date_processed, apv_number, submitter_id)
// //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
// //       [
// //         newEntryData.prime_key, newEntryData.credit_card, newEntryData.contract_short_name,
// //         newEntryData.vendor_name, newEntryData.charge_date, newEntryData.charge_amount,
// //         newEntryData.submitted_date, newEntryData.submitter, newEntryData.charge_code,
// //         newEntryData.notes, newEntryData.pdf_file_path, newEntryData.accounting_processed,
// //         newEntryData.date_processed, newEntryData.apv_number, newEntryData.submitter_id
// //       ]
// //     );

// //     res.status(201).json(result.rows[0]); // Return the newly created versioned entry
// //   } catch (err) {
// //     console.error(`Error creating new version for entry ID ${id}:`, err);
// //     res.status(500).json({ error: 'Internal server error while creating new version.' });
// //   } finally {
// //     client.release();
// //   }
// // });


// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

//     // backend/server.js
//     // require('dotenv').config(); // Load environment variables from .env file

//     // const express = require('express');
//     // const { Pool } = require('pg'); // PostgreSQL client
//     // const cors = require('cors'); // CORS middleware
//     // const bcrypt = require('bcrypt'); // For password hashing and comparison

//     // const app = express();
//     // const PORT = process.env.PORT || 5000; // API will run on port 5000, or whatever is set in .env

//     // // --- Middleware ---
//     // // MODIFIED: CORS configuration to allow requests from your Vercel frontend
//     // const allowedOrigins = [
//     //   'http://localhost:3000', // For local development
//     //   'https://lumina-three-rho.vercel.app' // Your deployed Vercel frontend URL
//     // ];

//     // app.use(cors({
//     //   origin: function (origin, callback) {
//     //     if (!origin || allowedOrigins.includes(origin)) {
//     //       callback(null, true);
//     //     } else {
//     //       callback(new Error('Not allowed by CORS'));
//     //     }
//     //   }
//     // }));
//     // app.use(express.json()); // Enable parsing of JSON request bodies

//     // // --- PostgreSQL Connection Pool ---
//     // const pool = new Pool({
//     //   user: process.env.DB_USER,
//     //   host: process.env.DB_HOST,
//     //   database: process.env.DB_NAME,
//     //   password: process.env.DB_PASSWORD,
//     //   port: process.env.DB_PORT,
//     //   // Removed the ssl configuration to prevent SSL connection attempts
//     // });

//     // // Test database connection
//     // pool.connect((err, client, done) => {
//     //   if (err) {
//     //     console.error('Database connection error:', err.stack);
//     //     return;
//     //   }
//     //   console.log('Successfully connected to PostgreSQL database!');
//     //   client.release(); // Release the client back to the pool
//     // });

//     // // --- Helper Function for Prime Key Generation ---
//     // /**
//     //  * Generates the next prime key version based on existing keys in the database.
//     //  * If baseKey is provided, it generates a version (e.g., '1.1', '1.2').
//     //  * Otherwise, it generates a new base key (e.g., '2').
//     //  */
//     // async function getNextPrimeKey(baseKey = null) {
//     //   const client = await pool.connect();
//     //   try {
//     //     if (baseKey) {
//     //       // Logic for versioned prime key (e.g., '1.1', '1.2')
//     //       const baseParts = baseKey.split('.');
//     //       const originalBase = baseParts[0]; // e.g., '1' from '1' or '1.1'

//     //       const result = await client.query(
//     //         `SELECT prime_key FROM entries WHERE prime_key LIKE $1 || '.%' ORDER BY prime_key DESC LIMIT 1`,
//     //         [originalBase]
//     //       );

//     //       if (result.rows.length > 0) {
//     //         const lastVersionKey = result.rows[0].prime_key; // e.g., '1.1'
//     //         const lastVersionParts = lastVersionKey.split('.');
//     //         const currentVersion = lastVersionParts.length > 1 ? parseInt(lastVersionParts[1], 10) : 0;
//     //         nextPrimeKey = `${originalBase}.${currentVersion + 1}`;
//     //       } else {
//     //         // If no versions exist for this base, start with .1
//     //         nextPrimeKey = `${originalBase}.1`;
//     //       }
//     //     } else {
//     //       // Logic for new base prime key (e.g., '1', '2')
//     //       // Fetch all non-versioned prime keys and find the maximum numeric part
//     //       const result = await client.query(`
//     //         SELECT prime_key FROM entries
//     //         WHERE prime_key NOT LIKE '%.%'
//     //         ORDER BY prime_key DESC;
//     //       `);

//     //       let maxNumericPart = 0;
//     //       if (result.rows.length > 0) {
//     //         // Iterate through results to find the highest numeric part
//     //         for (const row of result.rows) {
//     //           const pk = row.prime_key;
//     //           // Try to extract a number from keys like '1', '2'
//     //           const numericPart = parseInt(pk, 10); // Changed: removed .replace(/^A/, '')
//     //           if (!isNaN(numericPart) && numericPart > maxNumericPart) {
//     //             maxNumericPart = numericPart;
//     //           }
//     //         }
//     //       }
//     //       const nextId = maxNumericPart + 1;
//     //       nextPrimeKey = `${nextId}`; // Changed: removed 'A' prefix
//     //     }
//     //     return nextPrimeKey;
//     //   } catch (error) {
//     //     console.error('Error in getNextPrimeKey:', error);
//     //     throw error;
//     //   } finally {
//     //     if (client) {
//     //       client.release();
//     //     }
//     //   }
//     // }


//     // // --- API Endpoints ---

//     // // MODIFIED: Basic Login Endpoint (now captures and stores IP address)
//     // app.post('/api/login', async (req, res) => {
//     //   const { username, password } = req.body;
//     //   // Get client IP address
//     //   const clientIp = req.headers['x-forwarded-for'] || req.ip; // Prioritize x-forwarded-for for proxies

//     //   try {
//     //     const userResult = await pool.query('SELECT id, username, password_hash, role FROM users WHERE username = $1', [username]);
//     //     const user = userResult.rows[0];

//     //     if (user && await bcrypt.compare(password, user.password_hash)) {
//     //       // Update the user's last_login_ip in the database
//     //       await pool.query('UPDATE users SET last_login_ip = $1 WHERE id = $2', [clientIp, user.id]);

//     //       res.status(200).json({ userId: user.id, username: user.username, role: user.role });
//     //     } else {
//     //       res.status(401).json({ message: 'Invalid credentials' });
//     //     }
//     //   } catch (err) {
//     //     console.error('Login error:', err);
//     //     res.status(500).json({ error: 'Internal server error' });
//     //   }
//     // });

//     // // MODIFIED: GET all entries, with filtering based on user role and ID
//     // app.get('/api/entries', async (req, res) => {
//     //   // IMPORTANT: For this simplified approach, we're getting user info from query params.
//     //   // In a secure app, this would come from verified JWTs in headers.
//     //   const { userId, userRole } = req.query; 

//     //   try {
//     //     let query = 'SELECT * FROM entries';
//     //     const values = [];

//     //     if (userRole !== 'admin') { // If not an admin, filter by submitter_id
//     //       query += ' WHERE submitter_id = $1';
//     //       values.push(userId);
//     //     }
        
//     //     query += ' ORDER BY prime_key DESC';

//     //     const result = await pool.query(query, values);
//     //     res.json(result.rows);
//     //   } catch (err) {
//     //     console.error('Error fetching entries:', err);
//     //     res.status(500).json({ error: 'Internal server error' });
//     //   }
//     // });

//     // // MODIFIED: POST to create a new entry (now handles empty date and numeric strings)
//     // app.post('/api/entries/new', async (req, res) => {
//     //   const {
//     //     creditCard, contractShortName, vendorName, chargeAmount, submitter, chargeCode, notes, pdfFilePath, userId
//     //   } = req.body;
      
//     //   // Handle date fields: convert empty strings to null for TIMESTAMP WITH TIME ZONE
//     //   const chargeDate = req.body.chargeDate === '' ? null : req.body.chargeDate;
//     //   const submittedDate = req.body.submittedDate === '' ? null : req.body.submittedDate;
//     //   // NEW: Handle chargeAmount: convert empty string to null for NUMERIC
//     //   const finalChargeAmount = chargeAmount === '' ? null : chargeAmount;


//     //   try {
//     //     const newPrimeKey = await getNextPrimeKey();
//     //     const result = await pool.query(
//     //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, submitter_id)
//     //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
//     //       [newPrimeKey, creditCard, contractShortName, vendorName, chargeDate,
//     //        finalChargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath, userId]
//     //     );
//     //     res.status(201).json(result.rows[0]); // Return the newly created entry
//     //   } catch (err) {
//     //     console.error('Error adding new entry:', err);
//     //     res.status(500).json({ error: 'Internal server error' });
//     //   }
//     // });

//     // // MODIFIED: PATCH to update an existing entry (now creates a new versioned entry)
//     // app.patch('/api/entries/:id', async (req, res) => {
//     //   const { id } = req.params; // This 'id' refers to the original entry's ID
//     //   const { userId, userRole, ...updatedFields } = req.body; // Extract user info and updated fields

//     //   const client = await pool.connect();

//     //   try {
//     //     // 1. Fetch the original entry to get its prime_key and submitter_id
//     //     const originalEntryResult = await client.query('SELECT * FROM entries WHERE id = $1', [id]);
//     //     const originalEntry = originalEntryResult.rows[0];

//     //     if (!originalEntry) {
//     //       return res.status(404).json({ error: 'Original entry not found for versioning.' });
//     //     }

//     //     // 2. Authorization check: Only admin or original submitter can create a new version
//     //     if (userRole !== 'admin' && originalEntry.submitter_id !== userId) {
//     //       return res.status(403).json({ error: 'Unauthorized to create a new version of this entry.' });
//     //     }

//     //     // 3. Generate the new versioned prime key
//     //     const newPrimeKey = await getNextPrimeKey(originalEntry.prime_key);

//     //     // 4. Prepare all fields for the new entry.
//     //     // Start with the original entry's data, then override with updatedFields.
//     //     const newEntryData = {
//     //       prime_key: newPrimeKey, // This is the new versioned prime key
//     //       credit_card: updatedFields.creditCard || originalEntry.credit_card,
//     //       contract_short_name: updatedFields.contractShortName || originalEntry.contract_short_name,
//     //       vendor_name: updatedFields.vendorName || originalEntry.vendor_name,
//     //       charge_date: updatedFields.chargeDate === '' ? null : (updatedFields.chargeDate || originalEntry.charge_date),
//     //       charge_amount: updatedFields.chargeAmount === '' ? null : (updatedFields.chargeAmount || originalEntry.charge_amount),
//     //       submitted_date: updatedFields.submittedDate === '' ? null : (updatedFields.submittedDate || originalEntry.submitted_date),
//     //       submitter: updatedFields.submitter || originalEntry.submitter,
//     //       charge_code: updatedFields.chargeCode || originalEntry.charge_code,
//     //       notes: updatedFields.notes || originalEntry.notes,
//     //       pdf_file_path: updatedFields.pdfFilePath || originalEntry.pdf_file_path,
//     //       accounting_processed: updatedFields.accountingProcessed === '' ? null : (updatedFields.accountingProcessed || originalEntry.accounting_processed),
//     //       date_processed: updatedFields.dateProcessed === '' ? null : (updatedFields.dateProcessed || originalEntry.date_processed),
//     //       apv_number: updatedFields.apvNumber === '' ? null : (updatedFields.apvNumber || originalEntry.apv_number),
//     //       submitter_id: originalEntry.submitter_id // The new version retains the original submitter_id
//     //     };

//     //     // Ensure all fields are explicitly set to null if they are empty strings
//     //     for (const key in newEntryData) {
//     //         if (newEntryData[key] === '') {
//     //             newEntryData[key] = null;
//     //         }
//     //     }

//     //     // 5. Insert the new versioned entry
//     //     const result = await client.query(
//     //       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, accounting_processed, date_processed, apv_number, submitter_id)
//     //        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
//     //       [
//     //         newEntryData.prime_key, newEntryData.credit_card, newEntryData.contract_short_name,
//     //         newEntryData.vendor_name, newEntryData.charge_date, newEntryData.charge_amount,
//     //         newEntryData.submitted_date, newEntryData.submitter, newEntryData.charge_code,
//     //         newEntryData.notes, newEntryData.pdf_file_path, newEntryData.accounting_processed,
//     //         newEntryData.date_processed, newEntryData.apv_number, newEntryData.submitter_id
//     //       ]
//     //     );

//     //     res.status(201).json(result.rows[0]); // Return the newly created versioned entry
//     //   } catch (err) {
//     //     console.error(`Error creating new version for entry ID ${id}:`, err);
//     //     res.status(500).json({ error: 'Internal server error while creating new version.' });
//     //   } finally {
//     //     client.release();
//     //   }
//     // });


//     // // Start the server
//     // app.listen(PORT, () => {
//     //   console.log(`Server is running on port ${PORT}`);
//     // });
    
//     // backend/server.js
// require('dotenv').config(); // Load environment variables from .env file

// const express = require('express');
// const { Pool } = require('pg'); // PostgreSQL client
// const cors = require('cors'); // CORS middleware
// const bcrypt = require('bcrypt'); // For password hashing and comparison

// const app = express();
// const PORT = process.env.PORT || 5000; // API will run on port 5000, or whatever is set in .env

// // --- Middleware ---
// // MODIFIED: CORS configuration to allow requests from your Vercel frontend
// const allowedOrigins = [
//   'http://localhost:3000', // For local development
//   'https://lumina-three-rho.vercel.app' // Your deployed Vercel frontend URL
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));
// app.use(express.json()); // Enable parsing of JSON request bodies

// // --- PostgreSQL Connection Pool ---
// // MODIFIED: Use DATABASE_URL from Render and add SSL configuration
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Use the single DATABASE_URL provided by Render
//   ssl: {
//     rejectUnauthorized: false // Required for Render's self-signed certificates
//   }
// });

// // Test database connection
// pool.connect((err, client, done) => {
//   if (err) {
//     console.error('Database connection error:', err.stack);
//     return;
//   }
//   console.log('Successfully connected to PostgreSQL database!');
//   client.release(); // Release the client back to the pool
// });

// // --- Helper Function for Prime Key Generation ---
// /**
//  * Generates the next prime key version based on existing keys in the database.
//  * If baseKey is provided, it generates a version (e.g., '1.1', '1.2').
//  * Otherwise, it generates a new base key (e.g., '2').
//  */
// async function getNextPrimeKey(baseKey = null) {
//   const client = await pool.connect();
//   try {
//     if (baseKey) {
//       // Logic for versioned prime key (e.g., '1.1', '1.2')
//       const baseParts = baseKey.split('.');
//       const originalBase = baseParts[0]; // e.g., '1' from '1' or '1.1'

//       const result = await client.query(
//         `SELECT prime_key FROM entries WHERE prime_key LIKE $1 || '.%' ORDER BY prime_key DESC LIMIT 1`,
//         [originalBase]
//       );

//       if (result.rows.length > 0) {
//         const lastVersionKey = result.rows[0].prime_key; // e.g., '1.1'
//         const lastVersionParts = lastVersionKey.split('.');
//         const currentVersion = lastVersionParts.length > 1 ? parseInt(lastVersionParts[1], 10) : 0;
//         nextPrimeKey = `${originalBase}.${currentVersion + 1}`;
//       } else {
//         // If no versions exist for this base, start with .1
//         nextPrimeKey = `${originalBase}.1`;
//       }
//     } else {
//       // Logic for new base prime key (e.g., '1', '2')
//       // Fetch all non-versioned prime keys and find the maximum numeric part
//       const result = await client.query(`
//         SELECT prime_key FROM entries
//         WHERE prime_key NOT LIKE '%.%'
//         ORDER BY prime_key DESC;
//       `);

//       let maxNumericPart = 0;
//       if (result.rows.length > 0) {
//         // Iterate through results to find the highest numeric part
//         for (const row of result.rows) {
//           const pk = row.prime_key;
//           // Try to extract a number from keys like '1', '2'
//           const numericPart = parseInt(pk, 10); // Changed: removed .replace(/^A/, '')
//           if (!isNaN(numericPart) && numericPart > maxNumericPart) {
//             maxNumericPart = numericPart;
//           }
//         }
//       }
//       const nextId = maxNumericPart + 1;
//       nextPrimeKey = `${nextId}`; // Changed: removed 'A' prefix
//     }
//     return nextPrimeKey;
//   } catch (error) {
//     console.error('Error in getNextPrimeKey:', error);
//     throw error;
//   } finally {
//     if (client) {
//       client.release();
//     }
//   }
// }


// // --- API Endpoints ---

// // MODIFIED: Basic Login Endpoint (now captures and stores IP address)
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//   // Get client IP address
//   const clientIp = req.headers['x-forwarded-for'] || req.ip; // Prioritize x-forwarded-for for proxies

//   try {
//     const userResult = await pool.query('SELECT id, username, password_hash, role FROM users WHERE username = $1', [username]);
//     const user = userResult.rows[0];

//     if (user && await bcrypt.compare(password, user.password_hash)) {
//       // Update the user's last_login_ip in the database
//       await pool.query('UPDATE users SET last_login_ip = $1 WHERE id = $2', [clientIp, user.id]);

//       res.status(200).json({ userId: user.id, username: user.username, role: user.role });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // MODIFIED: GET all entries, with filtering based on user role and ID
// app.get('/api/entries', async (req, res) => {
//   // IMPORTANT: For this simplified approach, we're getting user info from query params.
//   // In a secure app, this would come from verified JWTs in headers.
//   const { userId, userRole } = req.query; 

//   try {
//     let query = 'SELECT * FROM entries';
//     const values = [];

//     if (userRole !== 'admin') { // If not an admin, filter by submitter_id
//       query += ' WHERE submitter_id = $1';
//       values.push(userId);
//     }
    
//     query += ' ORDER BY prime_key DESC';

//     const result = await pool.query(query, values);
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching entries:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // MODIFIED: POST to create a new entry (now handles empty date and numeric strings)
// app.post('/api/entries/new', async (req, res) => {
//   const {
//     creditCard, contractShortName, vendorName, chargeAmount, submitter, chargeCode, notes, pdfFilePath, userId
//   } = req.body;
  
//   // Handle date fields: convert empty strings to null for TIMESTAMP WITH TIME ZONE
//   const chargeDate = req.body.chargeDate === '' ? null : req.body.chargeDate;
//   const submittedDate = req.body.submittedDate === '' ? null : req.body.submittedDate;
//   // NEW: Handle chargeAmount: convert empty string to null for NUMERIC
//   const finalChargeAmount = chargeAmount === '' ? null : chargeAmount;


//   try {
//     const newPrimeKey = await getNextPrimeKey();
//     const result = await pool.query(
//       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, submitter_id)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
//       [newPrimeKey, creditCard, contractShortName, vendorName, chargeDate,
//        finalChargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath, userId]
//     );
//     res.status(201).json(result.rows[0]); // Return the newly created entry
//   } catch (err) {
//     console.error('Error adding new entry:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // MODIFIED: PATCH to update an existing entry (now creates a new versioned entry)
// app.patch('/api/entries/:id', async (req, res) => {
//   const { id } = req.params; // This 'id' refers to the original entry's ID
//   const { userId, userRole, ...updatedFields } = req.body; // Extract user info and updated fields

//   const client = await pool.connect();

//   try {
//     // 1. Fetch the original entry to get its prime_key and submitter_id
//     const originalEntryResult = await client.query('SELECT * FROM entries WHERE id = $1', [id]);
//     const originalEntry = originalEntryResult.rows[0];

//     if (!originalEntry) {
//       return res.status(404).json({ error: 'Original entry not found for versioning.' });
//     }

//     // 2. Authorization check: Only admin or original submitter can create a new version
//     if (userRole !== 'admin' && originalEntry.submitter_id !== userId) {
//       return res.status(403).json({ error: 'Unauthorized to create a new version of this entry.' });
//     }

//     // 3. Generate the new versioned prime key
//     const newPrimeKey = await getNextPrimeKey(originalEntry.prime_key);

//     // 4. Prepare all fields for the new entry.
//     // Start with the original entry's data, then override with updatedFields.
//     const newEntryData = {
//       prime_key: newPrimeKey, // This is the new versioned prime key
//       credit_card: updatedFields.creditCard || originalEntry.credit_card,
//       contract_short_name: updatedFields.contractShortName || originalEntry.contract_short_name,
//       vendor_name: updatedFields.vendorName || originalEntry.vendor_name,
//       charge_date: updatedFields.chargeDate === '' ? null : (updatedFields.chargeDate || originalEntry.charge_date),
//       charge_amount: updatedFields.chargeAmount === '' ? null : (updatedFields.chargeAmount || originalEntry.charge_amount),
//       submitted_date: updatedFields.submittedDate === '' ? null : (updatedFields.submittedDate || originalEntry.submitted_date),
//       submitter: updatedFields.submitter || originalEntry.submitter,
//       charge_code: updatedFields.chargeCode || originalEntry.charge_code,
//       notes: updatedFields.notes || originalEntry.notes,
//       pdf_file_path: updatedFields.pdfFilePath || originalEntry.pdf_file_path,
//       accounting_processed: updatedFields.accountingProcessed === '' ? null : (updatedFields.accountingProcessed || originalEntry.accounting_processed),
//       date_processed: updatedFields.dateProcessed === '' ? null : (updatedFields.dateProcessed || originalEntry.date_processed),
//       apv_number: updatedFields.apvNumber === '' ? null : (updatedFields.apvNumber || originalEntry.apv_number),
//       submitter_id: originalEntry.submitter_id // The new version retains the original submitter_id
//     };

//     // Ensure all fields are explicitly set to null if they are empty strings
//     for (const key in newEntryData) {
//         if (newEntryData[key] === '') {
//             newEntryData[key] = null;
//         }
//     }

//     // 5. Insert the new versioned entry
//     const result = await client.query(
//       `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, accounting_processed, date_processed, apv_number, submitter_id)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
//       [
//         newEntryData.prime_key, newEntryData.credit_card, newEntryData.contract_short_name,
//         newEntryData.vendor_name, newEntryData.charge_date, newEntryData.charge_amount,
//         newEntryData.submitted_date, newEntryData.submitter, newEntryData.charge_code,
//         newEntryData.notes, newEntryData.pdf_file_path, newEntryData.accounting_processed,
//         newEntryData.date_processed, newEntryData.apv_number, newEntryData.submitter_id
//       ]
//     );

//     res.status(201).json(result.rows[0]); // Return the newly created versioned entry
//   } catch (err) {
//     console.error(`Error creating new version for entry ID ${id}:`, err);
//     res.status(500).json({ error: 'Internal server error while creating new version.' });
//   } finally {
//     client.release();
//   }
// });


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// backend/server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors'); // CORS middleware
const bcrypt = require('bcrypt'); // For password hashing and comparison

const app = express();
const PORT = process.env.PORT || 5000; // API will run on port 5000, or whatever is set in .env

// --- Middleware ---
// CORS configuration to allow requests from your Vercel frontend
const allowedOrigins = [
  'http://localhost:3000', // For local development
  'https://lumina-three-rho.vercel.app' // Your deployed Vercel frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json()); // Enable parsing of JSON request bodies

// --- PostgreSQL Connection Pool ---
// Use DATABASE_URL from Render and add SSL configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the single DATABASE_URL provided by Render
  ssl: {
    rejectUnauthorized: false // Required for Render's self-signed certificates
  }
});

// Test database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Successfully connected to PostgreSQL database!');
  client.release(); // Release the client back to the pool
});

// --- Helper Function for Prime Key Generation ---
/**
 * Generates the next prime key version based on existing keys in the database.
 * If baseKey is provided, it generates a version (e.g., '1.1', '1.2').
 * Otherwise, it generates a new base key (e.g., '2').
 */
async function getNextPrimeKey(baseKey = null) {
  const client = await pool.connect();
  try {
    if (baseKey) {
      // Logic for versioned prime key (e.g., '1.1', '1.2')
      const baseParts = baseKey.split('.');
      const originalBase = baseParts[0]; // e.g., '1' from '1' or '1.1'

      const result = await client.query(
        `SELECT prime_key FROM entries WHERE prime_key LIKE $1 || '.%' ORDER BY prime_key DESC LIMIT 1`,
        [originalBase]
      );

      if (result.rows.length > 0) {
        const lastVersionKey = result.rows[0].prime_key; // e.g., '1.1'
        const lastVersionParts = lastVersionKey.split('.');
        const currentVersion = lastVersionParts.length > 1 ? parseInt(lastVersionParts[1], 10) : 0;
        nextPrimeKey = `${originalBase}.${currentVersion + 1}`;
      } else {
        // If no versions exist for this base, start with .1
        nextPrimeKey = `${originalBase}.1`;
      }
    } else {
      // Logic for new base prime key (e.g., '1', '2')
      // Fetch all non-versioned prime keys and find the maximum numeric part
      const result = await client.query(`
        SELECT prime_key FROM entries
        WHERE prime_key NOT LIKE '%.%'
        ORDER BY prime_key DESC;
      `);

      let maxNumericPart = 0;
      if (result.rows.length > 0) {
        // Iterate through results to find the highest numeric part
        for (const row of result.rows) {
          const pk = row.prime_key;
          // Try to extract a number from keys like '1', '2'
          const numericPart = parseInt(pk, 10);
          if (!isNaN(numericPart) && numericPart > maxNumericPart) {
            maxNumericPart = numericPart;
          }
        }
      }
      const nextId = maxNumericPart + 1;
      nextPrimeKey = `${nextId}`;
    }
    return nextPrimeKey;
  } catch (error) {
    console.error('Error in getNextPrimeKey:', error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}


// --- API Endpoints ---

// NEW: POST endpoint for creating a new user
app.post('/api/users/new', async (req, res) => {
  const { username, password_hash, role } = req.body; // password_hash is already hashed from frontend (for demo)

  // Basic validation
  if (!username || !password_hash || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required.' });
  }

  try {
    // Check if username already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    // Insert new user into the database
    const result = await pool.query(
      'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role',
      [username, password_hash, role]
    );
    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Error creating new user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// MODIFIED: Basic Login Endpoint (now captures and stores IP address)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // Get client IP address
  const clientIp = req.headers['x-forwarded-for'] || req.ip; // Prioritize x-forwarded-for for proxies

  try {
    const userResult = await pool.query('SELECT id, username, password_hash, role FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (user && await bcrypt.compare(password, user.password_hash)) {
      // Update the user's last_login_ip in the database
      await pool.query('UPDATE users SET last_login_ip = $1 WHERE id = $2', [clientIp, user.id]);

      res.status(200).json({ userId: user.id, username: user.username, role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// MODIFIED: GET all entries, with filtering based on user role and ID
app.get('/api/entries', async (req, res) => {
  // IMPORTANT: For this simplified approach, we're getting user info from query params.
  // In a secure app, this would come from verified JWTs in headers.
  const { userId, userRole } = req.query; 

  try {
    let query = 'SELECT * FROM entries';
    const values = [];

    if (userRole !== 'admin') { // If not an admin, filter by submitter_id
      query += ' WHERE submitter_id = $1';
      values.push(userId);
    }
    
    query += ' ORDER BY prime_key DESC';

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// MODIFIED: POST to create a new entry (now handles empty date and numeric strings)
app.post('/api/entries/new', async (req, res) => {
  const {
    creditCard, contractShortName, vendorName, chargeAmount, submitter, chargeCode, notes, pdfFilePath, userId
  } = req.body;
  
  // Handle date fields: convert empty strings to null for TIMESTAMP WITH TIME ZONE
  const chargeDate = req.body.chargeDate === '' ? null : req.body.chargeDate;
  const submittedDate = req.body.submittedDate === '' ? null : req.body.submittedDate;
  // NEW: Handle chargeAmount: convert empty string to null for NUMERIC
  const finalChargeAmount = chargeAmount === '' ? null : chargeAmount;


  try {
    const newPrimeKey = await getNextPrimeKey();
    const result = await pool.query(
      `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, submitter_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [newPrimeKey, creditCard, contractShortName, vendorName, chargeDate,
       finalChargeAmount, submittedDate, submitter, chargeCode, notes, pdfFilePath, userId]
    );
    res.status(201).json(result.rows[0]); // Return the newly created entry
  } catch (err) {
    console.error('Error adding new entry:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// MODIFIED: PATCH to update an existing entry (now creates a new versioned entry)
app.patch('/api/entries/:id', async (req, res) => {
  const { id } = req.params; // This 'id' refers to the original entry's ID
  const { userId, userRole, ...updatedFields } = req.body; // Extract user info and updated fields

  const client = await pool.connect();

  try {
    // 1. Fetch the original entry to get its prime_key and submitter_id
    const originalEntryResult = await client.query('SELECT * FROM entries WHERE id = $1', [id]);
    const originalEntry = originalEntryResult.rows[0];

    if (!originalEntry) {
      return res.status(404).json({ error: 'Original entry not found for versioning.' });
    }

    // 2. Authorization check: Only admin or original submitter can create a new version
    if (userRole !== 'admin' && originalEntry.submitter_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to create a new version of this entry.' });
    }

    // 3. Generate the new versioned prime key
    const newPrimeKey = await getNextPrimeKey(originalEntry.prime_key);

    // 4. Prepare all fields for the new entry.
    // Start with the original entry's data, then override with updatedFields.
    const newEntryData = {
      prime_key: newPrimeKey, // This is the new versioned prime key
      credit_card: updatedFields.creditCard || originalEntry.credit_card,
      contract_short_name: updatedFields.contractShortName || originalEntry.contract_short_name,
      vendor_name: updatedFields.vendorName || originalEntry.vendor_name,
      charge_date: updatedFields.chargeDate === '' ? null : (updatedFields.chargeDate || originalEntry.charge_date),
      charge_amount: updatedFields.chargeAmount === '' ? null : (updatedFields.chargeAmount || originalEntry.charge_amount),
      submitted_date: updatedFields.submittedDate === '' ? null : (updatedFields.submittedDate || originalEntry.submitted_date),
      submitter: updatedFields.submitter || originalEntry.submitter,
      charge_code: updatedFields.chargeCode || originalEntry.charge_code,
      notes: updatedFields.notes || originalEntry.notes,
      pdf_file_path: updatedFields.pdfFilePath || originalEntry.pdf_file_path,
      accounting_processed: updatedFields.accountingProcessed === '' ? null : (updatedFields.accountingProcessed || originalEntry.accounting_processed),
      date_processed: updatedFields.dateProcessed === '' ? null : (updatedFields.dateProcessed || originalEntry.date_processed),
      apv_number: updatedFields.apvNumber === '' ? null : (updatedFields.apvNumber || originalEntry.apv_number),
      submitter_id: originalEntry.submitter_id // The new version retains the original submitter_id
    };

    // Ensure all fields are explicitly set to null if they are empty strings
    for (const key in newEntryData) {
        if (newEntryData[key] === '') {
            newEntryData[key] = null;
        }
    }

    // 5. Insert the new versioned entry
    const result = await client.query(
      `INSERT INTO entries (prime_key, credit_card, contract_short_name, vendor_name, charge_date, charge_amount, submitted_date, submitter, charge_code, notes, pdf_file_path, accounting_processed, date_processed, apv_number, submitter_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        newEntryData.prime_key, newEntryData.credit_card, newEntryData.contract_short_name,
        newEntryData.vendor_name, newEntryData.charge_date, newEntryData.charge_amount,
        newEntryData.submitted_date, newEntryData.submitter, newEntryData.charge_code,
        newEntryData.notes, newEntryData.pdf_file_path, newEntryData.accounting_processed,
        newEntryData.date_processed, newEntryData.apv_number, newEntryData.submitter_id
      ]
    );

    res.status(201).json(result.rows[0]); // Return the newly created versioned entry
  } catch (err) {
    console.error(`Error creating new version for entry ID ${id}:`, err);
    res.status(500).json({ error: 'Internal server error while creating new version.' });
  } finally {
    client.release();
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

