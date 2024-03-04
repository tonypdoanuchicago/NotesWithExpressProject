const express = require('express');

const PORT = 3000;

const app = express();

app.use('*/css',express.static('public/assets/css'));
app.use('*/js',express.static('public/assets/js'));

var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'db/db.json');
    
    app.listen(process.env.PORT || PORT, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });

      app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.get("/notes", (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'notes.html'));
    });

// GET request for notes
app.get('/api/notes', (req, res) => {
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
    var dataString = "";
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            dataString += data;
        } else {
            console.log(err);
        }
    });

    // var notes = JSON.parse(dataString);

    // let numberNotes = Object.keys(notes).length
  
    //notes.push({"id":numberNotes,
    //"title":req.body.title,
    // "text":req.body.text});

    // Log our request to the terminal
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(dataString);
    res.end();
  });

// Create a route for handling delete requests
app.delete('/api/notes/:id', function(req, res) {
    // Get the note ID from the request parameters
    const id = req.params.id;
  
    var dataString = "";
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            dataString += data;
        } else {
            console.log(err);
        }
    });

    var notes = JSON.parse(dataString);

    // Find the note in the database
    let note = notes.find(note => note.id === id);
  
    // If the note doesn't exist, return a 404 error
    if (!note) {
      return res.status(404).send('Note not found');
    }
  
    // Delete the note from the database
    notes.splice(notes.indexOf(note), 1);

    var fs = require('fs');

    fs.writeFile('db/db.json', JSON.stringify(notes), function (err) {
    if (err) throw err;
    console.log('Replaced!');
    });
  
    // Send a 204 No Content response
    res.status(204).send();
  });