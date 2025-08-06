const { Pool } = require('pg');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio',
  port: parseInt(process.env.DB_PORT || '5432'),
};

async function checkContactsTable() {
  console.log('🔍 Checking contacts table...');
  
  const pool = new Pool(dbConfig);
  
  try {
    // Check if table exists
    const tableResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'contacts'
    `);
    
    if (tableResult.rows.length === 0) {
      console.log('❌ Contacts table does not exist');
      return;
    }
    
    // Get all contacts
    const contactsResult = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    
    console.log(`✅ Found ${contactsResult.rows.length} contact form submissions:`);
    
    if (contactsResult.rows.length === 0) {
      console.log('No contact form submissions found.');
    } else {
      contactsResult.rows.forEach((row, index) => {
        console.log(`\nSubmission #${index + 1}:`);
        console.log(`Name: ${row.name}`);
        console.log(`Email: ${row.email}`);
        console.log(`Phone: ${row.phone || 'Not provided'}`);
        console.log(`Message: ${row.message}`);
        console.log(`Submitted: ${row.created_at}`);
      });
    }
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error checking contacts table:', error.message);
  }
}

// Run check if this script is executed directly
if (require.main === module) {
  checkContactsTable();
}

module.exports = { checkContactsTable };