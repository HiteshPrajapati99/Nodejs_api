const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("mongoose-validator");

var Schema = mongoose.Schema;

var emailValidator = [
  validate({
    validator: "matches",
    arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
    message:
      "Email must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.",
  }),
  validate({
    validator: "isLength",
    arguments: [3, 40],
    message: "Email should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

var passwordValidator = [
  validate({
    validator: "matches",
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
    message:
      "Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.",
  }),
  validate({
    validator: "isLength",
    arguments: [8, 35],
    message: "Password should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

const UserSchema = new Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true, validate: emailValidator },
  password: {
    type: String,
    required: true,
    validate: passwordValidator,
    select: false,
  },
});

// password encrypt algorithm

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

// password decrypt and Compare algorithm

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Login_user", UserSchema);
