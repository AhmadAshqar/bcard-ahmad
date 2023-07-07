const mongoose = require("mongoose");
const chalk = require("chalk");

  mongoose
    .connect("mongodb://127.0.0.1:27017/BCard_ahmad_ashqar")
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been connected to MongoDB Locally successfully!"
        )
      )
    )
    .catch(error =>
      console.log(
        chalk.redBright(`Could not connect to mongoDb locally: ${error}`)
      )
    );

