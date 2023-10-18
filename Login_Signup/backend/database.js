const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://sinmbf:sinmbflost@lost.gmlqtoc.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDb successfully"))
    .catch((error) => console.log(error));
};

module.exports = connectToMongo;
