var path = require("path");
var express = require("express");
var db = require("./database/db.js");
var bodyParser = require("body-parser");
var handle = require("./server/requestHandler.js");
var app = express();
var morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, DELETE, POST, GET, UPDATE"
  );
  next();
});

//WEB APP ENDPOINTS//
app.get("/", function(req, res) {
  res.send("Hello, humans!");
});

app.get("/api/users/:id", handle.usersGet);
app.post("/api/users/", handle.userPost);

app.delete("/api/users/urls", handle.urlRemove);

app.post("/api/users/notes/", handle.userAddNotes);
app.delete("/api/users/notes", handle.noteRemove);

app.post('/api/users/notes/annotations/', handle.userAddAnnotations);
app.delete('/api/users/notes/annotations/', handle.annotationRemove);

app.put('/api/users/notes/color', handle.noteColorChange);

var port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
