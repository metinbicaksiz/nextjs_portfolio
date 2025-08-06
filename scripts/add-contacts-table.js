const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio',
  port: parseInt(process.env.DB_PORT || '5432'),
};

async function addContactsTable() {
  console.log('🚀 Adding contacts table to database...');
  
  const pool = new Pool(dbConfig);
  
  try {
    // Read and execute schema
    console.log('📄 Reading contacts table schema...');
    const schemaPath = path.join(__dirname, '..', 'database', 'add_contacts_table.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🔧 Executing contacts table schema...');
    await pool.query(schema);
    console.log('✅ Contacts table schema executed successfully');
    
    // Check if table was created
    const tableResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'contacts'
    `);
    
    if (tableResult.rows.length > 0) {
      console.log('✅ Contacts table created successfully');
    } else {
      console.log('❌ Failed to create contacts table');
    }
    
    await pool.end();
    console.log('🎉 Contacts table setup completed!');
    
  } catch (error) {
    console.error('❌ Error setting up contacts table:', error.message);
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  addContactsTable();
}

module.exports = { addContactsTable };