const express = require('express');
const path = require('path');
let notesArray = require('./db/db.json');

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// api
app.get('/api/notes', (req, res) => res.json(notesArray));
app.post('/api/notes', (req, res) => {
	const newNote = req.body;
	console.log(newNote);
	notesArray.push(newNote);
	res.json(newNote);
});

// Middleware
app.use(express.static(path.join(__dirname, 'public/')))

// Listener
app.listen(PORT, () => console.log(`I am here in port ${PORT}`));