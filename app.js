const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const env = require("./environments/env");

//middlewares of express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(require("./routes/index")); //call route single
app.use(require("./middlewares/not-found"));

async function server() {
  await app.listen(env.portLocal);
  console.log("server running");
}

//init server async
server();

module.exports = { server, app };
