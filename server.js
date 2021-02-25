//Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require('path');
//static files
app.use(express.static('public'));
// app.use( express.static('public'));
// app.use('/css', express.static(__dirname + 'public/css'));
// app.use('/js', express.static(__dirname + 'public/js'));

function savethat(value) {
    let obj = {
        "tite ": value.body.title,
        "content ": value.body.content
    }
    let fs = require('fs');
    jsondata = JSON.stringify(obj);
    fs.writeFile("lofasz.json", jsondata, function (err) {
        if (err) {
            console.log(err);
        }
    })
}




app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://marci:mukodj@cluster0.csosw.mongodb.net/notesDB", { useNewUrlParser: true }, { useUnifiedTopology: true })
console.log(mongoose.connection.readyState)
var db = mongoose.connection; db.on("error", console.error.bind(console, "connection error:")); db.once("open", function () { console.log("Connection Successful!"); });
const notesSchema = {
    tite: String,
    content: String
}
const Note = mongoose.model("Note", notesSchema, "notes");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
console.clear();


app.listen(3001, function () {
    console.log("Server is running on 3001");
})
app.post("/", function (req, res) {
    let newNote = new Note({
        tite: req.body.title,
        content: req.body.content
    });
    savethat(req);

    newNote.save(function (err, doc) {

        //    if (err) return console.error(err); 
        console.log("Document inserted succussfully!");
    });
    res.redirect('/');
})

const fs = require('fs');

function LoadJSON(filename = '') {
    return JSON.parse(
        fs.existsSync(filename)
            ? fs.readFileSync(filename).toString()
            : '""'
    )
}
function SaveJSON(filename = '', json = '""') {
    return fs.writeFileSync(filename,
        JSON.stringify(json))
}
const data = LoadJSON('lofasz.json');

// ['d','e','f'].forEach(letter=>data.files.push(letter)
//     )



// SaveJSON('lofasz.json', data)

// ////////////////////////////////////////////////////
// json = {
//     one: 1,
//     two: 2
// }
// json = JSON.stringify(json);
// fs.writeFile('./foo.json', json, (err) => {
//     if (!err) {
//         console.log('done');
//     }
// });
///////////////////////////////////////////////////















