const express = require("express");
const app = express();
const selling = require("./selling");

app.use("", selling);

module.exports = app;
