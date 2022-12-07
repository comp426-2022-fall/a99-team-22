// Load database engine better-sqlite3
import database from 'better-sqlite3';

// Create a new database connection (not necessarily a new database)
const db = new database('user_info.db');

// Check access log table (this table is a list of all the tables)
const statement = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='access';`);

// To get information out of statement response
let access_row = statement.get();
// Create table if if doesn't exist
if ( access_row === undefined ) {
    const sqlInit = `
        CREATE TABLE access (
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
            user_agent VARCHAR
        );
    `
    try {
        db.exec(sqlInit);
    } catch (error) {
        console.log(error);
    }
} else {
    console.log('Access log table exists.');
}
const user_statement = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);

let user_row = user_statement.get();

if ( user_row === undefined ) {

    const sqlInit = `
        CREATE TABLE userinfo (
            id INTEGER PRIMARY KEY,
            username VARCHAR,
            password VARCHAR,
            email VARCHAR,
            phone VARCHAR,
            location VARCHAR,
            relationship VARCHAR,
            mood VARCHAR,
            diet VARCHAR
        );
        INSERT INTO userinfo (username, email, phone, location, relationship, mood, diet) VALUES ('X-MattAttack-X','kolsch@email.unc.edu','704-000-0000','Chapel Hill','cuffed','stressed','omnivore')
    `
    try {
        db.exec(sqlInit);
    } catch (error) {
        console.log(error);
    }
} else {
    console.log('User info table exists.');
}
export default db;
