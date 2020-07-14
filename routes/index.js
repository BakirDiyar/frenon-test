const express = require("express");
const app = express();

app.use(require("../src/modules/users/users-routes"));

module.exports = app;
