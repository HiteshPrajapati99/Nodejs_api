var mongoose = require("mongoose");

var schema = mongoose.Schema;
var userlist = new schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Users_List", userlist);
