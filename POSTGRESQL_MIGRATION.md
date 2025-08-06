# PostgreSQL Migration Guide

This document outlines the migration from MySQL to PostgreSQL for your portfolio application.

## What Changed

### 1. Dependencies
- **Removed**: `mysql2` package
- **Added**: `pg` (PostgreSQL driver) and `@types/pg` (TypeScript types)
- **Added**: `dotenv` for environment variable loading

### 2. Database Schema (`database/schema.sql`)
- Converted MySQL syntax to PostgreSQL syntax
- Changed `INT AUTO_INCREMENT PRIMARY KEY` to `SERIAL PRIMARY KEY`
- Updated `TRUE`/`FALSE` to lowercase `true`/`false`
- Replaced MySQL indexes with PostgreSQL `CREATE INDEX` statements
- Added PostgreSQL triggers for `updated_at` timestamp functionality
- Removed MySQL-specific `USE database` statement

### 3. Database Connection (`lib/database.ts`)
- Replaced `mysql2/promise` import with `pg` Pool
- Updated connection configuration for PostgreSQL defaults (port 5432, user 'postgres')
- Changed from `pool.execute()` to `pool.query()`
- Updated parameter placeholders from `?` to `$1`, `$2`, etc. (PostgreSQL style)
- Modified connection testing to use `pool.connect()` instead of `pool.getConnection()`

### 4. Environment Configuration
- Updated `env.example` with PostgreSQL defaults
- Changed default port from 3306 to 5432
- Changed default user from 'root' to 'postgres'

### 5. Setup Scripts
- Created `scripts/setup-postgresql.js` for database initialization
- Added `setup-db` npm script for easy database setup

## Prerequisites

Before running the application with PostgreSQL, ensure you have:

1. **PostgreSQL installed** on your system
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql postgresql-contrib`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **PostgreSQL service running**
   - macOS: `brew services start postgresql`
   - Ubuntu: `sudo systemctl start postgresql`
   - Windows: Start via Services or pgAdmin

3. **Database user with appropriate permissions**
   - Default user is usually 'postgres'
   - Ensure the user can create databases

## Setup Instructions

### Step 1: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your PostgreSQL credentials:
   ```bash
   # PostgreSQL Database Configuration
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_postgresql_password
   DB_NAME=portfolio
   DB_PORT=5432
   ```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Database

Run the automated setup script:
```bash
npm run setup-db
```

This script will:
- Create the database if it doesn't exist
- Execute the PostgreSQL schema
- Create all tables and indexes
- Insert sample data
- Test the connection

### Step 4: Start the Application

```bash
npm run dev
```

## Manual Database Setup (Alternative)

If you prefer to set up the database manually:

1. **Connect to PostgreSQL**:
   ```bash
   psql -U postgres
   ```

2. **Create the database**:
   ```sql
   CREATE DATABASE portfolio;
   \c portfolio
   ```

3. **Execute the schema**:
   ```bash
   psql -U postgres -d portfolio -f database/schema.sql
   ```

## Verification

To verify the migration was successful:

1. **Check tables exist**:
   ```sql
   \dt
   ```

2. **Check sample data**:
   ```sql
   SELECT COUNT(*) FROM blog_posts;
   SELECT COUNT(*) FROM repositories;
   ```

3. **Test application endpoints** that interact with the database

## Key Differences Between MySQL and PostgreSQL

| Feature | MySQL | PostgreSQL |
|---------|--------|------------|
| Auto-increment | `AUTO_INCREMENT` | `SERIAL` |
| Boolean values | `TRUE`/`FALSE` | `true`/`false` |
| Parameter placeholders | `?` | `$1`, `$2`, etc. |
| Default port | 3306 | 5432 |
| Query method | `pool.execute()` | `pool.query()` |
| Connection test | `getConnection()` | `connect()` |

## Troubleshooting

### Common Issues

1. **Connection refused**:
   - Ensure PostgreSQL service is running
   - Check host and port in `.env.local`

2. **Authentication failed**:
   - Verify username and password
   - Check PostgreSQL user permissions

3. **Database does not exist**:
   - Run `npm run setup-db` to create it automatically
   - Or create manually: `createdb portfolio`

4. **Permission denied**:
   - Ensure PostgreSQL user has CREATE DATABASE privileges
   - Grant permissions: `ALTER USER postgres CREATEDB;`

### Logs and Debugging

- Check application logs for database connection errors
- Use PostgreSQL logs: typically in `/usr/local/var/log/postgresql/`
- Enable query logging in PostgreSQL for debugging

## Performance Considerations

PostgreSQL offers several advantages over MySQL:
- Better handling of complex queries
- Advanced indexing options
- Better concurrency control
- More SQL standard compliance

Consider adding indexes for frequently queried columns as your data grows.

## Backup and Restore

### Backup
```bash
pg_dump -U postgres portfolio > backup.sql
```

### Restore
```bash
psql -U postgres -d portfolio < backup.sql
```

## Next Steps

1. Test all application functionality
2. Update any remaining MySQL-specific code if found
3. Consider optimizing queries for PostgreSQL
4. Set up regular backups
5. Monitor performance and add indexes as needed

---

**Migration completed successfully!** Your application now uses PostgreSQL instead of MySQL.
