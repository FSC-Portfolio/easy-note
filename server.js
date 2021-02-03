const express = require('express');
const path = require('path');
const tempNotes = {
	name: "justin",
	wants: "code",
	cares: "doggo"
};

const app = express();
const PORT = 3000;

// Routes
// html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// api
app.get('/api/notes', (req, res) => res.json(tempNotes));
app.post('/api/notes', ((req, res) => res.json(tempNotes)));

// Listener
app.listen(PORT, () => console.log(`I am here in port ${PORT}`));