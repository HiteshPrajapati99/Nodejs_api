// MongoDB connection api

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// env data base link connect
// const DB = process.env.DATABASE;
const DB = "mongodb://0.0.0.0:27017/Hitesh";

// start connection
mongoose.connect(DB);

// error hendling
const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("Successfully connected to MongoDB !!!");
});
conn.on("disconnected", function () {
  console.log("Successfully disconnected to MongoDB !!!");
});
conn.on("error", console.error.bind(console, "connection error:"));
