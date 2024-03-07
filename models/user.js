// User Model
// This file contains the user model for the application. It defines the schema for the user collection in the database and also contains a method to hash the password before saving the user to the database and a method to compare passwords for authentication.
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords for authentication
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
