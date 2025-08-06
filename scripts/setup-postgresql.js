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

async function setupDatabase() {
  console.log('🚀 Setting up PostgreSQL database...');
  
  // First, connect without specifying a database to create it if needed
  const adminConfig = { ...dbConfig };
  delete adminConfig.database;
  
  const adminPool = new Pool(adminConfig);
  
  try {
    // Check if database exists, create if not
    console.log('📋 Checking if database exists...');
    const dbCheckResult = await adminPool.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbConfig.database]
    );
    
    if (dbCheckResult.rows.length === 0) {
      console.log(`📦 Creating database: ${dbConfig.database}`);
      await adminPool.query(`CREATE DATABASE "${dbConfig.database}"`);
      console.log('✅ Database created successfully');
    } else {
      console.log('✅ Database already exists');
    }
    
    await adminPool.end();
    
    // Now connect to the specific database
    const pool = new Pool(dbConfig);
    
    // Read and execute schema
    console.log('📄 Reading database schema...');
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🔧 Executing database schema...');
    await pool.query(schema);
    console.log('✅ Schema executed successfully');
    
    // Test connection
    console.log('🔍 Testing database connection...');
    const testResult = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Database connection test successful');
    console.log(`⏰ Current database time: ${testResult.rows[0].current_time}`);
    
    // Check tables
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📊 Created tables:');
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
    await pool.end();
    console.log('🎉 PostgreSQL setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
