//Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require('path');
//static files
app.use(express.static('public'));
app.use('/css',express.static(__dirname +'public/css'))

const fs = require('fs');

function LoadJSON(filename = '') {
    return JSON.parse(
        fs.existsSync(filename)
            ? fs.readFileSync(filename).toString()
            : '""'
    )
}
function SaveJSON(filename = '', json = '""') {
    return fs.writeFileSync(filename, JSON.stringify(json))
}
const data = LoadJSON('Data.json');

function savethat(value) {
    let obj = {
        "Name": value.body.title,
        "Data": value.body.content
    }
    let fs = require('fs');
    jsondata = JSON.stringify(obj);
    fs.writeFile("Data.json", jsondata, function (err) {
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
    Name: String,
    Data: String
}
const Note = mongoose.model("Note", notesSchema, "notes");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})
console.clear();


app.listen(3000, function () {
    console.log("Server is running on 3000");
    console.log("You are so cool!")
})
app.post("/", function (req, res) {
    //DB save
    let newNote = new Note({
        Name: req.body.fileName,
        Data: req.body.data
    });
    //Json Save
    data.push({
        "Name": req.body.fileName,
        "Data": req.body.data,
    })

    SaveJSON('Data.json', data);

    newNote.save(function (err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
    });
    res.redirect('/');
})






















