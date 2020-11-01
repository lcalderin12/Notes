//dependencies
//==============================
var express = require('express');
var path = require("path");
var fs = require("fs");
var app = express();
//var db = require("../Develop/db/db.json");
const { notStrictEqual } = require('assert');

//MIDDLEWARE
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));


//port
//====================================
var PORT = process.env.PORT || 8081;


//empty array
//====================
var newNote =[];  


//========================================================================================

app.get("/api/notes", function(req, res) {
      // reads the notes from json file
      newNote = fs.readFileSync("db/db.json", "utf8");
      // parse it so notesData is an array of objects
      newNote = JSON.parse(newNote);
  
    //   send objects to the browser
    res.json(newNote);
  });

//ROUTES
//posts new data to the req.body using the /notes endpoint
app.post("/api/notes", (req, res)=>{

    newNote = fs.readFileSync("db/db.json","utf8")  
    newNote = JSON.parse(newNote);
    //console.log("parse data looks like: " + newNote)
    req.body.id = newNote.length;
    let body = req.body;
    newNote.push(body);
    newNote = JSON.stringify(newNote);


fs.writeFile("db/db.json", newNote, function(err){
    if (err) {
    return console.log(err);
        }
    }); 
    // res.json(JSON.parse(notesData));

   res.send(newNote);
});

   // Delete a note
  
  app.delete("/api/notes/:id", function(req, res) {
      //  reads the json file
      newNote = fs.readFileSync("db/db.json", "utf8");
      // parse the data to get an array of the objects
      newNote = JSON.parse(newNote);
      // delete the old note from the array on note objects
      newNote = newNote.filter(function(note) {
        return note.id != req.params.id;
      });
      // make it string(stringify)so you can write it to the file
      newNote = JSON.stringify(newNote);
      // write the new notes to the file
      fs.writeFile("db/db.json", newNote, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
  
      // change it back to an array of objects & sends it 
      res.send(JSON.parse(newNote));
  
      // error handling
   
  });


//ENDPOINTS HTML code
//=================================================
//gets /notes endpoint and sends notes.html file using
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));

});

//gets / endpoint and sends index.html using
app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "db/db.json"));
  });


//creating conection
//=================================================
app.listen(PORT, () =>{
    console.log('listening on http://localhost:' + PORT);
});