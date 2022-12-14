const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// DataBase Connect
require("./helper/DBconn");

// Handling JSON data
app.use(bodyParser.json());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors({ origin: "*" })); // cors policy

// book img connect
app.use("/uploads", express.static("uploads"));

// Middlewares
const heders = require("./middlewares/heders");
app.use(heders);

// call apis
app.get("/", function (req, res) {
  res.json("server Working fine!!!...");
});
const api = require("./router/app");
app.use("/", api);

// create server
const port = process.env.PORT || 9000;

app.listen(port, function () {
  console.log("Server Runnig");
  //  link => "http://localhost:8000"
});
