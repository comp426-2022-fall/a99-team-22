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
	const statement = db.prepare('INSERT INTO access ()'); // Keys that we're inserting goes into ()
	const info = statement.run(logdata.remote_addr);
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
	// database query:
	//db.prepare()
})

// Modify user info endpoint
app.patch('/user/info/update/', (req, res, next) => {

})

// Delete user info endpoint
app.delete('/user/delete/', (req, res, next) => {

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