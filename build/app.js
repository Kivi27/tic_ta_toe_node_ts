"use strict";
var express = require("express");
var app = express();
var host = "localhost";
var port = 8080;
app.use(express.static(__dirname + '/public'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.listen(port, host, function () {
    console.log("server is start");
});
