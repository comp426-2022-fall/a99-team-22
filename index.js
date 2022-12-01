import express from 'express';
import path from 'path';
import morgan from 'morgan';
import db from 'better-sqlite3';
import fs from 'fs';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // this may not be needed

// 'a' = append (don't overwrite the file, add to it), assumes that log_dir exists
const accesslog = fs.createWriteStream( './log_dir/access.log', { flags: 'a'});

// Using morgan to log every API call
app.use(morgan('combined', { stream: accesslog }));

var port = 5005

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
