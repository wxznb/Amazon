const app = require("./routes/index.js");
const express = require("express");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', host, port);
});
