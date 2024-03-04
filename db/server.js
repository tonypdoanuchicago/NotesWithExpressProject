const express = require('express');

const PORT = 3001;

const app = express();

// GET request for notes
app.get('/api/notes', (req, res) => {
    var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'db/db.json');

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        } else {
            console.log(err);
        }
    });
});

// POST request for notes
app.post('/api/notes', (req, res) => {
    // Inform the client that their POST request was received
    res.json(`${req.method} request received to add a review`);
  
    // Log our request to the terminal
    console.info(`${req.method} request received to add a review`);
  });

// Create a route for handling delete requests
app.delete('/api/notes/:id', function(req, res) {
    // Get the note ID from the request parameters
    const id = req.params.id;
  
    // Find the note in the database
    const note = notes.find(note => note.id === id);
  
    // If the note doesn't exist, return a 404 error
    if (!note) {
      return res.status(404).send('Note not found');
    }
  
    // Delete the note from the database
    notes.splice(notes.indexOf(note), 1);
  
    // Send a 204 No Content response
    res.status(204).send();
  });