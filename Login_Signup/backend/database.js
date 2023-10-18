const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1/login-signup";

const connectToMongo = async () => {
  try {
    const response = await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
