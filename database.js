// Load database engine better-sqlite3
import database from 'better-sqlite3';

// Create a new database connection (not necessarily a new database)
const db = new database('test.db');

// Check access log table (this table is a list of all the tables)
const statement = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='access';`);

// To get information out of statement response
let row = statement.get();

// Create table if if doesn't exist
if ( row === undefined ) {
    const accessLogInit = `
        CREATE TABLE account (
            id INTEGER PRIMARY KEY,
            remote_addr VARCHAR,
            remote_user VARCHAR,
            datetime VARCHAR,
            method VARCHAR,
            url VARCHAR,
            http_version VARCHAR,
            status VARCHAR,
            content_length VARCHAR,
            referer_url VARCHAR,
            user_agent VARCHAR,
        );
    `
    db.exec(accessLogInit)
} else {
    console.log('Access log table exists.');
};

export default db;