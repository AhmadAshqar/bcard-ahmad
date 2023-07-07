const ENVIRONMENT = process.env.INV || "development";

const connectToDB = () => {
  if (ENVIRONMENT === "production") return require("./mongodb/connectToAtlas");
  require("./mongodb/connectToMongoDB");
};

module.exports = connectToDB;
