const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRoute = express.Router();
const { Usermodel } = require("../models/users.model");
const { authenticate } = require("../middlewares/authenticator");
const {userLogger } = require("../middlewares/userLogger");
const {validator} = require("../middlewares/validator");

// register
userRoute.post("/users/register", async (req, res) => {
  try {
    let data = req.body;
    const user = new Usermodel(data);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send("User Registered");
    console.log(data);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

// login
userRoute.post("/users/login", userLogger , async (req, res) => {
  try {
    let {username, password} = req.body;
    let user = await Usermodel.find({username});
    if(user.length > 0) {
      let result = await bcrypt.compare(password, user[0].password);
      if(result) {
        const token = jwt.sign({course: "backend"}, process.env.key);
        res.send({msg:"Login Success", token: token});
      }
      else {
        res.send("Wrong Credential");
      }
    }
    else {
      res.send("Wrong Credential");
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

// read all data
userRoute.get("/users", authenticate, async (req, res) => {
  try {
    let data = await Usermodel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

// read particular data
userRoute.get("/users/:userid", authenticate, async (req, res) => {
  try {
    let ID = req.params.userid;
    let data = await Usermodel.find({_id: ID});
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

// update
userRoute.patch("/edituser/:userid", authenticate, async (req, res) => {
  try {
    let ID = req.params.userid;
    let updateTo = req.body;
    let data = await Usermodel.findByIdAndUpdate({_id: ID}, updateTo);
    res.send(`Data of a user whose Id ${ID} is updated`);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

// delete
userRoute.delete("/edituser/:userid", authenticate, async (req, res) => {
  try {
    let ID = req.params.userid;
    let data = await Usermodel.findByIdAndDelete({_id: ID});
    res.send(`Data of a user whose Id ${ID} is deleted`);
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  userRoute,
};
