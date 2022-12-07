import express from 'express';
import path from 'path';
import morgan from 'morgan';
import db from './database.js';
import fs from 'fs';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 'a' = append (don't overwrite the file, add to it), assumes that log_dir exists
const accesslog = fs.createWriteStream( './log_dir/access.log', { flags: 'a'});

// Using morgan to log every API call
app.use(morgan('combined', { stream: accesslog }));

// Extract access info from req and res
app.use((req, res, next) => {
	let logdata = {
		remote_addr: req.ip,
		remote_user: req.get('remote-user'),
		datetime: req.get('datetime'),
		method: req.get('method'),
		url: req.get('url'),
		http_version: req.get('http_version'),
		status: req.get('status'),
		content_length: req.get('content-length'),
		referer_url: req.get('referer-url'),
		user_agent: req.get('user-agent')
	}
	const statement = db.prepare('INSERT INTO access (remote_addr, remote_user, datetime, method, url, http_version, status, content_length, referer_url, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'); // Keys that we're inserting goes into ()
	const info = statement.run(logdata.remote_addr, logdata.remote_user, logdata.datetime, logdata.method, logdata.url, logdata.http_version, logdata.status, logdata.content_length, logdata.referer_url, logdata.user_agent);
	next();
})

var port = 5005

// Create user endpoint
app.post('/user/new/', (req, res, next) => {
	let userdata = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		phone: req.body.phone,
		location: req.body.location,
		relationship: req.body.relationship,
		mood: req.body.mood,
		diet: req.body.diet
	}
	const statement = db.prepare('INSERT INTO userinfo (username, email, phone, location, relationship, mood, diet) VALUES (?, ?, ?, ?, ?, ?, ?)'); // referring to the variable names in our database (they don't have to be the same)
	const info = statement.run(userdata.username, userdata.email, userdata.phone, userdata.location, userdata.relationship, userdata.mood, userdata.diet);
	res.status(200).json({"message": "user " + userdata.username + " created"});
	console.log(userdata);
	console.log(info);
})

// Read user info endpoint
app.get('/user/info/:username/', (req, res, next) => {
	const statement = db.prepare('SELECT * FROM userinfo WHERE username = ?'); // select everything that matches from userinfo table
	const info = statement.get(req.params.username);
	res.status(200).json(info);
	console.log(info);
})

// Modify user info endpoint
app.patch('/user/info/update/:username/', (req, res, next) => {
	let userdata = {
		username: req.params.username
	}
})

// Delete user info endpoint
app.delete('/user/delete/', (req, res, next) => {
	let userdata = {
		username: req.body.username
	}
})

app.get('/login', (req,res,next) => {
	res.status(200).sendFile(path.resolve('html_pages/index.html'))
})

app.post('/auth', (req,res,next) => {
	console.log("User attempting to authenticate");
	res.status(200).send("Replace with user auth")
})

app.get('/*', (req,res,next) => {
	res.status(404).send("File not found");
})

app.listen(port, () => {
	console.log("Server listening on port 5005")
})