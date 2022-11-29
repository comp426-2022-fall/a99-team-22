import express from 'express';
import path from 'path';

const app = express()

app.use(express.json());

var port = 5000

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
	console.log("Server listening on port 5000")
})
