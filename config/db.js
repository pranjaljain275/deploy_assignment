const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const connectionDB = mongoose.connect(process.env.mongoURL);

module.exports = {
  connectionDB,
};
