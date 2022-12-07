import express from 'express';
import path from 'path';
import morgan from 'morgan';
import db from './database.js';
import fs from 'fs';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // this may not be needed

// 'a' = append (don't overwrite the file, add to it), assumes that log_dir exists
const accesslog = fs.createWriteStream( './log_dir/access.log', { flags: 'a'});

// Using morgan to log every API call
app.use(morgan('combined', { stream: accesslog }));

// Extract access info from req and res
app.use((req, res, next) => {
	let logdata = {
		remote_addr: req.ip,
	}
//	const statement = db.prepare('INSERT INTO access VALUES ()'); // Keys that we're inserting goes into ()
//	const info = statement.run(logdata.remote_addr);
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

	console.log(userdata);
})

// Read user info endpoint
app.get('/user/info/:username/', (req, res, next) => {
	let userdata = {
		username: req.params.username
	}
	res.status(200).send(info)
})

// Delete user info endpoint
app.post('/user/delete/', (req, res, next) => {
	let userdata = {
		username: req.body.username,
		password: req.body.password
	}
	const statement = db.prepare('DELETE FROM userinfo WHERE username = ? and password = ?');
	const info = statement.run(userdata.username, userdata.password);
	res.status(200).send(info);
})

app.get('/login', (req,res,next) => {
	res.status(200).sendFile(path.resolve('html_pages/index.html')) // send login page html file
})

app.get('/profile/', (req,res,next) => {
	res.status(200).sendFile(path.resolve('html_pages/profile_edit.html')); // send profile editing html file
})

app.post('/api/profile', (req,res,next) => {
	console.log("User attempting to update profile info");
	let userdata = {                    // assemble payload into userdata format
		remote_addr: req.ip,
		username: req.body.username,
		email: req.body.email,
		phone: req.body.phone,
		location: req.body.location,
		relationship: req.body.relationship,
		mood: req.body.mood,
		diet: req.body.diet,
		password: req.body.password
	}
	const statement = db.prepare('UPDATE userinfo SET email=?,phone=?,location=?,relationship=?,mood=?,diet=? WHERE username = ? and password = ?'); // Update row w/ usrname & pswd combo
	const info = statement.run(userdata.email,userdata.email, userdata.phone, userdata.relationship, userdata.mood, userdata.diet, userdata.username, userdata.password); // Run statement
	res.redirect('/user/info/' + userdata.username);
})

app.post('/api/auth', (req,res,next) => {
	console.log("User attempting to authenticate");
	let userLoginInfo = { 		// assemble payload into login format, TODO switch to hash passwords for security
		username: req.body.username,
		password: req.body.password
	}
	const statement = db.prepare('SELECT username FROM userinfo WHERE username = ? and password = ?'); // Get username where login info matches
	const info = statement.get(userLoginInfo.username, userLoginInfo.password);
	if(info == undefined){
		res.redirect('/login');
	}
	else{
		res.redirect('/user/info/' + info.username);
	}			// if login was valid, redirect to that users profile page, otherwise refresh login
})

app.get('/*', (req,res,next) => {
	res.status(404).send("File not found");
})

app.listen(port, () => {
	console.log("Server listening on port 5005")
})
