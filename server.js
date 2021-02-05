// Load up our plugins.
const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

// Load up our required assets.
const exportFile = './db/db.json';
let notesArray = require('./db/db.json').notes;


// Setup the server.
const app = express();
const PORT = 3000;

const exportDbToFile = (file, dbArray) => {
	// Write the db file
	dbArray = JSON.stringify({"notes": dbArray});
	fs.writeFile(file, dbArray, (err) =>
		err ? console.error(err) : console.log('File exported')
	);
}

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
	newNote.id = uniqid();
	notesArray.push(newNote);
	exportDbToFile(exportFile, notesArray);
	res.json(newNote);
});
app.delete('/api/notes/:id', (req, res) => {
	const activeNote = req.params.id;
	// See if the id exists.
	for (let i = 0; i < notesArray.length; i++) {
		if (activeNote === notesArray[i].id) {
			// Remove it and return the result.
			notesArray.splice(i, 1);

			//update the database file
			exportDbToFile(exportFile, notesArray);
			return res.json(true);
		}
	}

	return res.json(false);

})

// Middleware
app.use(express.static(path.join(__dirname, 'public/')))

// Listener
app.listen(process.env.PORT || 3000, () => console.log('The server is running my dude.'));
