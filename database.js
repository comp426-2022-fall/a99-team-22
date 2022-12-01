// Load database engine better-sqlite3
import database from 'better-sqlite3';

// Create a new database connection (not necessarily a new database)
const db = new database('accounts.db');

// Check access log table (this table is a list of all the tables)
const statement = db.prepare('SELECT name FROM sqlite_master type='table' and name='access';');

let row = statement.get();



// Export db
module.exports = db;