const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

const { connectionDB } = require("./config/db");
const { userRoute } = require("./controllers/users.route");

app.use(express.json());
app.use("/", userRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mini Project." });
});

// listen
app.listen(process.env.port, async () => {
  try {
    await connectionDB;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
  console.log(`Server is running on port ${process.env.port}`);
});
