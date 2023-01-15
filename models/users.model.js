const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    dob: String,
    role: String,
    location: String,
    password: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Usermodel = mongoose.model("user", userSchema);

module.exports = {
  Usermodel,
};
