const fs = require("fs");
const userLogger = (req, res, next) => {
  try {
    // let str="The document with id:63baae803240a41c75a4cb72 has been updated.";
    if (req.method == "POST" && req.url == "/login") {
      next();
      let str = `The document with id:${req.body.username} has been logged in.\n`;
      fs.appendFileSync("./log.txt", str);
    }
  } 
  catch (error) {
    console.log(error);
  }
};

module.exports = {
  userLogger,
};
